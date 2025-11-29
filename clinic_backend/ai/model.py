import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision.ops import box_iou
from ai.ai_utils import process_img,decode_preds, draw_objs, device, config, anchors

# CONVOLUTIONAL LAYER FORMULA: [(in−K+2P)/S]+1
# Inputs are of shape (B, 1, 256, 256)

n_hidden = config['model']['n_hidden']
n_classes = config['dataset']['n_classes']
n_anchors = len(anchors)

def focal_bce(pred, target, alpha=0.25, gamma=2.0):
    bce = F.binary_cross_entropy_with_logits(pred, target, reduction='none')
    pt = torch.exp(-bce)
    loss = alpha * (1 - pt) ** gamma * bce
    return loss.mean()

def conv_block(in_channels, out_channels, kernel_size, stride, padding=0):
    return nn.Sequential(nn.Conv2d(in_channels, out_channels, kernel_size, stride, padding),
                         nn.BatchNorm2d(out_channels),
                         nn.ReLU())

class BackBone(nn.Module):
    def __init__(self):
        super().__init__()
        self.stem = conv_block(1, 32, 3, 2, 1) #--> (32, 64, 64)
        self.layer1 = nn.Sequential(
            conv_block(32, 128, 3, 2, 1),
            conv_block(128, 256, 3, 1, 1),      #--> (256, 32, 32)
        )
        self.layer2 = nn.Sequential(
            conv_block(256, 256, 3, 2, 1),
            conv_block(256, 256, 3, 1, 1),     #--> (256, 16, 16)
        )
        self.layer3 = nn.Sequential(
            conv_block(256, 256, 3, 2, 1),
            conv_block(256, 512, 3, 1, 1),    #--> (512, 8, 8)
        )
    def forward(self, x):
        x = self.stem(x)
        x = self.layer1(x)
        f32 = x
        x = self.layer2(x)
        f16 = x
        x = self.layer3(x)
        f8 = x
        return f32, f16, f8

class FPN(nn.Module):
    def __init__(self):
        super().__init__()
        self.up16 = nn.ConvTranspose2d(512, 256, 2, stride=2)
        self.conv16 = nn.Sequential(conv_block(512, 256, 3, 1, 1),
                                    conv_block(256, 256, 3, 1, 1))

        self.up32 = nn.ConvTranspose2d(256, 256, 2, stride=2)
        self.conv32 = nn.Sequential(conv_block(512, 256, 3, 1, 1),
                                    conv_block(256, 256, 3, 1, 1))

    def forward(self, f32, f16, f8):
        f16_up = self.up16(f8)                                              #--> (256, 16, 16)
        f16 = self.conv16(torch.cat([f16, f16_up], dim=1))          #--> (256, 16, 16)
        f32_up = self.up32(f16)                                             #--> (256, 32, 32)
        f32 = self.conv32(torch.cat([f32, f32_up], dim=1))            #--> (256, 32, 32)
        return f32

class Classifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.backbone = BackBone()
        self.fpn = FPN()
        self.detect = nn.Conv2d(256, 3*(5+n_classes), 1)

    def forward(self, x, targets=None):
        f32, f16, f8 = self.backbone(x)
        x = self.fpn(f32, f16, f8)
        x = self.detect(x)
        B, C, H, W = x.shape
        preds = x.view(B, n_anchors, 5+n_classes, H, W).permute(0, 1, 3, 4, 2)

        txy = torch.zeros_like(preds[..., 0:2], device=device)
        twh = torch.zeros_like(preds[..., 2:4], device=device)
        tobj = torch.zeros_like(preds[..., 4], device=device)
        tclass = torch.zeros_like(preds[..., 5:], device=device)

        if targets is not None:
            for b, img in enumerate(targets):
                for cls, gx, gy, gw, gh in img:

                    j = int(gx * W)
                    i = int(gy * H)

                    gt_box = torch.tensor([0, 0, gw, gh], device=device)
                    anchor_shapes = torch.cat([torch.zeros(len(anchors), 2, device=device), anchors], dim=1)
                    ious = box_iou(gt_box.unsqueeze(0), anchor_shapes)
                    best_a = torch.argmax(ious)

                    txy[b, best_a, i, j] = torch.tensor([gx * W - j, gy * H - i], device=device)
                    twh[b, best_a, i, j] = torch.tensor([gw, gh], device=device)
                    tobj[b, best_a, i, j] = 1.0
                    tclass[b, best_a, i, j, int(cls)] = 1.0

            pred_xy = torch.sigmoid(preds[..., 0:2])
            pred_wh = preds[..., 2:4]
            pred_obj = preds[..., 4]
            pred_class = torch.sigmoid(preds[..., 5:])

            obj_mask = tobj.bool()

            loc_loss = F.mse_loss(pred_xy[obj_mask], txy[obj_mask]) + F.mse_loss(pred_wh[obj_mask], twh[obj_mask])
            obj_loss = focal_bce(pred_obj, tobj)
            cls_loss = F.binary_cross_entropy(pred_class[obj_mask], tclass[obj_mask])

            total_loss = loc_loss + cls_loss + obj_loss * 25
            return total_loss
        else:
            return preds

    def get_preds(self, img_dir, threshold=0.5):
        self.eval()
        img_tensor = process_img(img_dir)
        img_tensor = img_tensor.to(device)
        img_tensor = torch.stack((img_tensor, ), dim=0)
        preds = self(img_tensor)
        detections = decode_preds(preds, anchors, threshold)
        img = draw_objs(detections, img_dir)
        return img