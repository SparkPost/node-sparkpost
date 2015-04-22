'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

client.sendingDomains.find('example1.com', function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
