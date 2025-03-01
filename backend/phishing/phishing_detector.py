import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
import pandas as pd

# Load dataset
df = pd.read_csv("email_dataset.csv")  # Ensure this file exists

# Text processing
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["Body"])  # Assuming "Body" contains email text
y = df["Label"].apply(lambda x: 1 if x == "phishing" else 0)  # Convert labels

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = MultinomialNB()
model.fit(X_train, y_train)

# Save the trained model and vectorizer**
joblib.dump(model, "phishing_detector.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")  # This is the missing file

# Print success message

print("Phishing detection model and vectorizer saved successfully.")