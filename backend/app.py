import os
import cv2
from flask import Flask, request, jsonify

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads/'
OUTPUT_FOLDER = 'output_images/'

# Ensure upload and output folders exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    if file:
        # Ensure the file has the right content type
        if file.content_type not in ['video/mp4', 'video/avi', 'video/mov']:
            return jsonify({'error': 'File type not supported'})
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(file_path)
        convert_video_to_images(file_path)
        return jsonify({'message': 'Video has been successfully processed'})

def convert_video_to_images(video_path):
    # Open the video file
    video_capture = cv2.VideoCapture(video_path)
    frame_number = 0
    while True:
        ret, frame = video_capture.read()
        if ret:
            image_path = os.path.join(OUTPUT_FOLDER, f'frame_{frame_number:05d}.jpg')
            cv2.imwrite(image_path, frame)
            frame_number += 1
        else:
            break
    video_capture.release()

if __name__ == "__main__":
    app.run(debug=True)
