# Events

This library provides easy access to the [Events](https://developers.sparkpost.com/api/events) resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **searchMessage([params, callback])**<br />
  Search for events of type message using the given parameters (NOTE: all params are optional):
  * `params` - a hash of [Events URI Parameters](https://developers.sparkpost.com/api/events.html#events-get-search-for-message-events)

## Date/Time Parameter Format

The `from` and `to` search parameters accept date stamps of the form:

  `YYYY-MM-DDTHH:MM`

For example: `2016-11-14T16:15`.

Note: timestamps are expressed in the timezone specified by the `timezone` parameter or UTC by default.

## Examples

Visit our examples section to see all of [our events resource examples](/examples/events).
