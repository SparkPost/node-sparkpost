'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

var reqOpts = {
  transmissionBody: {
    recipients: [{ address: { email: 'john.doe@example.com' } }],
    content: {
      template_id: 'my-template'
    }
  }
};

client.transmissions.send(reqOpts, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
