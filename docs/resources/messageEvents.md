# Message Events

This library provides easy access to the [Message Events](https://www.sparkpost.com/api#/reference/message-events/) resource.

## Methods
* **search(params, callback)**
  Search for message events using the given parameters (NOTE: all params are optional):
  * `params.bounce_classes` - list of [bounce classes](https://support.sparkpost.com/customer/portal/articles/1929896)
  * `params.campaign_ids` - campaign IDs 
  * `params.events` - event types 
  * `params.friendly_froms` - 'friendly' from addressess
  * `params.from` - time lower bound  (see below for date/time format details)
  * `params.message_ids` - message IDs
  * `params.page` - results page number
  * `params.per_page` - number of results per page
  * `params.reason` - bounce reason with '%' wildcards (see below for example)
  * `params.recipients` - recipient email addresses
  * `params.template_ids` - template IDs
  * `params.timezone` - timezone for `from` and `to` params ([reference](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones))
  * `params.to` - time upper bound (see below for date/time format details)
  * `params.transmission_ids` - transmission IDs

## Date/Time Parameter Format

The `from` and `to` search parameters accept datestamps of the form:

  `YYYY-MM-DDTHH:MM`

For example: `2016-11-14T16:15`.

Note: timestamps are expressed in the timezone specified by the `timezone` parameter or UTC by default.

## Examples

This example code retrieves up to 5 'invalid recipient' bounce events from the first 2 days of 2016.

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');
var searchParams = {
  from: '2016-01-01T00:00',
  to: '2016-01-02T23:59',
  page: 1,
  per_page: 5,
  events: ['bounce', 'out_of_band'],
  bounce_classes: [10]
};

client.messageEvents.search(searchParams, function(err, res) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/messageEvents).
