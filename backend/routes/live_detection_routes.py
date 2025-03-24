import base64
import io
import cv2
import numpy as np
from PIL import Image
from flask import jsonify
from flask_socketio import emit, join_room, leave_room

# We need to import the detection service object from app.py or create a new instance
from services.detection_service import EmotionDetectionService

# Create an instance of your detection service
# (In `app.py`, you could initialize a global instance and import it here)
detector = EmotionDetectionService("AI_models/emotion_model.onnx")

# Because we are using Flask-SocketIO, we'll define event handlers, not blueprint routes.

def handle_join(data):
    """
    Example event: join a 'room' for streaming if needed
    """
    room = data.get("room")
    join_room(room)
    emit("status", {"msg": f"Joined room {room}"}, room=room)

def handle_leave(data):
    """
    Example event: leave a 'room'
    """
    room = data.get("room")
    leave_room(room)
    emit("status", {"msg": f"Left room {room}"}, room=room)

def handle_video_frame(data):
    """
    data: { "frame": "<base64string>", "room": "someRoom" (optional) }
    """
    if "frame" not in data:
        emit("emotion_result", {"error": "No frame data"})
        return

    b64_frame = data["frame"]
    # Optionally handle 'room' if needed
    # room = data.get("room")

    try:
        # decode base64
        img_bytes = base64.b64decode(b64_frame)
        # Convert to PIL
        pil_image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        # Convert to OpenCV BGR
        frame = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    except Exception as e:
        emit("emotion_result", {"error": "Invalid frame data"})
        return

    # Predict emotion
    emotion = detector.predict_emotion(frame)

    # Emit result back to client
    # If you have a 'room' concept, use emit(..., room=room)
    emit("emotion_result", {"emotion": emotion})
