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

client.suppressionList.upsert(recipients, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
