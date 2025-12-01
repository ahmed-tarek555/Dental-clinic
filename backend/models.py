from sqlalchemy import Column, Integer, String, Text
from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String(100), nullable=False)
    address = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    disease = Column(String(100), nullable=True)
    reason = Column(String(100), nullable=False)
    past_illness = Column(String(100), nullable=True)
    date = Column(String(100), nullable=False)

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    phone = Column(String(100))
    email = Column(String(100))
    subject = Column(Text)
    message = Column(Text)

class UploadedImage(Base):
    __tablename__ = "uploaded_images"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(200))
    user_email = Column(String(100))

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
