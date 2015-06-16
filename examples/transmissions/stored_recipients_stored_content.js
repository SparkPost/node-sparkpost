'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

var reqOpts = {
  transmissionBody: {
    recipients: {
      listId: 'example-list'
    },
    content: {
      from: 'From Envelope <from@example.com>',
      subject: 'Example Email for Stored List and Template',
      templateId: 'my-template'
    }
  }
};

client.transmissions.send(reqOpts, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
