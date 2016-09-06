'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , webhook = {
    id: 'TEST_WEBHOOK_UUID'
    , name: 'Renamed Test webhook'
    , events: [
      'policy_rejection',
      'delay'
    ]
  };

client.webhooks.update(webhook, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
