from flask import Flask
from flask_socketio import SocketIO
from config import Config
from utils.db import db
from routes.auth_routes import auth_bp
from routes.user_routes import user_bp
from models.user_model import User
from routes.live_detection_routes import handle_join, handle_leave, handle_video_frame

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    with app.app_context():
        db.create_all()

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(user_bp, url_prefix="/user")

    return app

app = create_app()
socketio = SocketIO(app, cors_allowed_origins="*")

socketio.on_event("join", handle_join)
socketio.on_event("leave", handle_leave)
socketio.on_event("video_frame", handle_video_frame)

@app.route("/")
def index():
    return {"message": "Live Emotion Detection Server is running"}, 200

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
