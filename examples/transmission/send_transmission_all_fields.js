'use strict';

var key = 'YOURAPIKEY'
  , host = 'YOURHOST'
  , SDK = require('../../index')({ key: key, host: host });

var transmission = new SDK.transmission({
  campaign: 'my-campaign',
  metadata: {
   sample_campaign: true,
   type: 'these are custom fields'
  },
  substitutionData: {
    name: 'Test Name'
  },
  description: 'my description',
  returnPath: 'return@example.com',
  replyTo: 'reply@test.com',
  headers: {
    'X-Custom-Header': 'Sample Custom Header'
  },
  openTracking: false,
  clickTracking: false,
  from: 'From Envelope <from@example.com>',
  html: '<p>Hello World! Your name is: {{name}}</p>',
  text: 'Hello World!',
  subject: 'Example Email: {{name}}',
  recipients: [
    {
      address: {
        email: 'john.doe@sample.com'
      }
    }
  ]
});

transmission.send(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log('Congrats you can use our sdk!');
    }
  });
