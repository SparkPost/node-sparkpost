'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

var reqObj = {
  transmissionBody: {
    recipients: {
      list_id: 'example-list'
    },
    content: {
      from: 'From Envelope <from@example.com>',
      subject: 'Example Email for Stored List and Inline Content',
      html: '<html><body><p>Hello World</p></body></html>',
      text: 'Hello World!'
    }
  }
};

client.transmissions.send(reqObj, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
