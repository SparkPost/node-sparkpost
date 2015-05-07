'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , recipient = {
    email: 'test@test.com'
    , transactional: false
    , non_transactional: true
    , description: 'Test description'
  };

client.suppressionList.upsert(recipient, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
