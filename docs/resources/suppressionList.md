# Suppression List

This library provides easy access to the [Suppression List](https://www.sparkpost.com/api#/reference/suppression-list/) Resource.

## Methods
* **search(parameters, callback)**
  Perform a filtered search for entries in your suppression list.
  * `parameters` - Object of [search parameters](https://www.sparkpost.com/api#/reference/suppression-list/search/search-for-suppression-list-entries)
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data.res` - full response from request client
    * `data.body` - payload from response
* **checkStatus(email, callback)**
    * `email` - `String` email address to check **required**
    * `callback` - see search function
* **removeStatus(email, callback)**
    * `email` - `String` email address to remove **required**
    * `callback` - see search function
* **upsert(recipient, callback)**
    * `recipient` - [Recipient Object](https://www.sparkpost.com/api#/reference/recipient-lists) or `Array` of Recipient Objects
    * `callback` - see search function

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');
var parameters = {
  from: '2015-05-07T00:00:00+0000'
  , to: '2015-05-07T23:59:59+0000'
  , limit: 5
};

client.suppressionList.search(parameters, function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/suppressionList).
