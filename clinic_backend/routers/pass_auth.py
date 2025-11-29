# import random
# from fastapi import APIRouter, Form, Depends, HTTPException, Request
# from fastapi.templating import Jinja2Templates
# from sqlalchemy.orm import Session
# from models import User
# from email_utils import send_email
# from database import get_db
# from routers.auth import hash_password
#
# router = APIRouter(tags=["pass_auth"])
# templates = Jinja2Templates(directory="templates")
#
# @router.post("/forgot-password")
# async def forgot_password(email: str = Form(...), db: Session = Depends(get_db)):
#     user = db.query(User).filter(User.email == email).first()
#
#     if not user:
#         raise HTTPException(400, "Email not found")
#
#     code = str(random.randint(100000, 999999))
#
#     user.reset_code = code
#     db.commit()
#
#     send_email(
#         to=email,
#         subject="Alhilal clinic password reset code",
#         body=f"Your password reset code is: {code}"
#     )
#
#     return {"message": "Reset code has been sent to your email!"}
#
# @router.post("/reset-password")
# async def reset_password(
#     email: str = Form(...),
#     code: str = Form(...),
#     new_password: str = Form(...),
#     db: Session = Depends(get_db)
# ):
#     user = db.query(User).filter(User.email == email).first()
#
#     if not user:
#         raise HTTPException(400, "Email not found")
#
#     if code != user.reset_code:
#         raise HTTPException(400, "Invalid reset code")
#
#     user.password = hash_password(new_password)
#     user.reset_code = None
#     db.commit()
#
#     return {"message": "Password updated successfully"}
