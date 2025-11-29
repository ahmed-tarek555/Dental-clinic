from fastapi import APIRouter, Form, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import ContactMessage


router = APIRouter(tags=["contact"])

@router.post("/contact_us")
async def register_user(
        name: str = Form(...),
        phone: str = Form(...),
        email: str = Form(...),
        subject: str = Form(...),
        message: str = Form(...),
        db: Session = Depends(get_db)
        ):

    contact_message = ContactMessage(
                    name=name,
                    phone=phone,
                    email=email,
                    subject=subject,
                    message=message,
                    )
    db.add(contact_message)
    db.commit()
    db.refresh(contact_message)

    return {"message": "شكرا لتواصلك معنا"}