'use strict';

var key = 'YOURAPIKEY'
  , host = 'YOURHOST'
  , SDK = require('../../index')({ key: key, host: host })
  , transmission = new SDK.transmission();

transmission
  .setReturnPath('return@example.com')
  .setRecipient({
      'address': {
        'email': 'john.doe@sample.com'
      }
  })
  .setRfc822Content('Content-Type: text/plain\nFrom: From Envelope <from@example.com>\nSubject: Example Email\n\nHello World')
  .send(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log('Congrats you can use our SDK!');
    }
  });
