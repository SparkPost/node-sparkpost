'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , searchParams = {
    from: '2016-01-01T00:00',
    to: '2016-01-02T23:59',
    page: 1,
    per_page: 5,
    events: ['bounce', 'out_of_band'],
    bounce_classes: [10]
  };

// Promise
client.messageEvents.search(searchParams)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.messageEvents.search(searchParams, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
