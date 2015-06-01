'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

var trans = {
  from: 'From Envelope <from@example.com>',
  recipients: [{ address: { email: 'john.doe@example.com' } }],
  subject: 'Example Email for MIME Parts',
  html: '<html><body><p>Hello World!</p></body></html>',
  text: 'Hello World!',
  trackOpens: true,
  trackClicks: true
};

client.transmissions.send({transmissionBody: trans}, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
