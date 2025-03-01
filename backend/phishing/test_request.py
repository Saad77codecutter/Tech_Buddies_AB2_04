import joblib

# Load the trained model and vectorizer
model = joblib.load("phishing_detector.pkl")
vectorizer = joblib.load("vectorizer.pkl")  # Ensure you load the same vectorizer used during training

# Sample emails to test
test_emails = [
    "Your account is under attack! Click this link to secure it now.",  # Phishing
    "Hey, can you send me the meeting notes from yesterday?",  # Legit
    "Dear user, update your billing details to avoid service disruption.",  # Phishing
    "Your invoice for the last purchase is attached.",  # Legit
]

# Transform emails using the vectorizer
test_emails_transformed = vectorizer.transform(test_emails)

# Predict labels (0 = Legit, 1 = Phishing)
predictions = model.predict(test_emails_transformed)

# Print results
for email, prediction in zip(test_emails, predictions):
    label = "Phishing" if prediction == 1 else "Legit"
    print(f"Email: {email}\nPrediction: {label}\n")
