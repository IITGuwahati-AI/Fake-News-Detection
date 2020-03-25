# Fake-News-Article
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
$ pip3 install pytorch_pretrained_bert
$ pip3 install transformers
```
## Dataset

- Data is collected by scraping the websites of popular news publishing sources.
- The collected news articles are judged using the score, quality, bias as metric collected from [Politilact](https://www.politifact.com/) and [Media Charts](https://www.adfontesmedia.com/interactive-media-bias-chart/?v=402f03a963ba).
- Some basic preprocessing is also done on the text collected from scraping websites.

> scraping from websites listed in [politifact_data.csv](https://github.com/abhilashreddys/Fake-News-Article/blob/master/politifact_data.csv)
```shell
$ python3 scrape_politifact.py
```

> scraping from websites listed in [Interactive Media Bias Chart - Ad Fontes Media.csv](https://github.com/abhilashreddys/Fake-News-Article/blob/master/Interactive%20Media%20Bias%20Chart%20-%20Ad%20Fontes%20Media.csv)
```shell
$ python3 scrape_media.py
```
- Data after scraping and preprocessing [politifact_text.csv](https://github.com/abhilashreddys/Fake-News-Article/blob/master/politifact_text.csv) , [pre_media.csv](https://github.com/abhilashreddys/Fake-News-Article/blob/master/pre_media.csv)

## Weights : [Link](https://drive.google.com/drive/folders/108JY7_yROQQsJDFbusVPP1aUmkZ4xe16?usp=sharing)
