import base64
import io
import cv2
import numpy as np
from PIL import Image
from flask_socketio import emit, join_room, leave_room
from services.detection_service import EmotionDetectionService

detector = EmotionDetectionService("AI_models/emotion_model.onnx")

def handle_join(data):
    room = data.get("room")
    join_room(room)
    emit("status", {"msg": f"Joined room {room}"}, room=room)

def handle_leave(data):
    room = data.get("room")
    leave_room(room)
    emit("status", {"msg": f"Left room {room}"}, room=room)

def handle_video_frame(data):
    if "frame" not in data:
        emit("emotion_result", {"error": "No frame data"})
        return

    try:
        img_bytes = base64.b64decode(data["frame"])
        pil_image = Image.open(io.BytesIO(img_bytes)).convert("RGB")
        frame = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    except Exception:
        emit("emotion_result", {"error": "Invalid frame data"})
        return

    emotion = detector.predict_emotion(frame)
    emit("emotion_result", {"emotion": emotion})
