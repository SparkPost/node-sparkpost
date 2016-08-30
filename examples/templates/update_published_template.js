'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , template = {
    id: 'TEST_ID',
    content: {
      from: 'test@test.com',
      subject: 'Updated Published Test email template!',
      html: '<b>This is a published test email template! Updated!</b>'
    },
    update_published: true
  };

client.templates.update(template)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Using a callback
client.templates.update(template, function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
