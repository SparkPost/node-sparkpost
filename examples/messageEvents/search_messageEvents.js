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

client.messageEvents.search(searchParams, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});

