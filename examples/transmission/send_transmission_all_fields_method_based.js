'use strict';

var key = 'YOURAPIKEY'
  , host = 'YOURHOST'
  , SDK = require('../../index')({ key: key, host: host });

var transmission = new SDK.transmission();

transmission
  .setCampaign('my campaign')
  .setMetadata({
    sample_campaign: true,
    type: 'test type meta data'
  })
  .setSubstitutionData({
    name: 'Test Name'
  })
  .setDescription('My Description')
  .setReturnPath('return@example.com')
  .setReplyTo('reply@test.com')
  .setContentHeaders({
    'X-Custom-Header': 'Sample Custom Header'
  })
  .disableOpenTracking()
  .disableClickTracking()
  .setFrom('From Envelope <from@example.com>')
  .setRecipient({
      'address': {
        'email': 'john.doe@sample.com'
      }
  })
  .setSubject('Example Email: {{name}}')
  .setHTMLContent('<p>Hello World! Your name is: {{name}}</p>')
  .setTextContent('Hello World!');

transmission.send(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log(res);
      console.log('Congrats you can use our sdk!');
    }
  });
