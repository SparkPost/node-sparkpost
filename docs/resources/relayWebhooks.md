# Relay Webhooks

This library provides easy access to the [Relay Webhooks](https://www.sparkpost.com/api#/reference/relay-webhooks/) Resource.

## Methods
* **all(options, callback)**
  List all relay webhooks.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(webhookId, callback)**
  Retrieve details about a specified relay webhook by its id
  * `webhookId` - the id of the relay webhook you want to look up **required**
  * `callback` - see all function
* **create(options, callback)**
  Create a new recipient list
  * `options.target` - url of the target to which to POST relay batches **required**
  * `options.domain` - inbound domain associated with this webhook **required**
  * `options.name` - user-friendly name
  * `options.authToken` - authentication token to present in the X-MessageSystems-Webhook-Token header of POST requests to target
  * `options.protocol` - inbound messaging protocol associated with this webhook
  * `callback` - see all function
* **update(options, callback)**
  Update an existing relay webhook
  * `options.webhookId` - the id of the relay webhook you want to update **required**
  * `options.target` - url of the target to which to POST relay batches
  * `options.domain` - inbound domain associated with this webhook
  * `options.name` - user-friendly name
  * `options.authToken` - authentication token to present in the X-MessageSystems-Webhook-Token header of POST requests to target
  * `options.protocol` - inbound messaging protocol associated with this webhook
  * `callback` - see all function
* **delete(webhookId, callback)**
  Delete an existing relay webhook
  * `webhookId` - the id of the webhook you want to delete **required**
  * `callback` - see all function

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');

client.relayWebhooks.all(function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/relayWebhooks).
