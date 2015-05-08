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

client.webhooks.update(webhook, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
