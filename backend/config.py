from dotenv import load_dotenv
import os
from datetime import timedelta
load_dotenv()

class ApplicationConfig:
    SECRET_KEY=os.environ["SECRET_KEY"]
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SQLALCHEMY_ECHO=False
    SQLALCHEMY_DATABASE_URI=r"sqlite:///app.db"
    MAIL_SERVER='smtp.gmail.com'
    MAIL_PORT=465
    MAIL_USE_TLS=False
    MAIL_USE_SSL=True
    MAIL_USERNAME="strathnoreply@gmail.com"
    MAIL_PASSWORD="tsoi nthu pmdz tzsd"
    MAIL_DEFAULT_SENDER='no-reply@example.com'
    JWT_SECRET_KEY='assefejfrbngjtnginfongjngonr1oij94hrn94ut598yhginen'
    JWT_ACCESS_TOKEN_EXPIRES=timedelta(minutes=3)
    JWT_REFRESH_TOKEN_EXPIRES=timedelta(days=30)




