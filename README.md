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

## Tips and Gotchas
### General
* You _must_ provide at least an API key when instantiating the SDK - `{ key: '1234567' }`
* The SDK's features are namespaced under the various APIs.
* There are two ways to provide values to each namespace of the SDK:
    - On instantiation, you pass in a well-formed object (See examples).
    - You use the helper methods to incrementially create a well-formed object. These helper methods are chainable (See examples).

### Transmissions
* If you specify a stored recipient list and inline recipients in a Transmission, the stored recipient list will override the inline recipients.
* If you specify HTML and/or Plain Text content and then provide RFC-822 encoded content, you will recieve and error. RFC-822 content is not valid with any other content type.
* If you specify a stored template and provide inline content, you will receive an error.
* By default, open and click tracking are enabled for a transmission.
* By default, a transmission will use the published version of a stored template.

## More Information
* REST API Documentation - <http://docs.thecloudplaceholderapiv1.apiary.io/>
* Other pertinent links

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
