# Webhooks

This library provides easy access to the [Webhooks](https://www.sparkpost.com/api#/reference/webhooks/) Resource.

## Methods
* **all(options, callback)**
  List currently extant webhooks.
  * `options.timezone` - `String` Standard timezone identification Default: `UTC`
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **describe(options, callback)**
  Retrieve details about a specified webhook by its id
  * `options.id` - the id of the webhook you want to describe **required**
  * `options.timezone` - `String` Standard timezone identification Default: `UTC`
  * `callback` - see all function
* **create(webhook, callback)**
  Create a new webhook
  * `webhook` - a webhook object **required**
  * `callback` - see all function
* **update(webhook, callback)**
  Update an existing webhook
  * `webhook` - a webhook object **required**
  * `callback` - see all function
* **delete(id, callback)**
  Delete an existing webhook
  * `id` - the id of the webhook you want to delete **required**
  * `callback` - see all function
* **validate(options, callback)**
  Sends an example message event batch from the Webhook API to the target URL
  * `options.id` - the id of the webhook you want to validate **required**
  * `options.message` - sample object to send to the target URL **required**
  * `callback` - see all function
* **getBatchStatus(options, callback)**
  Sends an example message event batch from the Webhook API to the target URL
  * `options.id` - the id of the webhook you want to get status on **required**
  * `options.limit` - `number` maximum number of results to return Default: `1000`
  * `callback` - see all function
* **getDocumentation(callback)**
  Lists descriptions of the events, event types, and event fields that could be included in a Webhooks post to your target URL.
  * `callback` - see all function
* **getSamples(options, callback)**
  List an example of the event data that will be posted by a Webhook for the specified events.
  * `options.events` - `String` event types for which to get a sample payload Defaults to all event types
  * `callback` - see all function

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');

client.webhooks.all(function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/webhooks).
