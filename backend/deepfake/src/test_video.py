import os
import joblib
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from keras.models import load_model
import subprocess
from apscheduler.schedulers.background import BackgroundScheduler
from preprocess import preprocess_video  # Import preprocessing function
from flask_cors import CORS


app = Flask(__name__)

CORS(app, origins="http://localhost:5173")
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["ALLOWED_EXTENSIONS"] = {"mp4", "avi", "mov"}

model_path = "../models/deepfake_detector.h5"

# Load the initial model
model = load_model(model_path)

# Function to check allowed file type
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]

@app.route("/detect-deepfake", methods=["POST"])
def detect_deepfake():
    if "video" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    video = request.files["video"]
    if video.filename == "" or not allowed_file(video.filename):
        return jsonify({"error": "Invalid file format"}), 400

    filename = secure_filename(video.filename)
    video_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    video.save(video_path)

    # Preprocess video
    X_test = preprocess_video(video_path)
    print(f"Preprocessed shape: {X_test.shape}")  # Check preprocessing output

    # Reshape for model input
    X_test = X_test.reshape(1, X_test.shape[0], 224, 224, 3)
    print(f"Reshaped input shape: {X_test.shape}")

    # Predict using model
    prediction = model.predict(X_test)
    print(f"Raw Prediction Output: {prediction}")  # Print raw model output

    # Ensure the prediction value is interpreted correctly
    probability = prediction[0][0]
    prediction_label = "FAKE" if probability > 0.5 else "REAL"

    return jsonify({"prediction": prediction_label, "confidence": float(probability)})


# Function to retrain the model automatically
def train_new_model():
    try:
        print("Starting model retraining...")
        subprocess.run(["python", "train.py"], check=True)

        # Reload the updated model
        global model
        model = load_model(model_path)
        print("Model retrained and updated successfully.")
    except Exception as e:
        print(f"Error retraining model: {e}")

# Set up background scheduler for automatic retraining
scheduler = BackgroundScheduler()
scheduler.add_job(train_new_model, "interval", days=7)  # Retrains the model every 7 days
scheduler.start()

if __name__ == "__main__":
    os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)
    app.run(debug=True, use_reloader=False,port=5001)
