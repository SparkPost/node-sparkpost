<a href="https://www.sparkpost.com"><img src="https://www.sparkpost.com/sites/default/files/attachments/SparkPost_Logo_2-Color_Gray-Orange_RGB.svg" width="200px"/></a>

[Sign up][sparkpost sign up] for a SparkPost account and visit our [Developer Hub](https://developers.sparkpost.com) for even more content.

# Node.js Client Library

[![Travis CI](https://travis-ci.org/SparkPost/node-sparkpost.svg?branch=master)](https://travis-ci.org/SparkPost/node-sparkpost) [![Coverage Status](https://coveralls.io/repos/SparkPost/node-sparkpost/badge.svg?branch=master&service=github)](https://coveralls.io/github/SparkPost/node-sparkpost?branch=master) [![NPM version](https://badge.fury.io/js/sparkpost.png)](http://badge.fury.io/js/sparkpost) [![Slack Status](http://slack.sparkpost.com/badge.svg)](http://slack.sparkpost.com)

The official Node.js binding for your favorite [SparkPost APIs](https://developers.sparkpost.com/api)!

## Prerequisites

Before using this library, you must have:

* A shiny new SparkPost Account, [sign up for a new account][sparkpost sign up] or [login to SparkPost](https://app.sparkpost.com/)
* A valid SparkPost API Key. Check out our [Support Center](https://support.sparkpost.com/) for information on how to [create API keys](https://support.sparkpost.com/customer/portal/articles/1933377-create-api-keys)

## Installation

```
npm install sparkpost
```

*Note: Node.js versions 0.10 and 0.12 are no longer supported.*

## Initialization
**new SparkPost(apiKey[, options])** - Initialization

* `apiKey`
    * Required: yes (unless key is stored in `SPARKPOST_API_KEY` environment variable)
    * Type: `String`
    * a passed in apiKey will take precedence over an environment variable
* `options.origin` or `options.endpoint`
    * Required: no
    * Type: `String`
    * Default: `https://api.sparkpost.com:443`<br/>
    *Note: To use the SparkPost EU API you will need to set this to `https://api.eu.sparkpost.com:443`.*
* `options.apiVersion`
    * Required: no
    * Type: `String`
    * Default: `v1`
* `options.stackIdentity`
    * Required: no
    * Type: `String`
    * An optional identifier to include in the User-Agent header. e.g. `product/1.0.0`
* `options.headers`
    * Required: no
    * Type: `Object`
    * set headers that apply to all requests
* `options.debug`
    * Required: no
    * Type: `Boolean`
    * Default: `false`
    * appends full response from request client as `debug` when `true` for debugging purposes<br/>
    *Note: This will expose your api key to the client-side. Do not use in production.*

## Methods

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

* **request(options[, callback])**
    * `options` - [see request modules options](https://github.com/mikeal/request#requestoptions-callback)
    * `options.uri` - can either be a full url or a path that is appended to `options.origin` used at initialization ([url.resolve](http://nodejs.org/api/url.html#url_url_resolve_from_to))
    * `options.debug` - setting to `true` includes full response from request client for debugging purposes
* **get | post | put | delete(options[, callback])**
    * `options` - see request options
    * Request method will be overwritten and set to the same value as the name of these methods.

## Creating a SparkPost Client

Passing in an API key
```js
const SparkPost = require('sparkpost');
const client = new SparkPost('YOUR_API_KEY');
```

Using an API key stored in an environment variable
```js
//Create an env var as SPARKPOST_API_KEY
const SparkPost = require('sparkpost');
const client = new SparkPost();
```

Specifying non-default options
```js
const SparkPost = require('sparkpost');
const options = {
  endpoint: 'https://dev.sparkpost.com:443'
};
const client = new SparkPost('YOUR_API_KEY', options);
```

## Using the Node Client Library Base Object
We may not wrap every resource available in the SparkPost Client Library, for example the Node Client Library does not wrap the Metrics resource,
but you can use the Node Client Library Base Object to form requests to these unwrapped resources. Here is an example request using the
base object to make requests to the Metrics resource. Here is an example request using the base object to make requests to
the Metrics resource.

```js
// Get a list of domains that the Metrics API contains data on.
const options = {
  uri: 'metrics/domains'
};

client.get(options)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  });
```

## Send An Email "Hello World" Example
Below is an example of how to send a simple email. Sending an email is known as a *transmission*. By using the send
method on the transmissions service that's available from the SparkPost object you instantiate, you can pass in an
object with all the [transmission attributes](https://developers.sparkpost.com/api/transmissions#header-transmission-attributes)
relevant to the email being sent. The send method will return a promise that will let you know if the email was sent
successful and if not information about the error that occurred. If a callback is passed, it will be executed.

```javascript
const SparkPost = require('sparkpost');
const client = new SparkPost('<YOUR API KEY>');

// If you have a SparkPost EU account you will need to pass a different `origin` via the options parameter:
// const euClient = new SparkPost('<YOUR API KEY>', { origin: 'https://api.eu.sparkpost.com:443' });

client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Hello, World!',
      html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
    },
    recipients: [
      {address: '<YOUR EMAIL ADDRESS>'}
    ]
  })
  .then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });
```

## SparkPost API Resources Supported in Node Client Library
Click on the desired API to see usage and more information

* [Inbound Domains](/docs/resources/inboundDomains.md) - `client.inboundDomains` ([examples](/examples/inboundDomains))
* [Message Events](/docs/resources/messageEvents.md) - `client.messageEvents` ([examples](/examples/messageEvents))
* [Recipient Lists](/docs/resources/recipientLists.md) - `client.recipientLists` ([examples](/examples/recipientLists))
* [Relay Webhooks](/docs/resources/relayWebhooks.md) - `client.relayWebhooks` ([examples](/examples/relayWebhooks))
* [Sending Domains](/docs/resources/sendingDomains.md) - `client.sendingDomains` ([examples](/examples/sendingDomains))
* [Subaccounts](/docs/resources/subaccounts.md) - `client.subaccounts` ([examples](/examples/subaccounts))
* [Suppression List](/docs/resources/suppressionList.md) - `client.suppressionList` ([examples](/examples/suppressionList))
* [Templates](/docs/resources/templates.md) - `client.templates` ([examples](/examples/templates))
* [Transmissions](/docs/resources/transmissions.md) - `client.transmissions` ([examples](/examples/transmissions))
* [Webhooks](/docs/resources/webhooks.md) - `client.webhooks` ([examples](/examples/webhooks))


## Development

### Setup
Run `npm install` inside the repository to install all the dev dependencies.

### Testing
Once all the dependencies are installed, you can execute the unit tests using `npm test`

### Contributing
[Guidelines for adding issues](docs/ADDING_ISSUES.md)

[Our coding standards](docs/CODE_STYLE_GUIDE.md)

[Submitting pull requests](CONTRIBUTING.md)

### ChangeLog

[See ChangeLog here](CHANGELOG.md)

[sparkpost sign up]: https://app.sparkpost.com/join?plan=free-0817?src=Social%20Media&sfdcid=70160000000pqBb&pc=GitHubSignUp&utm_source=github&utm_medium=social-media&utm_campaign=github&utm_content=sign-up
