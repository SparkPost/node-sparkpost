'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , parameters = {
    from: '2015-05-07T00:00:00+0000'
    , to: '2015-05-07T23:59:59+0000'
    , limit: 5
  };

client.suppressionList.search(parameters, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('Congrats you can use our client library!');
  }
});
