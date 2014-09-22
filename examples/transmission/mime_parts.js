'use strict';

var key = 'YOURAPIKEY'
  , SDK = require('../../index')({ key: key })
  , transmission = new SDK.transmission();

transmission
  .setReturnPath('return@example.com')
  .setFrom('From Envelope <from@example.com>')
  .setRecipient({
      'address': {
        'email': 'john.doe@sample.com'
      }
  })
  .setSubject('Example Email')
  .setHTMLContent('<p>Hello World!</p>')
  .setTextContent('Hello World!')
  .send(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log('Congrats you can use our SDK!');
    }
  });
