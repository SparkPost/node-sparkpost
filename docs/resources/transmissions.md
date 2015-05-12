# Transmissions

This library provides easy access to the [Transmissions](https://www.sparkpost.com/api#/reference/transmissions/) Resource.

## Methods
* **all(callback)**
  List an overview of all transmissions in the account.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data.res` - full response from request client
    * `data.body` - payload from response
* **find(transmissionID, callback)**
  Retrieve the details about a transmission by its ID
  * `transmissionID` - the id of the transmission you want to look up **required**
  * `callback` - see all function
* **send(transmissionBody, callback)**


## Getting Started: Your First Mailing

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR API KEY');

var trans = {};

// Set some metadata for your email
trans.campaign = 'first-mailing';
trans.from = 'you@your-company.com';
trans.subject = 'First SDK Mailing';

// Add some content to your email
trans.html = '<html><body><h1>Congratulations, {{name}}!</h1><p>You just sent your very first mailing!</p></body></html>';
trans.text = 'Congratulations, {{name}}!! You just sent your very first mailing!';
trans.substitutionData = {name: 'YOUR FIRST NAME'};

// Pick someone to receive your email
trans.recipients = [{ address: { name: 'YOUR FULL NAME', email: 'YOUR EMAIL ADDRESS' } }];

// Send it off into the world!
client.transmissions.send(trans, function(err, res) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Woohoo! You just sent your first mailing!');
  }
});
```

## Field Descriptions
### Transmissions
| Field Name       | Required?   | Description                                                                                                                | Data Type        |
| ------------     | ----------- | -------------                                                                                                              | -----------      |
| description      | no          | Field for describing what this transmission is for the user                                                                | String           |
| campaign         | no          | Field for assigning a given transmission to a specific campaign, which is a logical container for similar transmissions    | String           |
| metadata         | no          | Field for adding arbitrary key/value pairs which will be included in open/click tracking                                   | Object (Simple)  |
| substitutionData | no          | Field for adding transmission level substitution data, which can be used in a variety of fields and in content             | Object (Complex) |
| trackOpens       | no          | Field for enabling/disabling transmission level open tracking, if not set will use settings from Template                                             | Boolean          |
| trackClicks      | no          | Field for enabling/disabling transmission level click tracking, if not set will use settings from Template                                             | Boolean          |
| useSandbox       | no          | Field for enabling/disabling using sandbox domain to send transmission(You are limited to 50 messages ever with sandbox)   | Boolean          |
| useDraftTemplate | no          | Field for allowing the sending of a transmission using a draft of a stored template (default: false)                       | Boolean          |
| replyTo          | no          | Field for specifying the email address that should be used when a recipient hits the reply button                          | String           |
| subject          | yes         | Field for setting the subject line of a given transmission                                                                 | String           |
| from             | yes         | Field for setting the from line of a given transmission                                                                    | String or Object |
| html             | yes**       | Field for setting the HTML content of a given transmission                                                                 | String           |
| text             | yes**       | Field for setting the Plain Text content of a given transmission                                                           | String           |
| rfc822           | no**        | Field for setting the RFC-822 encoded content of a given transmission                                                      | String           |
| template         | no**        | Field for specifying the Template ID of a stored template to be used when sending a given transmission                     | String           |
| customHeaders    | no          | Field for specifying additional headers to be applied to a given transmission (other than Subject, From, To, and Reply-To) | Object (Simple)  |
| recipients       | yes**       | Field for specifying who a given transmission should be sent to                                                            | Array of Objects |
| recipientList    | no**        | Field for specifying a stored recipient list ID to be used for a given transmission                                        | String           |

** - If using inline content then html or text are required. If using RFC-822 Inline Content, then rfc822 is required. If using a stored recipient list, then recipientList is required. If using a stored template, then template is required.

## Tips and Tricks
* If you specify a stored recipient list and inline recipients in a Transmission, you will receive an error.
* If you specify HTML and/or Plain Text content and then provide RFC-822 encoded content, you will receive an error.
    * RFC-822 content is not valid with any other content type.
* If you specify a stored template and also provide inline content, you will receive an error.
* By default, open and click tracking are enabled for a transmission.
* By default, a transmission will use the published version of a stored template.
