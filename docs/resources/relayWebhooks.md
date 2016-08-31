# Relay Webhooks

This library provides easy access to the [Relay Webhooks](https://developers.sparkpost.com/api/relay-webhooks) Resource.

## Methods
* **all([callback]) &rarr; `{Promise}`**<br />
  List all relay webhooks.
  * `callback` - executed after task is completed if provided*
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(id[, callback]) &rarr; `{Promise}`**<br />
  Retrieve details about a specified relay webhook by its id
  * `id` - the id of the relay webhook you want to look up **required**
  * `callback` - see all function
* **create(webhook[, callback]) &rarr; `{Promise}`**<br />
  Create a new relay webhook
  * `webhook` - an object of [relay webhook attributes](https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties) **required**
  * `callback` - see all function
* **update(webhook[, callback]) &rarr; `{Promise}`**<br />
  Update an existing relay webhook
  * `webhook` - an object of [relay webhook attributes](https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties) **required**
  * `webhook.id` - the id of the relay webhook you want to update **required**
  * `callback` - see all function
* **delete(id[, callback]) &rarr; `{Promise}`**<br />
  Delete an existing relay webhook
  * `id` - the id of the relay webhook you want to delete **required**
  * `callback` - see all function

*callback is optional because all methods return a Promise.

## Examples

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR_API_KEY');

client.relayWebhooks.all()
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Using a callback
client.relayWebhooks.all(function(err, data) {
  if(err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});

```

Check out all the examples provided [here](/examples/relayWebhooks).
