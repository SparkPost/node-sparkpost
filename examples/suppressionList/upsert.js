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

client.suppressionList.upsert(recipient, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
