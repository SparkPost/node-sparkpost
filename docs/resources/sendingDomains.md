# Sending Domains

This library provides easy access to the [Sending Domains](https://developers.sparkpost.com/api/sending-domains) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list()**<br />
  List an overview of all sending domains in the account.

* **get(domain)**<br />
  Retrieve a sending domain by its domain name
  * `domain` - the domain you want to look up **required**

* **create(createOpts)**<br />
  Create a new sending domain
  * `createOpts` - a hash of [sending domain attributes](https://developers.sparkpost.com/api/sending-domains#header-sending-domain-attributes) **required**

* **update(domain, updateOpts)**<br />
  Update an existing sending domain
  * `domain` - the domain you want to update **required**
  * `updateOpts` - a hash of [sending domain attributes](https://developers.sparkpost.com/api/sending-domains#header-sending-domain-attributes) **required**

* **delete(domain)**<br />
  Delete an existing sending domain
  * `domain` - the domain you want to delete **required**

* **verify(domain, options)**<br />
  Validate the specified verification field types for a sending domain
  * `domain` - the domain you want to verify **required**
  * `options` - a hash of [verify attributes](https://developers.sparkpost.com/api/sending-domains#header-verify-attributes) **required**

## Examples

Visit our examples section to see all of [our sending domains resource examples](/examples/sendingDomains).
