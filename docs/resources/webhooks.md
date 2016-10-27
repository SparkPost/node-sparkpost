# Webhooks

This library provides easy access to the [Webhooks](https://developers.sparkpost.com/api/webhooks) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list([options])**<br />
  Lists all webhooks.
  * `options.timezone` - the timezone to use for the `last_successful` and `last_failure` properties | Default: `UTC`

* **get(id[, options])**<br />
  Get a single webhook by ID.
  * `id` - the id of the webhook to get **required**
  * `options.timezone` - the timezone to use for the `last_successful` and `last_failure` properties | Default: `UTC`

* **create(webhook)**<br />
  Create a new webhook.
  * `webhook` - a hash of [webhook attributes](https://developers.sparkpost.com/api/webhooks#header-webhooks-object-properties) **required**

client.webhooks.all()
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

* **update(id, webhook)**<br />
  Update an existing webhook.
  * `id` - the id of the webhook to update **required**
  * `webhook` - a hash of [webhook attributes](https://developers.sparkpost.com/api/webhooks#header-webhooks-object-properties) **required**
* **delete(id)**<br />
  Delete an existing webhook.
  * `id` - the id of the webhook to delete **required**

* **validate(id, options)**<br />
  Sends an example message event batch from the Webhook API to the target URL.
  * `id` - the id of the webhook to validate **required**
  * `options.message` - the message (payload) to send to the webhook consumer **required**

* **getBatchStatus(id[, options])**<br />
  Gets recent status information about a webhook.
  * `id` - the id of the webhook **required**
  * `options.limit` - maximum number of results to return | Default: `1000`

* **getDocumentation()**<br />
  Lists descriptions of the events, event types, and event fields that could be included in a webhooks post to your target URL.

* **getSamples(options)**<br />
  Lists examples of the event data that will be posted to a webhook consumer.
  * `options.events` - [event types](https://support.sparkpost.com/customer/portal/articles/1976204) for which to get a sample payload | Default: all event types returned


Visit our examples section to see all of [our webhooks resource examples](/examples/webhooks).
