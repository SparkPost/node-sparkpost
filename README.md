# SparkPost Node.js SDK

The Official Node.js binding for your favorite SparkPost APIs!

## Installation

```
npm install sparkpost
```

## Getting Started: Your First Mailing
```
var SparkPost = require('sparkpost');
var sdk = new SparkPost({key: '1234567'});

// Create and save a new piece of content
// Fill me in when we write the templates bit

// Create a list and add some recipients
// Fill me in when we write the recipient list bit

// Send your email!
var transmission = new sdk.Transmission();
transmission.setCampaign('My first mailing')
            .setReturnPath('bounces@example.com')
            .enableOpenTracking()
            .enableClickTracking()
            .useStoredTemplate('first-mailing')
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

## API Reference

### Transmission

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
