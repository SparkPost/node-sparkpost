'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , webhook = {
    name: 'Test Webhook',
    target: 'http://client.test.com/test-webhook',
    auth_token: 'AUTH_TOKEN',
    events: [
      'delivery',
      'injection',
      'open',
      'click'
    ]
  };

// Promise
client.webhooks.create(webhook)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.webhooks.create(webhook, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
