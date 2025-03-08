import os
import numpy as np
import tensorflow as tf
import cv2
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from keras.models import load_model
import subprocess
from apscheduler.schedulers.background import BackgroundScheduler
from flask_cors import CORS
from tensorflow.keras import backend as K

K.clear_session()
tf.compat.v1.reset_default_graph()

# Enable dynamic GPU memory growth
physical_devices = tf.config.experimental.list_physical_devices('GPU')
for device in physical_devices:
    tf.config.experimental.set_memory_growth(device, True)

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["ALLOWED_EXTENSIONS"] = {"mp4", "avi", "mov"}

model_path = "./models/deepfake_detector.h5"

# Load trained model
model = load_model(model_path)

# Function to check allowed file type
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]

# Function to extract frames from video for prediction
def preprocess_video(video_path, frame_size=(224, 224), frame_interval=10, max_frames=30):
    cap = cv2.VideoCapture(video_path)
    frames = []
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Resize frame
        frame = cv2.resize(frame, frame_size)
        
        # Normalize
        frame = frame / 255.0
        frames.append(frame)
    
    cap.release()
    
    # If video has fewer than `max_frames`, pad with zeros
    if len(frames) < max_frames:
        frames = frames + [np.zeros((frame_size[0], frame_size[1], 3))] * (max_frames - len(frames))
    # If video has more than `max_frames`, truncate it
    elif len(frames) > max_frames:
        frames = frames[:max_frames]
    
    return np.array(frames)

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

    # Preprocess video (only one frame from the video)
    X_test = preprocess_video(video_path, max_frames=1)  # Only use one frame
    print(f"Preprocessed shape: {X_test.shape}")  # Check the shape

    if X_test.shape[0] == 0:
        return jsonify({"error": "No valid frames extracted from video"}), 400

    # Reshape for model input
    X_test = X_test.reshape(1, 224, 224, 3)  # Single frame with shape (224, 224, 3)
    print(f"Reshaped input shape: {X_test.shape}")

    # Predict using model
    prediction = model.predict(X_test)
    print(f"Raw Prediction Output: {prediction}")

    # Convert predictions to class label
    predicted_class = np.argmax(prediction, axis=-1)[0]
    confidence = np.max(prediction, axis=-1)[0]

    prediction_label = "FAKE" if predicted_class == 1 else "REAL"

    return jsonify({"prediction": prediction_label, "confidence": float(confidence)})

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
    app.run(debug=True, use_reloader=False, port=5001)
