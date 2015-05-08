# Recipient Lists

This library provides easy access to the [Recipient Lists](https://www.sparkpost.com/api#/reference/recipient-lists/) Resource.

## Methods
* **all(callback)**
  List a summary of all recipient lists.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data.res` - full response from request client
    * `data.body` - payload from response
* **find(options, callback)**
  Retrieve details about a specified recipient list by its id
  * `options.id` - the id of the recipient list you want to look up **required**
  * `options.show_recipients` - specifies whether to retrieve the recipients Default: `false`
  * `callback` - see all function
* **create(options, callback)**
  Create a new recipient list
  * `options.recipients` - an array of recipients to add to the list **required**
  * `options.num_rcpt_errors` - limit the number of recipient errors returned
  * `callback` - see all function
* **delete(id, callback)**
  Delete an existing recipient list
  * `id` - the id of the recipient list you want to delete **required**
  * `callback` - see all function

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');

client.recipientLists.all(function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/recipientLists).
