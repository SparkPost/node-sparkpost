'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    recipients: [{address: {email: 'john.doe@example.com'}}],
    content: {
      email_rfc822: 'Content-Type: text/plain\nFrom: From Envelope <from@example.com>\nSubject: Example Email\n\nHello World'
    }
  };

client.transmissions.send(options)
  .then(data => {
    onsole.log(data);
    console.log('Congrats you can use our client library!');
  })
  .catch(err => {
    console.log(err);
  });

// Using a callback
client.transmissions.send(options, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
