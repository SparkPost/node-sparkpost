'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , webhook = {
    name: 'Test webhook'
    , target: 'http://client.test.com/test-webhook'
    , auth_token: 'AUTH_TOKEN'
    , events: [
      'delivery',
      'injection',
      'open',
      'click'
    ]
  };

client.webhooks.create(webhook, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
