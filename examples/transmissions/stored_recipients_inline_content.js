'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

var trans = {
  from: 'From Envelope <from@example.com>',
  recipientList: 'example-list',
  subject: 'Example Email for Stored List and Inline Content',
  html: '<html><body><p>Hello World</p></body></html>',
  text: 'Hello World!'
};

client.transmissions.send({transmissionBody: trans}, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
