# Fake-News-Article
![](https://www.geo.tv/assets/uploads/updates/2018-07-18/l_203781_040549_updates.jpg)
- Some fake articles have relatively frequent use of terms seemingly intended to inspire outrage and the present writing skill in such articles is generally considerably lesser than in standard news.
- Detecting fake news articles by analyzing patterns in writing of the articles.
- Made using fine tuning BERT
- With an Accuarcy of 80% on the custom dataset.

![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square)
![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)

## Installation

- All the `code` required to get started.

### Clone

- Clone this repo to your local machine using `https://github.com/abhilashreddys/Fake-News-Article.git`

### Setup

- Install these libraries/packages.

```shell
$ pip3 install pandas numpy scikit-learn bs4
$ pip3 install torch
$ pip3 install keras
$ pip3 install pytorch_pretrained_bert
$ pip3 install transformers
```
## Dataset

- Data is collected by scraping the websites of popular news publishing sources.
- The collected news articles are judged using the score, quality, bias as metric collected from [Politilact](https://www.politifact.com/) and [Media Charts](https://www.adfontesmedia.com/interactive-media-bias-chart/?v=402f03a963ba).
- Some basic preprocessing is also done on the text collected from scraping websites.

### Preprocessing
- Used [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/) for scraping articles from the web, Beautiful Soup is a Python library designed for quick turnaround projects like screen-scraping
- Also used some custom made functions for removing punctuation etc.
![](https://miro.medium.com/max/495/1*AaAIETIq7XNlLrFQW7BtZg.png)

> scraping from websites listed in [politifact_data.csv](https://github.com/abhilashreddys/Fake-News-Article/blob/master/politifact_data.csv)
```shell
$ python3 scrape_politifact.py
```

> scraping from websites listed in [Interactive Media Bias Chart - Ad Fontes Media.csv](https://github.com/abhilashreddys/Fake-News-Article/blob/master/Interactive%20Media%20Bias%20Chart%20-%20Ad%20Fontes%20Media.csv)
```shell
$ python3 scrape_media.py
```
- Data after scraping and preprocessing [politifact_text.csv](https://github.com/abhilashreddys/Fake-News-Article/blob/master/politifact_text.csv) , [pre_media.csv](https://github.com/abhilashreddys/Fake-News-Article/blob/master/pre_media.csv)

## Model
- Trained by fine tuning the BERT
- Used [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805) with fine tuning
- BERT, which stands for Bidirectional Encoder Representations from Transformers.
- BERT is designed to pretrain deep bidirectional representations from unlabeled text by jointly conditioning on both left and right context in all layers. As a result, the pre-trained BERT model can be finetuned with just one additional output layer to create state-of-the-art models for a wide range of tasks, such as question answering andlanguage inference, without substantial taskspecific architecture modifications.
![](https://github.com/manideep2510/siamese-BERT-fake-news-detection-LIAR/blob/master/doc_images/bert.png?raw=true)

```python
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
```

## Weights 

- Download here : [Link](https://drive.google.com/drive/folders/108JY7_yROQQsJDFbusVPP1aUmkZ4xe16?usp=sharing)

## Inference

- Run `inference.py` and mention url of the article you want to test in comand line

```shell
$ python3 inference.py url
```

## Cautions & Suggestions

- Check the file locations properly, change it if required.
- If you face any problems with script files use notebooks [transfrom_spam.ipynb](https://github.com/abhilashreddys/Fake-News-Article/blob/master/transfrom_spam.ipynb) for training and [fake_article.ipynb](https://github.com/abhilashreddys/Fake-News-Article/blob/master/fake_article.ipynb) for inference.
- Trained only for `5 Epochs`, trying to use a better model with more data.

## References

- For data [Politilact](https://www.politifact.com/) and [Media Charts](https://www.adfontesmedia.com/interactive-media-bias-chart/?v=402f03a963ba)
- [Keras: The Python Deep Learning library](https://keras.io)
- [A library of state-of-the-art pretrained models for Natural Language Processing](https://github.com/huggingface/pytorch-transformers)
- [Pytorch Deep Learning framework](https://github.com/pytorch/pytorch)
- [Pytorch BERT usage example](https://github.com/sugi-chan/custom_bert_pipeline)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [BERT: Pre-training of Deep Bidirectional Transformers for Language
Understanding](https://arxiv.org/abs/1810.04805)

```bibtex
@article{Wolf2019HuggingFacesTS,
  title={HuggingFace's Transformers: State-of-the-art Natural Language Processing},
  author={Thomas Wolf and Lysandre Debut and Victor Sanh and Julien Chaumond and Clement Delangue and Anthony Moi and Pierric Cistac and Tim Rault and R'emi Louf and Morgan Funtowicz and Jamie Brew},
  journal={ArXiv},
  year={2019},
  volume={abs/1910.03771}
}
```
```bibtex
@article{devlin2018bert,
  title={BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding},
  author={Devlin, Jacob and Chang, Ming-Wei and Lee, Kenton and Toutanova, Kristina},
  journal={arXiv preprint arXiv:1810.04805},
  year={2018}
}
```

## Other Implementaions

- [Triple Branch BERT Siamese Network for fake news classification on LIAR-PLUS dataset](https://github.com/manideep2510/siamese-BERT-fake-news-detection-LIAR)
- [Fake News Detection by Learning Convolution Filters through Contextualized Attention](https://github.com/ekagra-ranjan/fake-news-detection-LIAR-pytorch)
- [Based on Click-Baits](https://github.com/addy369/Click-Bait-Model)
- [Fake News Web](https://github.com/addy369/Fake_News_Web)
- [Fake News Pipeline Project](https://github.com/walesdata/newsbot), Explained artilcle [here](https://towardsdatascience.com/full-pipeline-project-python-ai-for-detecting-fake-news-with-nlp-bbb1eec4936d).