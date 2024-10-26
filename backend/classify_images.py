import tensorflow as tf
import tensorflow_hub as hub
import cv2
import numpy as np
import os

# Load pre-trained model from TensorFlow Hub
classifier_model = "https://tfhub.dev/google/tf2-preview/mobilenet_v2/classification/4"
model = hub.KerasLayer(classifier_model, input_shape=(224, 224, 3))

# Function to preprocess the image
def preprocess_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    return np.expand_dims(img, axis=0)

# Function to classify an image
def classify_image(image_path):
    processed_image = preprocess_image(image_path)
    prediction = model(processed_image)
    return np.argmax(prediction), np.max(prediction)

# Directory where frames are saved
frames_dir = 'D:/Trailer AI model Database/frames'

# Process each frame
for frame in os.listdir(frames_dir):
    frame_path = os.path.join(frames_dir, frame)
    if os.path.isfile(frame_path):
        category, confidence = classify_image(frame_path)
        print(f'Frame {frame}: Category {category}, Confidence {confidence}')
