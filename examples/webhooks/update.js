'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , webhook = {
    name: 'Renamed Test Webhook',
    events: [
      'policy_rejection',
      'delay'
    ]
  };

// Promise
client.webhooks.update('TEST_WEBHOOK_UUID', webhook)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.webhooks.update('TEST_WEBHOOK_UUID', webhook, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
