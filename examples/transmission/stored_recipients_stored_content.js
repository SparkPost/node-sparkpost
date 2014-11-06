'use strict';

var key = 'YOURAPIKEY'
  , sparkpost = require('sparkpost')({ key: key });

var trans = {
  from: 'From Envelope <from@example.com>',
  subject: 'Example Email for Stored List and Template',
  recipientList: 'example-list',
  storedTemplate: 'my-template',
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
