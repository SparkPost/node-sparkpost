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

client.subaccounts.create(options, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
    console.log('Congrats you can use our SDK!');
  }
});
