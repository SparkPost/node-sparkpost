'use strict';

var key = 'YOURAPIKEY'
  , SparkPost = require('sparkpost')
  , client = new SparkPost(key)
  , options = {
    template: {
      id: 'TEST_ID'
      , content: {
        from: 'test@test.com'
        , subject: 'Updated Published Test email template!'
        , html: '<b>This is a published test email template! Updated!</b>'
      }
    }
    , update_published: true
  };

client.templates.update(options, function(err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log(res.body);
    console.log('Congrats you can use our SDK!');
  }
});
