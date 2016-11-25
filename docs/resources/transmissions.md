# Transmissions

This library provides easy access to the [Transmissions](https://developers.sparkpost.com/api/transmissions) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list(options[, callback])**<br />
  List an overview of all transmissions in the account
  * `options.campaign_id` - id of the campaign used by the transmission
  * `options.template_id` - id of the template used by the transmission
* **get(id[, callback])**<br />
  Retrieve the details about a transmission by its ID
  * `id` - id of the transmission you want to look up **required**
* **send(transmission[, options, callback])**<br />
  Sends a message by creating a new transmission
  * `transmission` - an object of [transmission attributes](https://developers.sparkpost.com/api/transmissions#header-transmission-attributes)
  * `transmission.cc` - Recipients to receive a carbon copy of the transmission
  * `transmission.bcc` - Recipients to discreetly receive a carbon copy of the transmission
  * `options.num_rcpt_errors` - maximum number of recipient errors returned

## Examples

Visit our examples section to see all of [our transmissions resource examples](/examples/transmissions).

## Tips and Tricks
* If you specify a stored recipient list and inline recipients in a Transmission, you will receive an error.
* If you specify HTML and/or Plain Text content and then provide RFC-822 encoded content, you will receive an error.
    * RFC-822 content is not valid with any other content type.
* If you specify a stored template and also provide inline content, you will receive an error.
* By default, open and click tracking are enabled for a transmission.
* By default, a transmission will use the published version of a stored template.
