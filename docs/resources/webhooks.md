# Webhooks

This library provides easy access to the [Webhooks](https://developers.sparkpost.com/api/webhooks) Resource.

## Methods
* **all([options, callback]) &rarr; `{Promise}`**<br />
  List currently extant webhooks.
  * `options.timezone` - `String` Standard timezone identification Default: `UTC`
  * `callback` - executed after task is completed if provided*
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **describe(options[, callback]) &rarr; `{Promise}`**<br />
  Retrieve details about a specified webhook by its id
  * `options.id` - the id of the webhook you want to describe **required**
  * `options.timezone` - `String` Standard timezone identification Default: `UTC`
  * `callback` - see all function
* **create(webhook[, callback]) &rarr; `{Promise}`**<br />
  Create a new webhook
  * `webhook` - an object of [webhook attributes](https://developers.sparkpost.com/api/webhooks#header-webhooks-object-properties) **required**
  * `callback` - see all function
* **update(webhook[, callback]) &rarr; `{Promise}`**<br />
  Update an existing webhook
  * `webhook` - an object of [webhook attributes](https://developers.sparkpost.com/api/webhooks#header-webhooks-object-properties) **required**
  * `callback` - see all function
* **delete(id[, callback]) &rarr; `{Promise}`**<br />
  Delete an existing webhook
  * `id` - the id of the webhook you want to delete **required**
  * `callback` - see all function
* **validate(options[, callback]) &rarr; `{Promise}`**<br />
  Sends an example message event batch from the Webhook API to the target URL
  * `options.id` - the id of the webhook you want to validate **required**
  * `options.message` - sample object to send to the target URL **required**
  * `callback` - see all function
* **getBatchStatus(options[, callback]) &rarr; `{Promise}`**<br />
  Sends an example message event batch from the Webhook API to the target URL
  * `options.id` - the id of the webhook you want to get status on **required**
  * `options.limit` - `number` maximum number of results to return Default: `1000`
  * `callback` - see all function
* **getDocumentation([callback]) &rarr; `{Promise}`**<br />
  Lists descriptions of the events, event types, and event fields that could be included in a Webhooks post to your target URL.
  * `callback` - see all function
* **getSamples(options[, callback]) &rarr; `{Promise}`**<br />
  List an example of the event data that will be posted by a Webhook for the specified events.
  * `options.events` - `String` event types for which to get a sample payload Defaults to all event types
  * `callback` - see all function

*callback is optional because all methods return a Promise.

## Examples

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR_API_KEY');

client.webhooks.all()
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Using a callback
client.webhooks.all(function(err, data) {
  if(err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});

```

Check out all the examples provided [here](/examples/webhooks).
