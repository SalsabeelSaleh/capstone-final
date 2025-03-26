from utils.db import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    avatar = db.Column(db.Text)  # Base64 string or image URL
    gender = db.Column(db.String(20))
    age = db.Column(db.Integer)
    language = db.Column(db.String(5))

    def __init__(self, username, password_hash, gender=None, age=None, language="en", avatar=None):
        self.username = username
        self.password_hash = password_hash
        self.gender = gender
        self.age = age
        self.language = language
        self.avatar = avatar
