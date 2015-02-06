'use strict';

var key = 'YOURAPIKEY'
  , sparkpost = require('sparkpost')({ key: key });

sparkpost.sendingDomains.find('example1.com', function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
    console.log('Congrats you can use our SDK!');
  }
});
