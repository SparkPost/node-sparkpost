'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

client.transmissions.find('YOUR-TRANsMISSION-KEY')
  .then(data => {
    console.log(data);
    console.log('Congrats you can use our client library!');
  })
  .catch(err => {
    console.log(err);
  });

// Using a callback
client.transmissions.find('YOUR-TRANSMISSION-KEY', function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
