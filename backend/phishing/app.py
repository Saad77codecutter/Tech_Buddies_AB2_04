from flask import Flask, render_template, request, jsonify
import joblib
from flask_cors import CORS  # Enable CORS for frontend requests

# Load the trained model and vectorizer
model = joblib.load("phishing_detector.pkl")
vectorizer = joblib.load("vectorizer.pkl")  # Ensure this matches the training vectorizer

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/detect-phishing", methods=["POST"])
def detect_phishing():
    if request.content_type != "application/json":
        return jsonify({"error": "Invalid content type. Expected 'application/json'"}), 415

    try:
        data = request.get_json(force=True)  # Ensure JSON parsing
        email_text = data.get("email_text", "").strip()
        url = data.get("url", "").strip()

        if not email_text and not url:
            return jsonify({"error": "No input provided."}), 400

        # Use email text if available; otherwise, use URL
        input_text = email_text if email_text else url

        # Transform input using the trained vectorizer
        transformed_text = vectorizer.transform([input_text])

        # Make a prediction using the model
        prediction = model.predict(transformed_text)[0]  # Extract single prediction

        # Convert numeric prediction (0 or 1) to readable output
        result = "Phishing" if prediction == 1 else "Legit"

        return jsonify({"input": input_text, "prediction": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
