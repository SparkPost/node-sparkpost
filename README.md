# SparkPost Node.js SDK

The official node.js binding for your favorite SparkPost APIs!

Before using this library, you must have a valid API Key.

To get an API Key, please log in to your SparkPost account and generate one in the Settings page.

## Installation

```
npm install sparkpost
```

## Getting Started: Your First Mailing
```
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
