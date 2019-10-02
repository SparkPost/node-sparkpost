# Tracking Domains

This library provides easy access to the [Tracking Domains](https://developers.sparkpost.com/api/tracking-domains) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list(options)**<br />
  List an overview of all tracking domains in the account.
  * `options` - a hash of [tracking domain parameters](https://developers.sparkpost.com/api/tracking-domains/#tracking-domains-get-list-all-tracking-domains)

* **get(domain)**<br />
  Retrieve a tracking domain by its domain name
  * `domain` - the domain you want to look up **required**

* **create(createOpts)**<br />
  Create a new tracking domain
  * `createOpts` - a hash of [tracking domain attributes](https://developers.sparkpost.com/api/tracking-domains/#header-tracking-domain-object) **required**

* **update(domain, updateOpts)**<br />
  Update an existing tracking domain
  * `domain` - the domain you want to update **required**
  * `updateOpts` - a hash of [tracking domain attributes](https://developers.sparkpost.com/api/tracking-domains/#header-tracking-domain-object) **required**

* **delete(domain)**<br />
  Delete an existing tracking domain
  * `domain` - the domain you want to delete **required**

* **verify(domain, options)**<br />
  Validate the tracking domain
  * `domain` - the domain you want to verify **required**

## Examples

Visit our examples section to see all of [our tracking domains resource examples](/examples/trackingDomains).
