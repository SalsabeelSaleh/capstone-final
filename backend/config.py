import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "some-secret-key"
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URI") or "sqlite:///emotion_db.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # For demonstration: if you want to store user language preference
    SUPPORTED_LANGUAGES = ["en", "ar"]
