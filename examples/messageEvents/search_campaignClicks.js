'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , searchParams = {
      events: 'click',
      campaign_ids: 'monday_mailshot'
    };

client.messageEvents.search(searchParams, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});

