# [Insert Name Here] Node.js SDK

The official node.js binding for your favorite [insert name here] APIs!

Before using this library, you must have a valid API Key. To get an API Key, please follow the instructions [here](LINK ME WITH DOCS). 

## Installation

```
npm install [insert name here]
```

## Getting Started: Your First Mailing
```
var SDK = require('insertnamehere');
var sdk = new SDK({key: '1234567'});

// Create and save a new piece of content
// Fill me in when we write the templates bit

// Create a list and add some recipients
// Fill me in when we write the recipient list bit

// Send your email!
var transmission = new sdk.Transmission();
transmission.setCampaign('FirstMailing')
            .setReturnPath('bounces@example.com')
            .enableOpenTracking()
            .enableClickTracking()
            .useStoredTemplate('first-template')
            .useRecipientList('first-list')
            .send(function(err, res) {
              if (err) {
                // Handle error
              } else {
                console.log('Woot! You sent your first mailing!!');
              }
            });
```
## More Information
Links to documentation/customer support site, FAQs, etc.

## Development

### Setup

Run `npm install` inside the repository to install all the dev dependencies. 

We use [Grunt](http://gruntjs.com/) for our task runner, so you will also have to install Grunt globally `npm install -g grunt-cli`

### Testing

Once all the dependencies are installed, you can execute the unit tests using `grunt test`

### Contributing

Adding issues guidelines

Submitting pull requests

Signing CLA

Coding Standards
