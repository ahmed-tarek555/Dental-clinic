from fastapi import APIRouter, File, UploadFile, Request
import torch
import cv2
from ai.model import Classifier
from ai.ai_utils import device
import os
import uuid
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(prefix="/ai", tags=["AI Image Upload"])
templates = Jinja2Templates(directory="templates")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PARAMETERS_PATH = os.path.join(BASE_DIR, "parameters.pth")
threshold = 0.5

model = Classifier()
model.load_state_dict(torch.load(PARAMETERS_PATH))
model = model.to(device)

UPLOAD_DIR = "static/uploads"
PROCESSED_DIR = "static/processed"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)

@router.post("/process_image")
async def process_image(file: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_location, "wb") as f:
        f.write(await file.read())
    img = model.get_preds(file_location, threshold=threshold)
    processed_path = f"{PROCESSED_DIR}/{uuid.uuid4()}.png"
    cv2.imwrite(processed_path, img)
    return FileResponse(processed_path, media_type="image/png")
