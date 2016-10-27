# Templates

This library provides easy access to the [Templates](https://developers.sparkpost.com/api/templates) Resource.

*Note: All methods return promises and accept an optional last argument callback. [Read about how we handle callbacks and promises](/docs/async.md).*

## Methods
* **list()**<br />
  List a summary of all templates.
* **get(id[, options])**<br />
  Get details about a specified template by its id
  * `options.id` - the id of the template you want to look up **required**
  * `options.draft` - specifies a draft or published template
* **create(template)**<br />
  Create a new template
  * `template` - an object of [template attributes](https://developers.sparkpost.com/api/templates#header-template-attributes) **required**
* **update(id, template[, options])**<br />
  Update an existing template
  * `id` - the id of the template you want to update **required**
  * `template` - an object of [template attributes](https://developers.sparkpost.com/api/templates#header-template-attributes) **required**
  * `options.update_published` - If true, directly overwrite the existing published template. If false, create a new draft.
* **delete(id)**<br />
  Delete an existing template
  * `id` - the id of the template you want to delete **required**
* **preview(id[, options])**<br />
  Preview the most recent version of an existing template by id
  * `id` - the id of the template you want to look up **required**
  * `options.substitution_data` - Object of substitution data
  * `options.draft` - specifies a draft or published template

## Examples


Visit our examples section to see all of [our template resource examples](/examples/templates).
