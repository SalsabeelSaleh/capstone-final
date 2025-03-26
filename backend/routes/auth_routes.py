from flask import Blueprint, request, jsonify
from models.user_model import User
from utils.db import db
from utils.hashing import hash_password, verify_password

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get("username")
    password = data.get("password")
    gender = data.get("gender")
    age = data.get("age")
    language = data.get("language", "en")
    avatar = data.get("avatar")

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already taken"}), 400

    password_hash = hash_password(password)
    new_user = User(username, password_hash, gender, age, language, avatar)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()
    if not user or not verify_password(password, user.password_hash):
        return jsonify({"error": "Invalid username or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "username": user.username,
            "avatar": user.avatar,
            "gender": user.gender,
            "age": user.age,
            "language": user.language
        }
    }), 200
