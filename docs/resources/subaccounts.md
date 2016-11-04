# Subaccounts

This library provides easy access to the [Subaccounts](https://developers.sparkpost.com/api/subaccounts) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list([callback])**<br />
  List a summary of all subaccounts.
* **get(id[, callback])**<br />
  Get details about a specified subaccount by its id
  * `id` - the id of the subaccount you want to look up **required**
* **create(subaccount[, callback])**<br />
  Create a new subaccount
  * `subaccount` - an object of [subaccount attributes](https://developers.sparkpost.com/api/subaccounts#header-request-body-attributes) **required**
* **update(id, subaccount[, callback])**<br />
  Updates an existing subaccount
    * `id` - the id of the subaccount you want to update **required**
  * `subaccount` - an object of [updatable subaccount attributes](https://developers.sparkpost.com/api/subaccounts#header-request-body-attributes-1) **required**

## Examples


Visit our examples section to see all of [our subaccount resource examples](/examples/subaccounts).
