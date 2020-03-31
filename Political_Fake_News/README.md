# Political Fake News
![GitHub Logo](../Political_Fake_News/images/l1.jpg)

This is a project of detecting political fake news by deep learning by IITG.ai
## Introduction

![GitHub Logo](../Political_Fake_News/images/fakenewsweb.jpg)

Fake News is a spread of disinformation and hoaxes through any
news platform. The imminent threat of such a widespread
misinformation is obvious and hence we have looked into ways
in which such Fake News can be identified with the help of
Artificial Intelligence. Fake News Detection and analysis is an
open challenge in AI!

## Data

The dataset can be found [here](https://drive.google.com/file/d/1S87SdxYZhaEorrG2V5tAU_2VJcgsEHrw/view?usp=sharing)

The LIAR-PLUS Dataset along with additional data
scraped from Politifact website was used by taking
training size to 20,000 examples.The data is cleaned and we have concatenated the statement and description
by a sentence.

## Code

This code was written and trained on Google colab.The notebook contains code for training and evaluation using pretrained bert model using ktrain.

### Dependencies
* tensorflow 2.0+ is required
* need to install ktrain 

   `pip install ktrain` 
* pandas 0.25+
* sklearn 0.21+

### Training
Paste the dataset downloaded in the folder
`data/`
Additionally you can import it from drive if you are using colab. 

You can choose any of the pretrained models in ktrain package by changing the model name in the cell

`MODEL_NAME = 'bert-large-uncased'`

I have used bert-large-uncased for which I got the maximum evaluation and test set accuracy and trained on tesla P100 GPU on Google Colab

You can check other hugging face transfomers BERT, DistilBERT, NBSVM, fastText, and other models.

### Weights

Download the weights folder [here](https://drive.google.com/open?id=1tbV2Co7QPw9oh3mjx3oD-KiWaI4z6418)
and add the folder to the current directory.


### Testing 
 test = statement + '<>' + description  
 
 `predictor.predict(test)` 
 
 will give the result 
 
 You can check the notebook cells for the above
  



## Description 

![GitHub Logo](../Political_Fake_News/images/p.PNG)

The statement and justification approach is used.
The statement is a direct quote from a public
personality. The justification is the context or
background information for the statement.
Justification is important as the statement on its own
doesn’t imply anything in regard to it being False or
True.

Given enough training examples the model learns to
make inference on statements given a justification and
we got the best accuracy by BERT uncased large model
of 70 % on test set.

Out of all the model
architectures we tried, the architecture with the
best accuracy was with BERT with an accuracy of
70% on the test set. This surpasses the accuracy
outlined in the paper.



## Conclusion

Our model has huge future prospects and can be
easily scaled. The Political Fake News is currently
trained on the US dataset where fake news was the
main topic of the US election 2016 and the problem is
expected to grow in India as well. The future work
would extend this to an Indian dataset .
