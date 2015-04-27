'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost({key: key});

var trans = {
  template: 'my-template',
  from: 'From Envelope <example@sparkpostbox.com>',
  subject: 'Example Email for Stored Template',
  recipients: [{ address: { email: 'john.doe@example.com' } }]
};

client.transmission.send(trans, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
