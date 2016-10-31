'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , transmission = {
    campaign_id: 'ricks-campaign',
    content: {
      template_id: 'ricks-template'
    },
    recipients: [{ address: { email: 'rick.sanchez@rickandmorty100years.com', name: 'Rick Sanchez' } }]
  }
  , options = {
    num_rcpt_errors: 3
  };

// Promise
client.transmissions.send(transmission, options)
  .then(data => {
    console.log('What up my glib globs! SparkPost!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.transmissions.send(transmission, options, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('What up my glib globs! SparkPost!');
    console.log(data);
  }
});
