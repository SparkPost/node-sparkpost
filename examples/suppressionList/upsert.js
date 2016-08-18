'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , recipients = [
    {
      email: 'test1@test.com'
      , transactional: false
      , non_transactional: true
      , description: 'Test description 1'
    },
    {
      email: 'test2@test.com'
      , transactional: true
      , non_transactional: true
      , description: 'Test description 2'
    },
    {
      email: 'test3@test.com'
      , transactional: true
      , non_transactional: false
      , description: 'Test description 3'
    }
  ];

client.suppressionList.upsert(recipient, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
