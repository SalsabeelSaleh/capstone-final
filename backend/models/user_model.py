from utils.db import db   #update all in git

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), unique=True)
    avatar = db.Column(db.Text)
    language = db.Column(db.String(5))

    def __init__(self, username, email, password_hash, language="en", avatar=None):
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.language = language
        self.avatar = avatar
