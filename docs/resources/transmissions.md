# Transmissions

This library provides easy access to the [Transmissions](https://www.sparkpost.com/api#/reference/transmissions/) Resource.

## Methods
* **all(options, callback)**
  List an overview of all transmissions in the account
  * `options.campaign_id` - id of the campaign used by the transmission
  * `options.template_id` - id of the template used by the transmission
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(transmissionID, callback)**
  Retrieve the details about a transmission by its ID
  * `transmissionID` - id of the transmission you want to look up **required**
  * `callback` - see all function
* **send(options, callback)**
  Sends a message by creating a new transmission
  * `options.transmissionBody` - a transmission object **required**
  * `options.num_rcpt_errors` - maximum number of recipient errors returned
  * `callback` - see all function


## Getting Started: Your First Mailing

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR API KEY');

var trans = {
  content: {}
};

// Set some metadata for your email
trans.campaignId = 'first-mailing';
trans.content.from = 'you@your-company.com';
trans.content.subject = 'First SDK Mailing';

// Add some content to your email
trans.content.html = '<html><body><h1>Congratulations, {{name}}!</h1><p>You just sent your very first mailing!</p></body></html>';
trans.content.text = 'Congratulations, {{name}}!! You just sent your very first mailing!';
trans.substitutionData = {name: 'YOUR FIRST NAME'};

// Pick someone to receive your email
trans.recipients = [{ address: { name: 'YOUR FULL NAME', email: 'YOUR EMAIL ADDRESS' } }];

// Send it off into the world!
client.transmissions.send({transmissionBody: trans}, function(err, res) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Woohoo! You just sent your first mailing!');
  }
});
```
Check out all the examples provided [here](/examples/transmissions).

## Tips and Tricks
* If you specify a stored recipient list and inline recipients in a Transmission, you will receive an error.
* If you specify HTML and/or Plain Text content and then provide RFC-822 encoded content, you will receive an error.
    * RFC-822 content is not valid with any other content type.
* If you specify a stored template and also provide inline content, you will receive an error.
* By default, open and click tracking are enabled for a transmission.
* By default, a transmission will use the published version of a stored template.
