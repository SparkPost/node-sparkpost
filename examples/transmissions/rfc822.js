'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

var trans = {
  recipients: [{ address: { email: 'john.doe@example.com' } }],
  rfc822: 'Content-Type: text/plain\nFrom: From Envelope <from@example.com>\nSubject: Example Email\n\nHello World',
  from: 'From Envelope <from@example.com>',
  subject: 'Example Email for RFC-822 Content'
};

client.transmissions.send({transmissionBody: trans}, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
