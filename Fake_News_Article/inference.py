import sys
import pandas as pd
import numpy as np
import requests
import bs4
from bs4 import BeautifulSoup
import torch.nn as nn
import torch
from pytorch_pretrained_bert import BertTokenizer, BertModel
from keras.preprocessing.sequence import pad_sequences

# Model
class BertBinaryClassifier(nn.Module):
    def __init__(self, dropout=0.1):
        super(BertBinaryClassifier, self).__init__()
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.dropout = nn.Dropout(dropout)
        self.linear = nn.Linear(768, 1)
        self.sigmoid = nn.Sigmoid()
    
    def forward(self, tokens, masks=None):
        _, pooled_output = self.bert(tokens, attention_mask=masks, output_all_encoded_layers=False)
        dropout_output = self.dropout(pooled_output)
        linear_output = self.linear(dropout_output)
        proba = self.sigmoid(linear_output)
        return proba

# Preprocessing 

# Imporing tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased', do_lower_case=True)

def Punctuation(string): 
  
    # punctuation marks 
    punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
  
    # traverse the given string and if any punctuation 
    # marks occur replace it with null 
    for x in string.lower(): 
        if x in punctuations: 
            string = string.replace(x, "") 
  
    # return string without punctuation 
    return string

def get_text(url):
    try:
        result=requests.get(str(url))
    except Exception:
        print("error in scraping url")
        return None
    src=result.content
    soup=BeautifulSoup(src,'lxml')   
    text=[]	
    for p_tag in soup.find_all('p'):
        text.append(p_tag.text)
    text = Punctuation(str(text))
    return text


# loading model
# cange path as per your requirement
path='/content/drive/My Drive/fake_news/nb_state256.pth'
model = BertBinaryClassifier()
# optimizer = torch.optim.Adam(model.parameters(), lr=3e-6)
model.load_state_dict(torch.load(path))
model.eval()

def test(article,model):
    bert_predicted = []
    all_logits = []
    test_tokens = list(map(lambda t: ['[CLS]'] + tokenizer.tokenize(t)[:255], [article]))
    test_tokens_ids = list(map(tokenizer.convert_tokens_to_ids, test_tokens))
    test_tokens_ids = pad_sequences(test_tokens_ids, maxlen=256, truncating="post", padding="post", dtype="int")
    test_masks = [[float(i > 0) for i in ii] for ii in test_tokens_ids]
    test_masks_tensor = torch.tensor(test_masks)
    test_tokens_ids = torch.tensor(test_tokens_ids)
    with torch.no_grad():
        logits = model(test_tokens_ids, test_masks_tensor)
        numpy_logits = logits.cpu().detach().numpy()
        if(numpy_logits[0,0] > 0.5):
            return 'Fake'
        else:
            return 'True'


def answer(url,model):
    article = get_text(url)
    ans = test(article,model)
    return ans

url = str(sys.argv[1])
print(answer(url,model))