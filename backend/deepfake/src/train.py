import os
import numpy as np
import tensorflow as tf
from keras.layers import Dense, Dropout
from keras.models import Sequential
from keras.layers import Conv3D, MaxPooling3D, Flatten
from keras.optimizers import Adam
from keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from preprocess import prepare_data

# Load dataset
real_video_paths = [os.path.join('../data/real', f) for f in os.listdir('../data/real')]
fake_video_paths = [os.path.join('../data/fake', f) for f in os.listdir('../data/fake')]

# Create labels: 0 for real, 1 for fake
video_paths = real_video_paths + fake_video_paths
labels = [0] * len(real_video_paths) + [1] * len(fake_video_paths)

# Preprocess and prepare data
X, y = prepare_data(video_paths, labels)

# Reshape data for CNN input (frames, height, width, channels)
X = X.reshape(X.shape[0], X.shape[1], 224, 224, 3)

# Split the data into training and testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build the model with 3D convolutions
model = Sequential([
    Conv3D(32, (3, 3, 3), activation='relu', input_shape=(30, 224, 224, 3)),
    MaxPooling3D(pool_size=(2, 2, 2)),
    
    Conv3D(64, (3, 3, 3), activation='relu'),
    MaxPooling3D(pool_size=(2, 2, 2)),
    
    Conv3D(128, (3, 3, 3), activation='relu'),
    MaxPooling3D(pool_size=(2, 2, 2)),
    
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(optimizer=Adam(), loss='binary_crossentropy', metrics=['accuracy'])

# EarlyStopping callback to avoid overfitting
early_stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

# Train the model
model.fit(X_train, y_train, epochs=5, validation_data=(X_test, y_test), callbacks=[early_stopping])

# Save the model
model.save('../models/deepfake_detector.h5')
print('Model saved')

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {accuracy * 100:.2f}%")
