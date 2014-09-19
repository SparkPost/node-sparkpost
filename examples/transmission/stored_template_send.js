'use strict';

var key = 'YOURAPIKEY'
  , host = 'YOURHOST'
  , SDK = require('../index')({ key: key, host: host })
  , transmission = new SDK.transmission();

transmission
  .setReturnPath('return@example.com')
  .setFrom('From Envelope <from@example.com>')
  .setRecipient({
      'address': {
        'email': 'john.doe@sample.com'
      }
  })
  .useStoredTemplate('my-template')
  .send(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log('Congrats you can use our sdk!');
    }
  });
