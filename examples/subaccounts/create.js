'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , subaccount = {
    name: 'Test Subaccount',
    key_label: 'Test Subaccount key',
    key_grants: [
      'smtp/inject',
      'transmissions/modify'
    ]
  };

// Promise
client.subaccounts.create(subaccount)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.subaccounts.create(subaccount, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
