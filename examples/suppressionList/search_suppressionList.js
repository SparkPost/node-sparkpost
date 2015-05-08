'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , parameters = {
    from: '2015-05-07T00:00:00+0000'
    , to: '2015-05-07T23:59:59+0000'
    , limit: 5
  };

client.suppressionList.search(parameters, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
