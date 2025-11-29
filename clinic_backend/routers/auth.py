from fastapi import APIRouter, Form, Depends, HTTPException
from sqlalchemy.orm import Session
import bcrypt
from database import get_db
from models import User
from email_utils import send_email

router = APIRouter(tags=["auth"])

def hash_password(password: str) -> str:
    password = password[:72]
    password_bytes = password.encode("utf-8")
    hashed = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    plain_bytes = plain_password[:72].encode("utf-8")
    hashed_bytes = hashed_password.encode("utf-8")
    return bcrypt.checkpw(plain_bytes, hashed_bytes)

@router.post("/register")
async def register_user(
        name: str = Form(...),
        age: int = Form(...),
        gender: str = Form(...),
        address: str = Form(...),
        email: str = Form(...),
        disease: str = Form(...),
        reason: str = Form(...),
        past_illness: str = Form(None),
        date: str = Form(...),
        db: Session = Depends(get_db)
        ):
    db_user = db.query(User).filter(User.email == email).first()
    if db_user:
        return {"message": "البريد الالكتروني مستخدم بالفعل"}
    new_user = User(name=name,
                    age=age,
                    gender=gender,
                    address=address,
                    email=email,
                    disease=disease,
                    reason=reason,
                    past_illness=past_illness,
                    date=date)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    send_email(
        to=new_user.email,
        subject="Thank you for choosing Alhilal dental clinic",
        body="Our team will contact you shortly"
    )

    return {"message": "تم حجز الموعد بنجاح"}