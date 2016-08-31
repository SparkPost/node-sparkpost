# Subaccounts

This library provides easy access to the [Subaccounts](https://developers.sparkpost.com/api/subaccounts) Resource.

## Methods
* **all([callback]) &rarr; `{Promise}`**<br />
  List a summary of all subaccounts.
  * `callback` - executed after task is completed if provided*
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(id[, callback]) &rarr; `{Promise}`**<br />
  Retrieve details about a specified subaccount by its id
  * `id` - the id of the subaccount you want to look up **required**
  * `callback` - see all function
* **create(subaccount[, callback]) &rarr; `{Promise}`**<br />
  Create a new subaccount
  * `subaccount` - an object of [subaccount attributes](https://developers.sparkpost.com/api/subaccounts#header-request-body-attributes) **required**
  * `callback` - see all function
* **update(subaccount[, callback]) &rarr; `{Promise}`**<br />
  Updates an existing subaccount
  * `subaccount` - an object of [updatable subaccount attributes](https://developers.sparkpost.com/api/subaccounts#header-request-body-attributes-1) **required**
  * `subaccount.id` - the id of the subaccount you want to update **required**

*callback is optional because all methods return a Promise.

## Examples

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR_API_KEY');

client.subaccounts.all()
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Using a callback
client.subaccounts.all(function(err, data) {
  if (err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});
```
