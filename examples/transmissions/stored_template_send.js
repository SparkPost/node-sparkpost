'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key);

var reqOpts = {
  transmissionBody: {
    campaignId: 'ricks-campaign',
    content: {
      template_id: 'ricks-template'
    },
    'num_rcpt_errors': 3,
    recipients: [{ address: { email: 'rick.sanchez@rickandmorty100years.com', name: 'Rick Sanchez' } }]
  }
};

client.transmissions.send(reqOpts, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('What up my glib globs! SparkPost!');
  }
});
