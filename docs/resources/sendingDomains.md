# Sending Domains

This library provides easy access to the [Sending Domains](https://www.sparkpost.com/api#/reference/sending-domains/) Resource.

## Methods
* **all(callback)**
  List an overview of all sending domains in the account.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(domain, callback)**
  Retrieve a sending domain by its domain name
  * `domain` - the name of the domain you want to look up **required**
  * `callback` - see all function
* **create(domainBody, callback)**
  Create a new sending domain
  * `domainBody` - a sending domain object **required**
  * `callback` - see all function
* **update(domainBody, callback)**
  Update an existing sending domain
  * `domainBody` - a sending domain object **required**
  * `callback` - see all function
* **delete(domain, callback)**
  Delete an existing sending domain
  * `domain` - the name of the domain you want to delete **required**
  * `callback` - see all function
* **verify(options, callback)**
  Validate the specified verification field types for a sending domain
  * `options.domain` - the name of the domain you want to verify **required**
  * `options.verifyDKIM` - initiates a check against the DKIM record default: `true`
  * `options.verifySPF` - initiates a check against the SPF record default: `true`

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');

client.sendingDomains.all(function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/sendingDomains).
