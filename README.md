[![Travis CI](https://travis-ci.org/SparkPost/node-sparkpost.svg?branch=master)](https://travis-ci.org/SparkPost/node-sparkpost)

# SparkPost Node.js SDK

The official node.js binding for your favorite SparkPost APIs!

Before using this library, you must have a valid API Key.

To get an API Key, please log in to your SparkPost account and generate one in the Settings page.

## Installation

```
npm install sparkpost
```

## Getting Started: Your First Mailing

```javascript
var sparkpost = require('sparkpost')({key: 'YOUR API KEY'});

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
sparkpost.transmission.send(trans, function(err, res) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Woohoo! You just sent your first mailing!');
  }
});
```

## Learn More
* For more detailed examples, check our examples:
    * [Transmissions](https://github.com/MessageSystems/node-sdk/blob/master/examples/transmission/)
* Read our REST API documentation - <http://www.sparkpost.com/docs>

## Field Descriptions
### Transmissions
| Field Name       | Required?   | Description                                                                                                                | Data Type        |
| ------------     | ----------- | -------------                                                                                                              | -----------      |
| description      | no          | Field for describing what this transmission is for the user                                                                | String           |
| campaign         | no          | Field for assigning a given transmission to a specific campaign, which is a logical container for similar transmissions    | String           |
| metadata         | no          | Field for adding arbitrary key/value pairs which will be included in open/click tracking                                   | Object (Simple)  |
| substitutionData | no          | Field for adding transmission level substitution data, which can be used in a variety of fields and in content             | Object (Complex) |
| trackOpens       | no          | Field for enabling/disabling transmission level open tracking  (default: true)                                             | Boolean          |
| trackClicks      | no          | Field for enabling/disabling transmission level click tracking (default: true)                                             | Boolean          |
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

### Sending Domains
| Field Name       | Required?   | Description                                                                                                                | Data Type        |
| ------------     | ----------- | -------------                                                                                                              | -----------      |
| domainName       | yes         | Name of the sending domain | String           |
| privateKey       | yes**       | Private key used to create the DKIM Signature. | String           |
| publicKey        | yes**       | Public key to be retrieved from the DNS of the sending domain. | String           |
| selector         | yes**       | DomainKey selector that indicates the DKIM public key location. | String           |
| headers          | no          | Header fields to be included in the DKIM signature | String           |

** - If specifying a privateKey, publicKey, or selector, all three fields are required.

## Tips and Tricks
### General
* You _must_ provide at least an API key when instantiating the SparkPost Library - `{ key: '184ac5480cfdd2bb2859e4476d2e5b1d2bad079bf' }`
* The SDK's features are namespaced under the various SparkPost API names.

### Transmissions
* If you specify a stored recipient list and inline recipients in a Transmission, you will receive an error.
* If you specify HTML and/or Plain Text content and then provide RFC-822 encoded content, you will receive an error.
    * RFC-822 content is not valid with any other content type.
* If you specify a stored template and also provide inline content, you will receive an error.
* By default, open and click tracking are enabled for a transmission.
* By default, a transmission will use the published version of a stored template.

## Development

### Setup
We use [Grunt](http://gruntjs.com/) for our task runner, so you will also have to install Grunt globally `npm install -g grunt-cli`

Run `npm install` inside the repository to install all the dev dependencies.

### Testing
Once all the dependencies are installed, you can execute the unit tests using `grunt test`

### Contributing
Guidelines for adding issues

Submitting pull requests

Signing our CLA

Our coding standards
