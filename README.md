<a href="https://www.sparkpost.com">
  <svg role="img" aria-labelledby="sparkpost-full-logo-title" class="SparkPost_Logo__1IttE" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 499 130"><title id="sparkpost-full-logo-title">SparkPost</title><path class="SparkPost_Base__3Ol0W" d="M.8 115.6l7.8-9.3c5.4 4.4 11 7.3 17.8 7.3 5.4 0 8.6-2.1 8.6-5.6v-.2c0-3.3-2.1-5-12-7.6-12-3.1-19.8-6.4-19.8-18.3v-.2c0-10.8 8.7-18 20.9-18 8.7 0 16.1 2.7 22.2 7.6l-6.8 9.9C34.2 77.5 29 75.3 24 75.3s-7.7 2.3-7.7 5.2v.2c0 3.9 2.6 5.2 12.9 7.9 12.1 3.2 19 7.5 19 17.9v.2c0 11.9-9 18.5-21.9 18.5-9.2 0-18.3-3.2-25.5-9.6zM56.2 64.6h24.4c14.3 0 22.9 8.5 22.9 20.7v.2c0 13.8-10.8 21-24.2 21h-10v17.9H56.2V64.6zm23.5 30.1c6.6 0 10.4-3.9 10.4-9.1v-.2c0-5.9-4.1-9-10.7-9H69.3v18.3h10.4zM122.1 64.1h12.1l25.6 60.2h-13.7l-5.5-13.4h-25.3l-5.5 13.4H96.5l25.6-60.2zm13.8 35.2L128 79.9l-8 19.4h15.9zM166 64.6h27.3c7.6 0 13.5 2.1 17.4 6.1 3.3 3.3 5.1 8 5.1 13.7v.2c0 9.6-5.2 15.7-12.8 18.5l14.6 21.3h-15.4l-12.8-19.1h-10.3v19.1H166V64.6zm26.5 29c6.4 0 10.1-3.4 10.1-8.5V85c0-5.6-3.9-8.5-10.3-8.5h-13.1v17.2h13.3zM285.8 64.6h21.7c13.1 0 22.2 6.7 22.2 18.3v.1c0 12.6-10.8 19-23.3 19h-16.1v22.3h-4.4V64.6zM306.6 98c11.1 0 18.6-5.8 18.6-14.7v-.2c0-9.5-7.3-14.4-18.1-14.4h-16.9V98h16.4zM400.8 115.6l2.9-3.3c6.6 6.1 12.6 8.9 21.4 8.9 9 0 15.1-5 15.1-11.9v-.2c0-6.3-3.3-10-16.9-12.7-14.3-2.9-20.1-7.8-20.1-16.8v-.2c0-8.9 8.1-15.7 19.2-15.7 8.7 0 14.4 2.4 20.5 7.3l-2.8 3.5c-5.6-4.9-11.3-6.7-17.8-6.7-8.8 0-14.6 5-14.6 11.3v.2c0 6.3 3.2 10.2 17.4 13.1 13.8 2.8 19.6 7.8 19.6 16.5v.2c0 9.6-8.3 16.3-19.8 16.3-9.6-.2-16.9-3.4-24.1-9.8zM470.3 68.7h-20.8v-4.1h46.1v4.1h-20.8v55.7h-4.4V68.7zM238 89.7l20.7-25.1h16L250.5 93l26 31.4h-16.9L238 97.7v26.7h-13.1V64.6H238v25.1z"></path><path class="SparkPost_Flame__Ja-1Q" d="M387.1 51c-6.7 5-7.9 13.9-8.1 19.9-10.5-12.2 19.5-48-14.6-70.1 21.1 27.3-30 54.2-30 94.4 0 15.8 9.9 29.7 31.5 34.5 21.2-4.5 31.7-18.7 31.7-34.5 0-23.6-14.7-31.4-10.5-44.2zm-21.2 65.8c-11.6 0-20.9-9.4-20.9-20.9 0-11.6 9.4-20.9 20.9-20.9 11.6 0 20.9 9.4 20.9 20.9 0 11.5-9.3 20.9-20.9 20.9z"></path></svg>
</a>

[Sign up][sparkpost sign up] for a SparkPost account and visit our [Developer Hub](https://developers.sparkpost.com) for even more content.

# Node.js Client Library

[![Travis CI](https://travis-ci.org/SparkPost/node-sparkpost.svg?branch=master)](https://travis-ci.org/SparkPost/node-sparkpost) [![Coverage Status](https://coveralls.io/repos/SparkPost/node-sparkpost/badge.svg?branch=master&service=github)](https://coveralls.io/github/SparkPost/node-sparkpost?branch=master) [![NPM version](https://badge.fury.io/js/sparkpost.png)](http://badge.fury.io/js/sparkpost)

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
* [Events](/docs/resources/events.md) - `client.events` ([examples](/examples/events))
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
