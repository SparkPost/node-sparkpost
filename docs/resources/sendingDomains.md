# Sending Domains

This library provides easy access to the [Sending Domains](https://www.sparkpost.com/api#/reference/sending-domains/) Resource.

## Methods
* **all(callback)**
  List an overview of all sending domains in the account.
  * `callback` - executed after task is completed. **required**
    * standard `callback(err, data)`
    * `err` - any error that occurred
    * `data.res` - full response from request client
    * `data.body` - payload from response
* **find(domainName, callback)**
  Retrieve a sending domain by its domain name
  * `domainName` - the name of the domain you want to look up **required**
  * `callback` - see all function
* **create(domainBody, callback)**
  Create a new sending domain
  * `domainBody` - see object description below **required**
  * `callback` - see all function
* **update(domainBody, callback)**
  Update an existing sending domain
  * `domainBody` - see object description below **required**
  * `callback` - see all function
* **verify(options, callback)**
  Validate the specified verification field types for a sending domain
  * `options.domainName` - the name of the domain you want to verify **required**
  * `options.verifyDKIM` - initiates a check against the DKIM record default: `true`
  * `options.verifySPF` - initiates a check against the SPF record default: `true`


### domainBody
| Field Name | Required? | Description                                                     | Data Type |
| ---------- | --------- | --------------------------------------------------------------- | --------- |
| domainName | yes       | Name of the sending domain                                      | String    |
| privateKey | yes**     | Private key used to create the DKIM Signature.                  | String    |
| publicKey  | yes**     | Public key to be retrieved from the DNS of the sending domain.  | String    |
| selector   | yes**     | DomainKey selector that indicates the DKIM public key location. | String    |
| headers    | no        | Header fields to be included in the DKIM signature              | String    |

** - If specifying a privateKey, publicKey, or selector, all three fields are required.

## Examples

```js
var SparkPost = require('sparkpost');
var client = new SparkPost('YOUR_API_KEY');

client.sendingDomains.all(function(err, data) {
  if(err) {
    console.log(err);
    return;
  }

  console.log(data.body);
});

```

Check out all the examples provided [here](/examples/sendingDomains).
