import os
import cv2
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, mixed_precision

# Enable dynamic GPU memory growth
gpus = tf.config.list_physical_devices("GPU")
if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print(f"✅ GPU memory growth enabled")
    except RuntimeError as e:
        print(f"⚠️ GPU memory setting failed: {e}")


# Enable CUDA asynchronous memory allocator
os.environ['TF_GPU_ALLOCATOR'] = 'cuda_malloc_async'

# Enable Mixed Precision for better performance
mixed_precision.set_global_policy("mixed_float16")

# Hyperparameters
BATCH_SIZE = 8  # Reduce if OOM occurs
EPOCHS = 10
IMG_SIZE = (224, 224)
NUM_CLASSES = 2  # Real (0) vs Fake (1)

# Paths to dataset
REAL_PATH = "./data/real"
FAKE_PATH = "./data/fake"

# Function to extract frames from videos
def extract_frames(video_path, label, frame_interval=10):
    frames = []
    labels = []
    cap = cv2.VideoCapture(video_path)
    frame_count = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_interval == 0:
            frame = cv2.resize(frame, IMG_SIZE)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
            frames.append(frame)
            labels.append(label)

        frame_count += 1

    cap.release()
    return np.array(frames), np.array(labels)

# Load dataset from videos
def load_dataset():
    images = []
    labels = []

    for video in os.listdir(REAL_PATH):
        if video.endswith(".mp4") or video.endswith(".avi"):
            video_path = os.path.join(REAL_PATH, video)
            frames, lbls = extract_frames(video_path, 0)
            images.extend(frames)
            labels.extend(lbls)

    for video in os.listdir(FAKE_PATH):
        if video.endswith(".mp4") or video.endswith(".avi"):
            video_path = os.path.join(FAKE_PATH, video)
            frames, lbls = extract_frames(video_path, 1)
            images.extend(frames)
            labels.extend(lbls)

    images = np.array(images) / 255.0  # Normalize
    labels = np.array(labels)
    return images, labels

# Load dataset
print("Loading dataset from videos...")
X, y = load_dataset()
print(f"Dataset loaded: {X.shape[0]} samples")

# Split dataset
from sklearn.model_selection import train_test_split
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Create TensorFlow dataset
train_ds = tf.data.Dataset.from_tensor_slices((X_train, y_train)).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
val_ds = tf.data.Dataset.from_tensor_slices((X_val, y_val)).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)

# Build CNN Model
model = keras.Sequential([
    layers.Conv2D(32, (3,3), activation='relu', input_shape=(IMG_SIZE[0], IMG_SIZE[1], 3)),
    layers.MaxPooling2D(),
    layers.Conv2D(64, (3,3), activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(128, (3,3), activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(NUM_CLASSES, activation='softmax')
])

# Compile model
model.compile(
    optimizer=keras.optimizers.Adam(learning_rate=0.001),
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Train model
print("Starting training...")
model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS)

# Save the model
os.makedirs("./models", exist_ok=True)
model.save("./models/deepfake_detector.h5")
print("Model saved at ../models/deepfake_detector.h5")
