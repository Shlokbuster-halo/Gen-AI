import cv2
import os
import tensorflow as tf
import tensorflow_hub as hub
from tensorflow.keras.preprocessing import image
import numpy as np

# Path to the video file
video_path = 'D:/Trailer AI model Database/john wick trailer.mp4'

# Output directory to save the images
output_dir = 'D:/Trailer AI model Database/frames'

# Create the output directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Open the video file
video_capture = cv2.VideoCapture(video_path)

# Check if video file opened successfully
if not video_capture.isOpened():
    print("Error: Could not open video file.")
else:
    frame_number = 0
    while True:
        # Read the next frame
        ret, frame = video_capture.read()
        
        # If the frame was read successfully
        if ret:
            # Save the frame as a JPEG file
            image_path = os.path.join(output_dir, f'frame_{frame_number:05d}.jpg')
            cv2.imwrite(image_path, frame)
            frame_number += 1
        else:
            break

    # Release the video capture object
    video_capture.release()
    print("Done! Frames have been saved as JPEG images.")

# Load the pre-trained model from TensorFlow Hub
classifier_model = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/classification/4"
model = hub.KerasLayer(classifier_model, input_shape=(224, 224, 3))

# Function to preprocess the image
def preprocess_image(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# Function to classify an image
def classify_image(image_path):
    processed_image = preprocess_image(image_path)
    prediction = model(processed_image)
    return np.argmax(prediction), np.max(prediction)

# Process each frame
for frame in os.listdir(output_dir):
    frame_path = os.path.join(output_dir, frame)
    if os.path.isfile(frame_path):
        category, confidence = classify_image(frame_path)
        print(f'Frame {frame}: Category {category}, Confidence {confidence}')

# Perform any additional processing if necessary

