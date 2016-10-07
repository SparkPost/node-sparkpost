'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , template = {
    id: 'TEST_ID',
    name: 'Test Template',
    content: {
      from: 'test@test.com',
      subject: 'Test email template!',
      html: '<b>This is a test email template!</b>'
    }
  };

// Promise
client.templates.create(template)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Callback
client.templates.create(template, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
