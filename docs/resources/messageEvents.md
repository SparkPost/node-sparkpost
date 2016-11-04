# Message Events

This library provides easy access to the [Message Events](https://developers.sparkpost.com/api/message-events) resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **search([params, callback])**<br />
  Search for message events using the given parameters (NOTE: all params are optional):
  * `params` - a hash of [Message Events URI Parameters](https://developers.sparkpost.com/api/message-events.html#message-events-message-events-get)

## Date/Time Parameter Format

The `from` and `to` search parameters accept date stamps of the form:

  `YYYY-MM-DDTHH:MM`

For example: `2016-11-14T16:15`.

Note: timestamps are expressed in the timezone specified by the `timezone` parameter or UTC by default.

## Examples

Visit our examples section to see all of [our message events resource examples](/examples/messageEvents).
