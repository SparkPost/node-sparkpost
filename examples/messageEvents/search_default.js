'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

// Returns 1000 events for the last hour

// Promise
client.messageEvents.search({})
  .then((err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      console.log('Congrats you can use our client library!');
    }
  });

// Callback
client.messageEvents.search({}, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
