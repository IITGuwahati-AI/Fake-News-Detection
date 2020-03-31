/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */

define(['ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'knockout', 'tfjs', 'ojs/ojknockout'],
  function (ResponsiveUtils, ResponsiveKnockoutUtils, ko, tf) {
    function ControllerViewModel() {
      var self = this;
      var word_index;
      var worker;
      var worker1;

      // self.sentiment = ko.observable();
      // self.negativityScore = ko.observable();


      self.sentiment1 = ko.observable();
      self.negativityScore1 = ko.observable();

      // self.reviewText0 = ko.observable("Luxury hotel at very good value for money. Would definitely return");
      // self.reviewText1 = ko.observable("Would definitely return");
      self.reviewText2 = ko.observable("Would");
      self.reviewText3 = ko.observable("hell yeah");
       // = ko.observable("");
      

      self.reviewText_1 = ko.computed(function() {
          return self.reviewText2() + " " + self.reviewText3();
      }, self);
      
      // console.log(self.reviewTextmain);
      // self.throttledValue =  ko.computed(self.reviewText).extend({ throttle: 400 });
      // self.throttledValue1 = ko.computed(self.reviewText1).extend({ throttle: 400 });
      self.throttledValue1 =  ko.computed(self.reviewText_1).extend({ throttle: 400 });


      // self.throttledValue.subscribe(function (val) {
      //   if (val !== '') {
      //     console.log('Processing: ' + val);
      //     seq = create_sequences(val);

      //     if (!worker) {
      //       worker = new Worker("js/worker.js");
      //     }
      //     worker.postMessage(seq);
      //     worker.onmessage = function (event) {
      //       console.log('prediction: ' + event.data);
      //       self.negativityScore(event.data);
      //       self.sentiment(convertToSentiment(event.data));
      //     };
      //   }
      // });

      self.throttledValue1.subscribe(function (val) {
        if (val !== '') {
          console.log('Processing: ' + val);
          seq = create_sequences(val);

          if (!worker1) {
            worker1 = new Worker("js/worker1.js");
          }
          worker1.postMessage(seq);
          worker1.onmessage = function (event) {
            console.log('prediction: ' + event.data);
            self.negativityScore1(event.data);
            self.sentiment1(convertToSentiment(event.data));
          };
        }
      });



      async function createModel() {
        const model = await tf.loadLayersModel('js/ml/model.json')
        return model
      }

    


      async function createModel1() {
        const model = await tf.loadLayersModel('js/ml0/model.json')
        return model
      }

      function process(txt) {
        out = txt.replace(/[^a-zA-Z0-9\s]/, '')
        out = out.trim().split(/\s+/)
        for (var i = 0; i < out.length; i++)
          out[i] = out[i].toLowerCase()
        return out

      }

      async function loadDict() {
        await $.ajax({
          url: 'js/ml0/dict.csv',
          dataType: 'text',
        }).done(success);
      }

      function success(data) {
        var wd_idx = new Object();
        lst = data.split(/\r?\n|\r/)

        for (var i = 0; i < lst.length; i++) {
          key = (lst[i]).split(',')[0]
          value = (lst[i]).split(',')[1]

          if (key == "")
            continue
          wd_idx[key] = parseInt(value)

        }

        word_index = wd_idx
      }

      function create_sequences(txt) {
        // max_token - statement with the largest number of words
        max_tokens = 27
        tokens = []
        words = process(txt)
        seq = Array.from(Array(max_tokens), () => 0)
        start = max_tokens - words.length
        for (var i = 0; i < words.length; i++) {
          if (Object.keys(word_index).includes(words[i])) {
            seq[i + start] = word_index[words[i]]
          }

        }
        return seq
      }

      function convertToSentiment(param) {
        if (param > 0.9) return '😱';
        if (param > 0.8) return '😦';
        if (param > 0.6) return '🙁';
        if (param > 0.4) return '😐';
        if (param > 0.2) return '🙂';
        if (param > 0.1) return '😀';

        return '😍';
      }

      $(document).ready(async function () {
        console.log('TensorFlow.js: ' + tf.version.tfjs);

        console.log('Start loading dictionary');
        await loadDict();
        console.log('Finish loading dicionary');

        tf.setBackend('cpu');
        console.log('Start loading model')
        model = await createModel1()
        console.log('Finish loading model')

        seq = create_sequences('Bed was comfy');
        input = tf.tensor(seq);
        input = input.expandDims(0);
        console.log('Start predict');
        predictOut = model.predict(input);
        score = predictOut.dataSync()[0];
        console.log('prediction: ' + score);
        self.negativityScore1(score);
        self.sentiment1(convertToSentiment(score));
        predictOut.dispose();
        console.log('Finish predict');
      });

    }

    
  //   function ControllerViewModel1() {
  //     var self = this;
  //     var word_index;
  //     var worker1;

  //     self.sentiment1 = ko.observable();
  //     self.negativityScore1= ko.observable();

  //     self.reviewText2 = ko.observable("Luxury hotel at very good value for money. Would definitely return");
  //     self.reviewText3 =  ko.observable("Would definitely return");
  //      // = ko.observable("");
  // }    
    return new ControllerViewModel();

      
}
);
  













