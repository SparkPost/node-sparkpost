# Subaccounts

This library provides easy access to the [Subaccounts](https://www.sparkpost.com/api#/reference/subaccounts) Resource.

## Methods
* **all(callback)**
  List a summary of all subaccounts.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(options, callback)**
  Retrieve details about a specified subaccount by its id
  * `options.id` - the id of the subaccount you want to look up **required**
  * `callback` - see all function
* **create(options, callback)**
  Create a new subaccount
  * `options.subaccount` - a subaccount object **required**
  * `callback` - see all function
* **update(options, callback)**
  Updates an existing subaccount
  * `options.subaccount` - a subaccount object **required**
  * `callback` - see all function

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');

client.subaccounts.all(function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});
```
