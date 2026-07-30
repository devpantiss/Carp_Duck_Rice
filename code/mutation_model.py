import torch
import torch.nn as nn

class GenomeModel(nn.Module):

    def __init__(self):

        super().__init__()

        self.embedding = nn.Embedding(4,128)

        self.lstm = nn.LSTM(
            128,
            256,
            batch_first=True
        )

        self.fc = nn.Linear(256,4)

    def forward(self,x):

        x = self.embedding(x)

        out,_ = self.lstm(x)

        out = self.fc(out)

        return out