'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    uri: 'metrics/domains'
  };

client.get(options)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });

// Using a callback
client.get(options, function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data);
});
