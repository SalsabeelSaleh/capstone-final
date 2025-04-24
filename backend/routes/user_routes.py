from flask import Blueprint, request, jsonify
from models.user_model import User
from utils.db import db

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.
        "avatar": user.avatar,
        "gender": user.gender,
        "language": user.language
    }), 200

@user_bp.route("/profile/<int:user_id>", methods=["PUT"])
def update_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json

    if "avatar" in data:
        user.avatar = data["avatar"]
    if "gender" in data:
        user.gender = data["gender"]
    if "email" in data:
        user.email = data["email"]
    if "language" in data:
        user.language = data["language"]

    db.session.commit()
    return jsonify({"message": "Profile updated successfully"}), 200
