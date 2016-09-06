'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    name: 'Test Subaccount'
    , keyLabel: 'Test Subaccount key'
    , keyGrants: [
      'smtp/inject'
      , 'transmissions/modify'
    ]
  };

client.subaccounts.create(options, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
