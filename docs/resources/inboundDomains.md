# Inbound Domains

This library provides easy access to the [Inbound Domains](https://developers.sparkpost.com/api/inbound-domains) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list()**<br />
  List an overview of all inbound domains in the account.
* **get(domain)**<br />
  Get an inbound domain by its domain name
  * `domain` - the name of the domain you want to look up **required**
* **create(createOpts)**<br />
  Create a new inbound domain
  * `createOpts` - a hash of [inbound domain attributes](https://developers.sparkpost.com/api/inbound-domains#header-inbound-domains-attributes) **required**
* **delete(domain)**<br />
  Delete an existing inbound domain
  * `domain` - the name of the domain you want to delete **required**

## Examples

Visit our examples section to see all of [our inbound domains resource examples](/examples/inboundDomains).
