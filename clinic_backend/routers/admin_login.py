from fastapi import APIRouter, Request, Form, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from routers.auth import verify_password
from models import Admin, User, ContactMessage
from typing import List
from database import get_db, Base, engine


router = APIRouter(prefix="/admin", tags=["admin"])
templates = Jinja2Templates(directory="templates")

def model_to_dict(obj):
    return {k: v for k, v in obj.__dict__.items() if k != "_sa_instance_state"}

@router.post("/login")
async def admin_login(username: str = Form(...),
                      password: str = Form(...),
                      db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == username).first()

    if not admin or not verify_password(password, admin.password):
        raise HTTPException(400, "Invalid admin credentials")

    return {"token": "ADMIN-SECRET-TOKEN"}

@router.get("/dashboard")
def get_dashboard(db: Session = Depends(get_db)):
    users = db.query(User).all()
    messages = db.query(ContactMessage).all()

    users_list = [model_to_dict(u) for u in users]
    messages_list = [model_to_dict(m) for m in messages]

    return {
        "users": users_list,
        "contact_messages": messages_list
    }

