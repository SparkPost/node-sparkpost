'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    campaign_id: 'my_campaign'
  };

client.transmissions.all(options)
  .then(data => {
    console.log(data);
    console.log('Congrats you can use our client library!');
  })
  .catch(err => {
    console.log(err);
  });

// Using a callback
client.transmissions.all(options, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
