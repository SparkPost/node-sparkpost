'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

client.transmission.find('YOUR-TRANSMISSION-KEY', function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
    console.log('Congrats you can use our SDK!');
  }
});
