# Inbound Domains

This library provides easy access to the [Inbound Domains](https://developers.sparkpost.com/api#/reference/inbound-domains/) Resource.

## Methods
* **all(callback)**
  List an overview of all inbound domains in the account.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(domain, callback)**
  Retrieve a inbound domain by its domain name
  * `domain` - the name of the domain you want to look up **required**
  * `callback` - see all function
* **create(domain, callback)**
  Create a new inbound domain
  * `domain` - the name of the domain you want to create **required**
  * `callback` - see all function
* **delete(domain, callback)**
  Delete an existing inbound domain
  * `domain` - the name of the domain you want to delete **required**
  * `callback` - see all function

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');

client.inboundDomains.all(function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/inboundDomains).
