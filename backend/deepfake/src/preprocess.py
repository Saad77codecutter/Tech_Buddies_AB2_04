import cv2
import numpy as np

def preprocess_video(video_path, frame_size=(224, 224), frame_interval=10, max_frames=1):
    cap = cv2.VideoCapture(video_path)
    frames = []

    # Extract only one frame from the video (first frame or any frame if required)
    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_count % frame_interval == 0:
            frame = cv2.resize(frame, frame_size)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
            frames.append(frame)
        
        frame_count += 1
    
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
        
        # Check if frames are empty
        if frames.size == 0:
            print(f"Warning: No frames extracted from {video_path}")
            frames = np.zeros((224, 224, 3))  # Provide a dummy frame
        
        frames_data.append(frames)
    
    return np.array(frames_data), np.array(labels)

