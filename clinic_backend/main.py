from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from database import engine
import models
from routers import ai_upload, auth, contact_us, admin_login

app = FastAPI(title="Dental Clinic")

models.Base.metadata.create_all(bind=engine)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(ai_upload.router)
app.include_router(auth.router)
app.include_router(contact_us.router)
app.include_router(admin_login.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)