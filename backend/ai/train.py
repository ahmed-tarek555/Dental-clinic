import yaml
import torch
from model import Classifier
from ai.ai_utils import DataLoader, device, config, parameters_file

n_iter = config['training']['n_iter']
lr = config['training']['lr']

with open('config.yaml', 'w') as f:
    yaml.dump(config, f, sort_keys=False)

data_loader = DataLoader('detection_data/images', 'detection_data/labels')
model = Classifier()
model = model.to(device)

model.train()
optim = torch.optim.AdamW(model.parameters(), lr)
for i in range(n_iter):
    optim.zero_grad()
    x, y = data_loader.get_batch()
    x = x.to(device)
    y = [t.to(device) for t in y]
    loss = model(x, y)
    print(loss)
    loss.backward()
    optim.step()
    print(int(((i+1)/n_iter)*100))

torch.save(model.state_dict(), parameters_file)
print(f'Parameters saved to {parameters_file}')

