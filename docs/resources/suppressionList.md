# Suppression List

This library provides easy access to the [Suppression List](https://developers.sparkpost.com/api/suppression-list) Resource.

## Methods
* **search(parameters[, callback]) &rarr; `{Promise}`**<br />
  Perform a filtered search for entries in your suppression list.
  * `parameters` - an object of [search parameters](https://developers.sparkpost.com/api/suppression-list#suppression-list-search-get)
  * `callback` - executed after task is completed if provided*
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **getEntry(email[, callback]) &rarr; `{Promise}`**<br />
  Retrieve an entry by recipient email.
    * `email` - `String` email address to check **required**
    * `callback` - see search function
* **deleteEntry(email[, callback]) &rarr; `{Promise}`**<br />
  Remove an entry by recipient email.
    * `email` - `String` email address to remove **required**
    * `callback` - see search function
* **upsert(listEntries[, callback]) &rarr; `{Promise}`**<br />
  Insert or update one or many entries.
    * `listEntries` - an object [entry list attributes](https://developers.sparkpost.com/api/suppression-list#header-list-entry-attributes) or `Array` of entry list attribute objects
    * `callback` - see search function

*callback is optional because all methods return a Promise.

## Examples

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR_API_KEY')
  , parameters = {
    from: '2015-05-07T00:00:00+0000',
    to: '2015-05-07T23:59:59+0000',
    limit: 5
  };

client.suppressionList.search(parameters)
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Using a callback
client.suppressionList.search(parameters, function(err, data) {
  if(err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});

```

Check out all the examples provided [here](/examples/suppressionList).
