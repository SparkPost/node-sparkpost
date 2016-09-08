# Webhooks

This library provides easy access to the [Webhooks](https://developers.sparkpost.com/api/webhooks) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list([options, callback]) &rarr; `{Promise}`**<br />
  Lists all webhooks.

* **get(id[, options][, callback]) &rarr; `{Promise}`**<br />
  Get a single webhook by ID.

* **create(webhook[, callback]) &rarr; `{Promise}`**<br />
  Create a new webhook.

* **update(id, webhook[, callback]) &rarr; `{Promise}`**<br />
  Update an existing webhook.

* **delete(id[, callback]) &rarr; `{Promise}`**<br />
  Delete an existing webhook.

* **validate(id[, options][, callback]) &rarr; `{Promise}`**<br />
  Sends an example message event batch from the Webhook API to the target URL.

* **getBatchStatus(id[, options][, callback]) &rarr; `{Promise}`**<br />
  Gets recent status information about a webhook.

* **getDocumentation([callback]) &rarr; `{Promise}`**<br />
  Lists descriptions of the events, event types, and event fields that could be included in a webhooks post to your target URL.

* **getSamples(options[, callback]) &rarr; `{Promise}`**<br />
  Lists examples of the event data that will be posted to a webhook consumer.


Visit our examples section to see all of [our webhooks resource examples](/examples/webhooks).
