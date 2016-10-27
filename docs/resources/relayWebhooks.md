# Relay Webhooks

This library provides easy access to the [Relay Webhooks](https://developers.sparkpost.com/api/relay-webhooks) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list()**<br />
  List all relay webhooks.
* **get(id)**<br />
  Get details about a specified relay webhook by its id
  * `id` - the id of the relay webhook you want to look up **required**
* **create(webhook)**<br />
  Create a new relay webhook
  * `webhook` - an object of [relay webhook attributes](https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties) **required**
* **update(id, webhook)**<br />
  Update an existing relay webhook
  * `id` - the id of the relay webhook you want to update **required**
  * `webhook` - an object of [relay webhook attributes](https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties) **required**
* **delete(id)**<br />
  Delete an existing relay webhook
  * `id` - the id of the relay webhook you want to delete **required**

## Examples

Visit our examples section to see all of [our relay webhook resource examples](/examples/relayWebhooks).
