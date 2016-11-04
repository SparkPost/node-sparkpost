'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , transmission = {
    recipients: [
      {
        address: {
          email: 'original.recipient@example.com',
          name: 'Original Recipient'
        },
        substitution_data: {
          recipient_type: 'Original'
        }
      },
      {
        address: {
          email: 'cc.recipient@example.com',
          name: 'Carbon Copy Recipient',
          header_to: '"Original Recipient" <original.recipient@example.com>'
        },
        substitution_data: {
          recipient_type: 'CC'
        }
      }
    ],
    content: {
      from: {
        name: 'Node CC Test',
        email: 'from@example.com'
      },
      headers: {
        'CC': '"Carbon Copy Recipient" <cc.recipient@example.com>'
      },
      subject: 'Example email using cc',
      text: 'An example email using cc with SparkPost to the {{recipient_type}} recipient.',
      html: '<p>An example email using cc with SparkPost to the {{recipient_type}} recipient.</p>'
    }
  };

// Promise
client.transmissions.send(transmission)
  .then(data => {
    console.log('Congrats! You sent an email with cc using SparkPost!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.transmissions.send(transmission, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats! You sent an email with cc using SparkPost!');
    console.log(data);
  }
});
