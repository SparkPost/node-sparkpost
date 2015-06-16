'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

var trans = {
  recipients: [{ address: { email: 'john.doe@example.com' } }],
  content: {
    templateId: 'my-template',
    from: 'From Envelope <example@sparkpostbox.com>',
    subject: 'Example Email for Stored Template'
  }
};

client.transmissions.send({transmissionBody: trans}, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
