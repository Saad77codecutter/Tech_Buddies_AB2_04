import cv2
import numpy as np
import os

def preprocess_video(video_path, frame_size=(224, 224), max_frames=30):
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

def prepare_data(video_paths, labels, max_frames=30):
    frames_data = []
    for video_path in video_paths:
        frames = preprocess_video(video_path, max_frames=max_frames)
        frames_data.append(frames)
    
    return np.array(frames_data), np.array(labels)


def prepare_data(video_paths, labels):
    frames_data = []
    for video_path in video_paths:
        frames = preprocess_video(video_path)
        
        # Check if frames are empty
        if frames.size == 0:
            print(f"Warning: No frames extracted from {video_path}")
            frames = np.zeros((224, 224, 3))  # Provide a dummy frame
        
        frames_data.append(frames)
    
    return np.array(frames_data), np.array(labels)
