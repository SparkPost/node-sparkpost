'use strict';

var key = 'YOURAPIKEY'
  , sparkpost = require('sparkpost')({ key: key });

var trans = {
  campaign: 'my-campaign',
  metadata: {
   sample_campaign: true,
   type: 'these are custom fields'
  },
  substitutionData: {
    name: 'Test Name'
  },
  description: 'my description',
  replyTo: 'reply@test.com',
  customHeaders: {
    'X-Custom-Header': 'Sample Custom Header'
  },
  trackOpens: true,
  trackClicks: true,
  useSandbox: true,
  useDraftTemplate: true,
  from: 'From Envelope <from@example.com>',
  html: '<p>Hello World! Your name is: {{name}}</p>',
  text: 'Hello World!',
  subject: 'Example Email for All Fields',
  recipients: [
    {
      address: {
        email: 'john.doe@example.com'
      }
    }
  ]
};

sparkpost.transmission.send(trans, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res);
    console.log('Congrats you can use our SDK!');
  }
});
