import torch
from torchvision import transforms
import torchvision.ops as ops
import cv2
import yaml
import os
from PIL import Image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(BASE_DIR, "config.yaml")

with open(CONFIG_PATH, "r") as f:
    config = yaml.safe_load(f)

batch_size = config['training']['batch_size']
classes = config['dataset']['classes']

device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f'Device: {device}')

anchors = torch.tensor([[0.0352, 0.2115], [0.0352, 0.1538], [0.0352, 0.2756]], device=device)
parameters_file = 'parameters.pth'
target_size = (128, 128)
target_format = 'L'

transform = transforms.Compose([
    transforms.Resize(target_size),
    transforms.ToTensor()
])

def process_img(img):
    if not isinstance(img, Image.Image):
        img  = Image.open(img)
    img = img.convert(target_format)
    img_tensor = transform(img)
    return img_tensor

class DataLoader:
    def __init__(self, imgs_dir, annot_dir):
        print(f'Loading dataset...')
        self.x = []
        self.y = []
        for img in os.listdir(imgs_dir):
            img_name = os.path.join(imgs_dir, img)
            stem = os.path.splitext(img)[0]
            annot_name = os.path.join(annot_dir, f'{stem}.txt')
            if not os.path.exists(annot_name):
                continue
            self.x.append(process_img(img_name))
            with open(annot_name, "r") as f:
                objs = []
                for line in f.readlines():
                    cls, x_center, y_center, width, height = map(float, line.strip().split())

                    objs.append([cls, x_center, y_center, width, height])
                self.y.append(torch.tensor(objs, dtype=torch.float32))

        self.x = torch.stack(self.x)
        print('Done')

    def get_batch(self):
        batch = torch.randint(self.x.shape[0], (batch_size,))
        x = self.x[batch]
        y = [self.y[i] for i in batch.tolist()]
        return x, y

def decode_preds(preds, anchors, threshold=0.5):
    B, NA, H, W, C = preds.shape

    pred_xy = torch.sigmoid(preds[..., 0:2])
    pred_wh = torch.exp(preds[..., 2:4])
    pred_obj = torch.sigmoid(preds[..., 4])
    pred_cls = torch.sigmoid(preds[..., 5:])

    grid_y, grid_x = torch.meshgrid(torch.arange(H), torch.arange(W), indexing='ij')
    grid_x = grid_x.to(preds.device).float()
    grid_y = grid_y.to(preds.device).float()

    anchors = anchors.to(preds.device).view(1, NA, 1, 1, 2)

    bx = (pred_xy[..., 0] + grid_x.unsqueeze(0).unsqueeze(0)) / W
    by = (pred_xy[..., 1] + grid_y.unsqueeze(0).unsqueeze(0)) / H
    bw = (anchors[..., 0] * pred_wh[..., 0])
    bh = (anchors[..., 1] * pred_wh[..., 1])

    detections = torch.cat((bx.unsqueeze(-1), by.unsqueeze(-1), bw.unsqueeze(-1), bh.unsqueeze(-1), pred_obj.unsqueeze(-1), pred_cls), dim=-1)
    mask = pred_obj > threshold

    detections = detections[mask]
    return detections

def draw_objs(detections, img_dir):

    img = cv2.imread(img_dir)
    h, w = img.shape[:2]

    detections[:, 0] *= w
    detections[:, 1] *= h
    detections[:, 2] *= w
    detections[:, 3] *= h

    x_center, y_center, width, height = detections[:, 0], detections[:, 1], detections[:, 2], detections[:, 3]

    x1 = x_center - width / 2
    y1 = y_center - height / 2
    x2 = x_center + width / 2
    y2 = y_center + height / 2

    boxes = torch.stack([x1, y1, x2, y2], dim=1)

    for box, conf, cls in zip(boxes, detections[:, 4], detections[:, 5:]):
        cls_idx = torch.argmax(cls, dim=-1)
        if cls_idx == 3:
            continue
        x1, y1, x2, y2 = map(int, box)
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(img, f'{classes[int(cls_idx)]}', (x1, y1 - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
    return img

def apply_nms(detections, iou_threshold=0.5):
    if len(detections) == 0:
        return detections

    boxes = []
    scores = []
    classes = []

    for det in detections:
        x_center, y_center, w, h, conf, cls = det.tolist()
        x1 = x_center - w / 2
        y1 = y_center - h / 2
        x2 = x_center + w / 2
        y2 = y_center + h / 2
        boxes.append([x1, y1, x2, y2])
        scores.append(conf)
        classes.append(int(cls))

    boxes = torch.tensor(boxes)
    scores = torch.tensor(scores)
    classes = torch.tensor(classes)

    final_detections = []
    for c in classes.unique():
        mask = classes == c
        cls_boxes = boxes[mask]
        cls_scores = scores[mask]
        keep = ops.nms(cls_boxes, cls_scores, iou_threshold)
        for i in keep:
            final_detections.append(torch.cat([cls_boxes[i], cls_scores[i].unsqueeze(0), torch.tensor([float(c)])]))

    return torch.stack(final_detections) if len(final_detections) > 0 else torch.empty((0, 6))

# mouth_cascade = cv2.CascadeClassifier(
#     cv2.data.haarcascades + 'haarcascade_smile.xml'
# )

# def camera_detection(source=0):
#     cap = cv2.VideoCapture(source)
#
#     frame_count = 0
#     process_every_n = 15
#     logits_list = []
#     while True:
#         ret, frame = cap.read()
#         if not ret:
#             break
#
#         if frame_count % process_every_n == 0:
#             gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#             mouths = mouth_cascade.detectMultiScale(gray, 1.3, 5)
#
#             if len(mouths) > 0:
#                 mouths = sorted(mouths, key=lambda r: r[2] * r[3], reverse=True)
#                 (x, y, w, h) = mouths[0]
#                 h_img, w_img = frame.shape[:2]
#                 x, y = max(0, x), max(0, y)
#                 w, h = min(w, w_img - x), min(h, h_img - y)
#                 roi_color = frame[y:y+h, x:x+w]
#                 pic = Image.fromarray(cv2.cvtColor(roi_color, cv2.COLOR_BGR2RGB))
#                 logits = model.get_logits(pic)
#                 logits_list.append(logits)
#
#         cv2.imshow("Smile!", frame)
#         frame_count += 1
#
#         if len(logits_list) >= 5:
#             break
#         if cv2.waitKey(1) & 0xFF == ord("q"):
#             break
#     cap.release()
#     cv2.destroyAllWindows()
#
#     if len(logits_list) == 0:
#         out = None
#
#     else:
#         out = torch.cat(logits_list, dim=0)
#         out = out.mean(dim=0, keepdim=True)
#     return out

# x_center = (x_min + x_max) / 2.0
# y_center = (y_min + y_max) / 2.0
# width = x_max - x_min
# height = y_max - y_min
#
# x_center /= w
# y_center /= h
# width /= w
# height /= h
