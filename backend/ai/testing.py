# import requests
# from pydantic import BaseModel
#
# url = "http://127.0.0.1:8000/upload_scan"
# image = "x-rays_testing/0485_jpg.rf.09576812fc790cab5da2f6a5ceafe25f.jpg"
#
# class Patient(BaseModel):
#     name: str
#     age : int
#
# files = {"file": image}
#
# res = requests.post(url,files=files)
# print(res.json())


import torch
# import os
# import numpy as np
# from sklearn.cluster import KMeans
#
# label_dir = "detection_data/labels"   # <- folder containing .txt annotation files
# img_size = 256         # <- your training resolution
#
# wh = []
#
# for file in os.listdir(label_dir):
#     if not file.endswith(".txt"):
#         continue
#     with open(os.path.join(label_dir, file), "r") as f:
#         for line in f:
#             cls, cx, cy, w, h = map(float, line.split())
#             # convert normalized → pixel scale
#             w *= img_size
#             h *= img_size
#             wh.append([w, h])
#
# wh = np.array(wh)
# print(f"Total boxes collected: {len(wh)}")
#
# # Run K-Means to find 3 anchors
# k = 3
# kmeans = KMeans(n_clusters=k, n_init=20).fit(wh)
# anchors = kmeans.cluster_centers_
#
# # Round to integers
# anchors = np.round(anchors).astype(int)
# print("\nANCHORS (width, height):")
# print(anchors)

# anchorss = torch.tensor([[9, 33], [9, 24],[9, 43]])
# anchorss = anchorss/ torch.tensor([256, 156])
# print(anchorss)