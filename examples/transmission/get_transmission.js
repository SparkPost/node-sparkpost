'use strict';

var key = 'YOURAPIKEY'
  , host = 'YOURHOST'
  , SDK = require('../../index')({ key: key, host: host });

var transmission = new SDK.transmission();

transmission.find('YOUR-TRANSMISSION-KEY', function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log('Congrats you can use our sdk!');
    }
  });
