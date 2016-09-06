'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    recipients: {
      list_id: 'example-list'
    },
    content: {
      from: 'From Envelope <from@example.com>',
      subject: 'Example Email for Stored List and Inline Content',
      html: '<html><body><p>Hello World</p></body></html>',
      text: 'Hello World!'
    }
  };

client.transmissions.send(options)
  .then(data => {
    console.log(data);
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
