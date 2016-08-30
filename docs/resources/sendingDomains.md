# Sending Domains

This library provides easy access to the [Sending Domains](https://developers.sparkpost.com/api/sending-domains) Resource.

## Methods
* **all([callback]) &rarr; `{Promise}`**<br />
  List an overview of all sending domains in the account.
  * `callback` - executed after task is completed if provided*
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(domain[, callback]) &rarr; `{Promise}`**<br />
  Retrieve a sending domain by its domain name
  * `domain` - the name of the domain you want to look up **required**
  * `callback` - see all function
* **create(sendingDomain[, callback]) &rarr; `{Promise}`**<br />
  Create a new sending domain
  * `sendingDomain` - an object of [sending domain attributes](https://developers.sparkpost.com/api/sending-domains#header-sending-domain-attributes) **required**
  * `callback` - see all function
* **update(sendingDomain[, callback]) &rarr; `{Promise}`**<br />
  Update an existing sending domain
  * `sendingDomain` - an object of [sending domain attributes](https://developers.sparkpost.com/api/sending-domains#header-sending-domain-attributes) **required**
  * `callback` - see all function
* **delete(domain[, callback]) &rarr; `{Promise}`**<br />
  Delete an existing sending domain
  * `domain` - the name of the domain you want to delete **required**
  * `callback` - see all function
* **verify(options[, callback]) &rarr; `{Promise}`**<br />
  Validate the specified verification field types for a sending domain
  * `options.domain` - the name of the domain you want to verify **required**
  * `options.verifyDKIM` - initiates a check against the DKIM record default: `true`
  * `options.verifySPF` - initiates a check against the SPF record default: `true`

*callback is optional because all methods return a Promise.

## Examples

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR_API_KEY');

client.sendingDomains.all()
  .then(data => {
    console.log('Woohoo! It worked!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Using a callback
client.sendingDomains.all(function(err, data) {
  if(err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Woohoo! It worked!');
    console.log(data);
  }
});

```

Check out all the examples provided [here](/examples/sendingDomains).
