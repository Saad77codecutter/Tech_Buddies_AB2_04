import os
import numpy as np
import tensorflow as tf
from keras.models import load_model
from preprocess import preprocess_video  # Correct function name

# Load trained model
model_path = r"E:\Tech_Buddies_AB2_04\backend\deepfake\models\deepfake_detector.h5"

model = load_model(model_path)

# Path to the test video
video_path = r"E:\Tech_Buddies_AB2_04\backend\deepfake\data\Priyanka Chopra s Secret to Thriving in Tough Times  🔥 _ Priyanka Chopra 💫.mp4"

# Preprocess the video
X_test = preprocess_video(video_path)  # Correct function name

# Reshape for model input (batch_size, frames, height, width, channels)
X_test = X_test.reshape(1, X_test.shape[0], 224, 224, 3)

# Predict
prediction = model.predict(X_test)
prediction_label = "FAKE" if prediction[0][0] > 0.5 else "REAL"

print(f"Prediction: {prediction_label}")
