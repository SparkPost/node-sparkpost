'use strict';

var key = 'YOURAPIKEY'
  , SDK = require('../../index')({ key: key });

var transmission = new SDK.transmission({
  returnPath: 'return@example.com',
  from: 'From Envelope <from@example.com>',
  html: '<p>Hello World!</p>',
  text: 'Hello World!',
  subject: 'Example Email',
  recipients: [
    {
      address: {
        email: 'john.doe@sample.com'
      }
    }
  ]
});

transmission.send(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log('Congrats you can use our SDK!');
    }
  });
