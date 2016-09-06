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
      subject: 'Example Email for Stored List and Template',
      template_id: 'my-template'
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
