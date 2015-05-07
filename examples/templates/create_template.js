'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    template: {
      id: 'TEST_ID'
      , name: 'Test Template'
      , content: {
        from: 'test@test.com'
        , subject: 'Test email template!'
        , html: '<b>This is a test email template!</b>'
      }
    }
  };

client.templates.create(options, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
