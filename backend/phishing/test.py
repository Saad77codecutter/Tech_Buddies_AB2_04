import joblib
import numpy as np
from scipy.sparse import hstack

# Load model and vectorizer
model = joblib.load("phishing_detector.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Define phishing-related keywords
phishing_keywords = ["alert", "urgent", "click on this link", "book pass", "discount", "verify", "update", 
                     "security", "access", "unlock", "payment", "download", "report", "funding", "expire", 
                     "last chance", "don't miss", "sale ends", "claim your discount", "early bird", "limited time"]

# Function to check if subject contains phishing keywords
def contains_phishing_keywords(subject):
    if isinstance(subject, str):
        return int(any(keyword.lower() in subject.lower() for keyword in phishing_keywords))
    return 0

# Test Email
test_email = {
    "Subject": "⚠️ Warning: Your Email Account Will Be Deactivated!",
    "Body": """From: Email Support <support@webmail.com>
To: lagadsayali7@gmail.com
Date: Mar 8, 2025, 4:50 PM
Subject: ⚠️ Warning: Your Email Account Will Be Deactivated!

Dear User,

Your email account has been flagged for inactivity and will be deactivated within 48 hours unless you confirm your login.

Confirm Now  

Thank you,  
Webmail Support
"""
}


# Extract features
email_text = test_email["Body"]
subject_text = test_email["Subject"]

# Transform email body using the trained vectorizer
X_text_test = vectorizer.transform([email_text])

# Get keyword flag
X_keyword_test = np.array([contains_phishing_keywords(subject_text)]).reshape(1, -1)

# Combine both features
X_combined_test = hstack((X_text_test, X_keyword_test))

# Predict
prediction = model.predict(X_combined_test)[0]
result = "Phishing" if prediction == 1 else "Legit"

# Output
print(f"🚨 The email is classified as: {result}")
