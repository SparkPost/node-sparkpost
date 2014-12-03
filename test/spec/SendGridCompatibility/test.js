var sendGridCompatibility = require('../../../index').SendGridCompatibility;
var sendgrid = new sendGridCompatibility('user', 'apikey');
var email = new sendgrid.Email();

email.bcc     = ['bcc@bbc.co.uk', 'bcc@cbc.ca'];
email.to      = "different@email.com";
email.replyto = "reply-here@email.com";
email.subject = "This is a subject";
email.addTo('asdf@asdf.net');
email.setFrom('1234@5678.com');
email.setSubject('this is a different subject');
email.setText('this is a boring way to read email');
email.setHtml('<h1>¡¡¡THIS IS AN EXCITING WAY TO READ EMAIL!!!<h1>');
email.setHeaders({full: 'hearts'});
email.addHeader('spin', 'attack');
email.addHeader('mask', 'salesman');
email.setSubstitutions({keep: ['secret'], other: ['one', 'two']});
email.addSubstitution('key', 'value');
email.addSubstitution('otherother', ['three', 'four', 'five']);
email.setSections({'-charge-': 'This ship is useless.'});
email.addSection('-uncharge-', 'This ship isnt useless.');
//email.setUniqueArgs({cow: 'chicken'});
//email.addUniqueArg({cat: 'dog'});
//email.setCategories(['tactics']);
//email.addCategory('advanced');
/*email.setFilters({
  'footer': {
    'setting': {
      'enable': 1,
      'text/plain': 'You can haz footers!'
    }
  }
});*/
//email.addFilter('footer', 'enable', 1);
//email.addFilter('footer', 'text/html', '<strong>boo</strong>');
/*email.addFile({
  filename: 'secret.txt',
  content:  new Buffer('You will never know....')
});*/
console.log(email);
sendgrid.send(email);
