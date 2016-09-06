# Suppression List

This library provides easy access to the [Suppression List](https://developers.sparkpost.com/api/suppression-list) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list([parameters])**<br />
  List all entries in your suppression list, filtered by an optional set of search parameters.
    * `parameters` - an object of [search parameters](https://developers.sparkpost.com/api/suppression-list#suppression-list-search-get)
* **get(email)**<br />
  Retrieve an entry by recipient email.
    * `email` - `String` email address to check **required**
* **upsert(listEntries)**<br />
  Insert or update one or many entries.
    * `listEntries` - an object [entry list attributes](https://developers.sparkpost.com/api/suppression-list#header-list-entry-attributes) or `Array` of entry list attribute objects
* **delete(email)**<br />
  Remove an entry by recipient email.
    * `email` - `String` email address to remove **required**

## Examples

Visit our examples section to see all of [our suppression list resource examples](/examples/suppressionList).
