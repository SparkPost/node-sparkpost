'use strict';

var key = 'YOURAPIKEY'
  , sparkpost = require('sparkpost')({ key: key });

var trans = {
  from: 'From Envelope <from@example.com>',
  recipientList: 'example-list',
  subject: 'Example Email for Stored List and Inline Content',
  html: '<html><body><p>Hello World</p></body></html>',
  text: 'Hello World!'
};

sparkpost.transmission.send(trans, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
    console.log('Congrats you can use our SDK!');
  }
});
