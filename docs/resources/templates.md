# Templates

This library provides easy access to the [Templates](https://developers.sparkpost.com/api/templates) Resource.

## Methods
* **all([callback]) &rarr; `{Promise}`**<br />
  List a summary of all templates.
  * `callback` - executed after task is completed if provided*
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data` - full response from request client
* **find(options[, callback]) &rarr; `{Promise}`**<br />
  Retrieve details about a specified template by its id
  * `options.id` - the id of the template you want to look up **required**
  * `options.draft` - specifies a draft or published template
  * `callback` - see all function
* **create(template[, callback]) &rarr; `{Promise}`**<br />
  Create a new template
  * `template` - an object of [template attributes](https://developers.sparkpost.com/api/templates#header-template-attributes) **required**
  * `callback` - see all function
* **update(template[, callback]) &rarr; `{Promise}`**<br />
  Update an existing template
  * `template` - an object of [template attributes](https://developers.sparkpost.com/api/templates#header-template-attributes) **required**
  * `template.id` - the id of the template you want to update **required**
  * `callback` - see all function
* **delete(id[, callback]) &rarr; `{Promise}`**<br />
  Delete an existing template
  * `id` - the id of the template you want to delete **required**
  * `callback` - see all function
* **preview(options[, callback]) &rarr; `{Promise}`**<br />
  Preview the most recent version of an existing template by id
  * `options.id` - the id of the template you want to look up **required**
  * `options.substitution_data` - Object of substitution data
  * `options.draft` - specifies a draft or published template
  * `callback` - see all function

*callback is optional because all methods return a Promise.

## Examples

```javascript
var SparkPost = require('sparkpost')
  , client = new SparkPost('YOUR_API_KEY');

client.templates.all()
  .then(data => {
    console.log('Congrats you can use our client library!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });

// Using a callback
client.templates.all(function(err, data) {
  if(err) {
    console.log('Whoops! Something went wrong');
    console.log(err);
  } else {
    console.log('Congrats you can use our client library!');
    console.log(data);
  }
});

```

Check out all the examples provided [here](/examples/templates).
