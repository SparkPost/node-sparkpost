# Recipient Lists

This library provides easy access to the [Recipient Lists](https://developers.sparkpost.com/api/recipient-lists) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list()**<br />
  List a summary of all recipient lists.

* **get(id[, options])**<br />
  Retrieve details about a specified recipient list by its id
  * `options.show_recipients` - specifies whether to retrieve the recipients | Default: `false`

* **create(recipientList)**<br />
  Create a new recipient list
  * `recipientList` - an object of [recipient list](https://developers.sparkpost.com/api/recipient-lists#header-recipient-list-attributes) **required**
  * `recipientList.num_rcpt_errors` - limit the number of recipient errors returned | Default: all errors returned

* **update(id, recipientList)**<br />
  Update an existing recipient list
  * `recipientList` - an object of [recipient list](https://developers.sparkpost.com/api/recipient-lists#header-recipient-list-attributes) **required**
  * `recipientList.num_rcpt_errors` - limit the number of recipient errors returned | Default: all errors returned

* **delete(id)**<br />
  Delete an existing recipient list
  * `id` - the id of the recipient list you want to delete **required**

## Examples

Visit our examples section to see all of [our recipient list resource examples](/examples/recipientLists).
