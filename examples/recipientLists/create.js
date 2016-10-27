'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , recipientList = {
    id: 'UNIQUE_TEST_ID'
    , name: 'Test Recipient List'
    , recipients: [
      {
        address: {
          email: 'test1@test.com'
        }
      }
      , {
        address: {
          email: 'test2@test.com'
        }
      }
      , {
        address: {
          email: 'test3@test.com'
        }
      }
    ]
  };

// Promise
client.recipientLists.create(recipientList)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.recipientLists.create(recipientList, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
