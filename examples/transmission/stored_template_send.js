'use strict';

var key = 'YOURAPIKEY'
  , sparkpost = require('sparkpost')({ key: key });

var trans = {
  template: 'my-template',
  from: 'From Envelope <from@example.com>',
  subject: 'Example Email for Stored Template',
  recipients: [{ address: { email: 'john.doe@example.com' } }]
};

sparkpost.transmission.send(trans, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
    console.log('Congrats you can use our SDK!');
  }
});
