'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
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

client.recipientLists.create(options, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
