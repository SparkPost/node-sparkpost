'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , createOpts = {domain: 'example1.com'};

// Promise
client.inboundDomains.create(createOpts)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.inboundDomains.create(createOpts, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
