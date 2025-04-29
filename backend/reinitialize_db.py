from app import create_app
from utils.db import db

app = create_app()

with app.app_context():
    db.create_all()
    print("Database tables have been created successfully.")
