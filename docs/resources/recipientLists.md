# Recipient Lists

This library provides easy access to the [Recipient Lists](https://developers.sparkpost.com/api/recipient-lists) Resource.

## Methods
* **all([callback]) &rarr; `{Promise}`**<br />
  List a summary of all recipient lists.
  * `callback` -  executed after task is completed if provided*
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(options[, callback]) &rarr; `{Promise}`**<br />
  Retrieve details about a specified recipient list by its id
  * `options.id` - the id of the recipient list you want to look up **required**
  * `options.show_recipients` - specifies whether to retrieve the recipients Default: `false`
  * `callback` - see all function
* **create(recipientList[, callback]) &rarr; `{Promise}`**<br />
  Create a new recipient list
  * `recipientList` - an object of [recipient list](https://developers.sparkpost.com/api/recipient-lists#header-recipient-list-attributes) **required**
  * `recipientList.num_rcpt_errors` - limit the number of recipient errors returned
  * `callback` - see all function
* **update(recipientList[, callback]) &rarr; `{Promise}`**<br />
  Update an existing recipient list
  * `recipientList` - an object of [recipient list](https://developers.sparkpost.com/api/recipient-lists#header-recipient-list-attributes) **required**
  * `recipientList.id` - the id of the recipient list you want to update **required**
  * `recipientList.num_rcpt_errors` - limit the number of recipient errors returned
  * `callback` - see all function
* **delete(id[, callback]) &rarr; `{Promise}`**<br />
  Delete an existing recipient list
  * `id` - the id of the recipient list you want to delete **required**
  * `callback` - see all function
  
*callback is optional because all methods return a Promise.

## Examples

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR_API_KEY');

client.recipientLists.all()
  .then(data => {
    console.log('Woohoo! It worked!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });
  
// Using a callback
client.recipientLists.all(function(err, data) {
  if(err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Woohoo! It worked!');
    console.log(data);
  }
});

```

Check out all the examples provided [here](/examples/recipientLists).
