'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , searchParams = {
    events: ['bounce', 'out_of_band'],
    bounce_classes: [10,50]
  };

client.messageEvents.search(searchParams, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});

