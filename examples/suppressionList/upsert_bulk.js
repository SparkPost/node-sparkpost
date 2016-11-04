'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , listEntries = [
    {
      recipient: 'test1@test.com',
      transactional: false,
      non_transactional: true,
      description: 'Test description 1'
    },
    {
      recipient: 'test2@test.com',
      transactional: true,
      non_transactional: true,
      description: 'Test description 2'
    },
    {
      recipient: 'test3@test.com',
      transactional: true,
      non_transactional: false,
      description: 'Test description 3'
    }
  ];

// Promise
client.suppressionList.upsert(listEntries)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.suppressionList.upsert(listEntries, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
