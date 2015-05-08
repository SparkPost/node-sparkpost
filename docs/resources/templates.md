# Templates

This library provides easy access to the [Templates](https://www.sparkpost.com/api#/reference/templates/) Resource.

## Methods
* **all(callback)**
  List a summary of all templates.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data.res` - full response from request client
    * `data.body` - payload from response
* **find(options, callback)**
  Retrieve details about a specified template by its id
  * `options.id` - the id of the template you want to look up **required**
  * `options.draft` - specifies a draft or published template
  * `callback` - see all function
* **create(options, callback)**
  Create a new recipient list
  * `options.template` - a template object **required**
  * `callback` - see all function
* **delete(id, callback)**
  Delete an existing template
  * `id` - the id of the template you want to delete **required**
  * `callback` - see all function
* **preview(options, callback)**
  Preview the most recent version of an existing template by id
  * `options.id` - the id of the template you want to look up **required**
  * `options.data` - Object of substitution data
  * `options.draft` - specifies a draft or published template
  * `callback` - see all function

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');

client.templates.all(function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/templates).
