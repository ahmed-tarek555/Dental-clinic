import sys
import cv2
from fastapi import FastAPI, File, UploadFile
import torch
from ai.model import Classifier
from ai.ai_utils import device, decode_preds, parameters_file, anchors, draw_objs

threshold = 0.5

model = Classifier()
model.load_state_dict(torch.load(parameters_file, map_location=torch.device(device)))
model = model.to(device)

app = FastAPI()

@app.get('/')
def home(name: str = 'everyone'):
    return {'message': f'Welcome! {name}'}

@app.post('/upload_scan')
async def upload_scan(file: UploadFile = File(...)):
    contents = await file.read()
    preds = model.get_preds(contents)
    detections = decode_preds(preds, anchors, threshold=threshold)
    img = draw_objs(detections, contents)

    cv2.namedWindow("Predictions", cv2.WINDOW_NORMAL)
    cv2.imshow("Predictions", img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

if __name__ == "__main__":

    args = sys.argv
    if len(args) < 2:
        example_dir = 'detection_data/images/70_jpg.rf.1cf85a981d2daa111d5a0fee45fb79e2.jpg'
        img = model.get_preds(example_dir, threshold=threshold)

        cv2.namedWindow("Predictions", cv2.WINDOW_NORMAL)
        cv2.imshow("Predictions", img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        # print(json.dumps({'condition': 'No picture was uploaded.'}))
    else:
        pic_dir = args[1]
        img = model.get_preds(pic_dir, threshold=threshold)

        cv2.namedWindow("Predictions", cv2.WINDOW_NORMAL)
        cv2.imshow("Predictions", img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()