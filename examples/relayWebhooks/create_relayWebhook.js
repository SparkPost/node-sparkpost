'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    name: 'Test Relay Webhook'
    , target: 'http://client.test.com/test-webhook'
    , domain: 'inbound.example.com'
  };

client.relayWebhooks.create(options, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our client library!');
  }
});
