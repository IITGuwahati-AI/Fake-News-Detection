import requests
import bs4
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

# Reading csv file which has websites to scrape and score(to judge the article)
# Don't forgot to edit the file location as per your needs
data = pd.read_csv("politifact_data.csv")

	# CAUTION: There might be some redirecting websites which mght cause a problem and 
	# some site might block because requesting to many times.
	# "SO PLEASE KEEP AN EYE WHILE SCRAPING"

data["text"] = ""
#  scraping
for i in range(data.shape[0]):
    print(i)
    try:
        result=requests.get(str(data.iloc[i]['news_url']))
    except Exception:
        print(str(i)+" - error")
        continue
    src=result.content
    soup=BeautifulSoup(src,'lxml')   
    text=[]	
    for p_tag in soup.find_all('p'):
        text.append(p_tag.text)
    data.at[i,"text"] = text

# PREPROCESSING

# Replacing empty cells with nan
data['text'] = data['text'].apply(lambda x: np.nan if x == ""  else x)
data['text'] = data['text'].apply(lambda x: np.nan if x == '[]' else x)
data['text'] = data['text'].apply(lambda x: np.nan if x == [] else x)

data.dropna(subset=['text'],inplace=True) # Droping null values

# removing unnecessary punctuation

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

# data['text'] = data['text'].apply(lambda x:str(x))
data['text'] = data['text'].apply(lambda x:Punctuation(str(x)))

# saving
data.to_csv('politifact_text.csv',index=False)