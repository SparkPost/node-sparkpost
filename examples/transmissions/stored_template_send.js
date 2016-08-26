'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    campaign_id: 'ricks-campaign',
    content: {
      template_id: 'ricks-template'
    },
    'num_rcpt_errors': 3,
    recipients: [{ address: { email: 'rick.sanchez@rickandmorty100years.com', name: 'Rick Sanchez' } }]
  };

client.transmissions.send(options)
  .then(data => {
    console.log(data);
    console.log('What up my glib globs! SparkPost!');
  })
  .catch(err => {
    console.log(err);
  });

// Using a callback
client.transmissions.send(options, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    console.log('What up my glib globs! SparkPost!');
  }
});
