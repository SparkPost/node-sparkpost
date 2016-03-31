# Subaccounts

This library provides easy access to the [Subaccounts](https://www.sparkpost.com/api#/reference/subaccounts) Resource.

## Methods
* **all(callback)**
  List a summary of all subaccounts.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(subaccountId, callback)**
  Retrieve details about a specified subaccount by its id
  * `subaccountId` - the id of the subaccount you want to look up **required**
  * `callback` - see all function
* **create(options, callback)**
  Create a new subaccount
  * `options.name` - user-friendly name **required**
  * `options.keyLabel` - user-friendly identifier for subaccount API key **required**
  * `options.keyGrants` - list of grants to give the subaccount API key **required**
  * `options.keyValidIps` - list of IPs the subaccount may be used from
  * `options.ipPool` - id of the default IP pool assigned to subaccount's transmissions
  * `callback` - see all function
* **update(options, callback)**
  Updates an existing subaccount
  * `options.subaccountId` - the id of the subaccount you want to update **required**
  * `options.name` - user-friendly name
  * `options.status` - status of the subaccount
  * `options.ipPool` - id of the default IP pool assigned to subaccount's transmissions
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
