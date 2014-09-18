'use strict';

var request = require('request');
var config = require('./configuration');

var Transmission = function(options) {
  options = options || {};

  this.options = config.options;
  this.baseUrl = '/api/' + this.options.version + '/transmissions';
  this.model = {
    content: {}
  };

  /*
   * Provides alternate style for setting data on transmission
   * If preferred style is setProperty, you can do that as well
   */
  this.model.campaign_id = options.campaign;
  this.model.metadata = options.metadata;
  this.model.substitution_data = options.substitutionData;
  this.model.description = options.description;
  this.model.return_path = options.returnPath;
  this.model.content.reply_to = options.replyTo;
  this.model.content.subject = options.subject;
  this.model.content.from = options.from;
  this.model.content.html = options.htmlpart;
  this.model.content.text = options.textpart;
  this.model.content.email_rfc822 = options.rfc822Part;
  this.model.content.headers = options.headers;
  this.model.recipients = options.recipients;
  this.model.list_name = options.recipientList;
  this.model.content.template_id = options.template;

  this.model.open_tracking = options.openTracking || true;
  this.model.click_tracking = options.clickTracking || true;
  this.model.use_draft_template = options.useDraftTemplate || false;
};

/**
 *  Method for issuing POST request to the Transmissions API
 *
 *  This method assumes that all the appropriate fields have
 *  been populated by the user through configuration or calling
 *  helper methods
 *
 *  @param callback function
 */
Transmission.prototype.send = function(callback) {
  var options = {
    url: this.options.schema + '://' + this.options.host + this.baseUrl,
    json: this.model,
    headers: {
      authorization: this.options.key
    }
  };

  request.post(options, function(err, res, body) {
    if (err) {
      callback(err);
    } else if (res.statusCode !== 200) {
      callback(res.body.errors);
    } else {
      callback(null, body);
    }
  });
};

/**
 *  Method for issuing GET request to Transmissions API
 *
 *  This method is responsible for getting the collection _and_
 *  a specific entity from the Transmissions API
 *
 *  If TransmissionID parameter is omitted, then we fetch the collection
 *
 *  @param TransmissionID string Transmission ID of specific Transmission to retrieve
 *  @param callback function
 */
Transmission.prototype.fetch = function(transmissionID, callback) {
  var cb = callback
    , options = {
      url: this.options.schema + '://' + this.options.host + this.baseUrl,
      headers: {
        authorization: this.options.key
      }
    };

  // Check that someone passed in a real Transmission id, if not, then the TransmissionID parameter is acutally our callback
  if (typeof TransmissionID !== 'function' && typeof transmissionID !== undefined) {
    options.url = options.url + '/' + transmissionID;
  } else {
    cb = transmissionID;
  }

  // Fetch, Fido, Fetch! (We may want to abstract the actual HTTP requests in a helper)
  request.get(options, function(err, res, body) {
    if (err) {
      cb(new Error('Unable to contact Transmissions API: ' + err));
    } else if (res.statusCode === 404) {
      cb(new Error('The specified Transmission ID does not exist'));
    } else if (res.statusCode !== 200) {
      cb(new Error('Received bad response from Transmission API: ' + res.statusCode));
    } else {
      cb(null, body);
    }
  });
};

/**
 *  Method for adding metadata to a Transmission
 *
 *  Metadata for a Transmission are key-value pairs that will be made available
 *  in the webhooks payloads as identifiers for events that are associated with a particular Transmission
 *
 *  Please note that metadata can be applied at the recipient level, and any recipient level metadata takes
 *  precedence over Transmission level metadata
 *
 *  @param meta object Key-value pairs to be applied to the Transmission level metadata
 */
Transmission.prototype.setMetadata = function(meta) {
  this.model.metadata = meta;
  return this;
};

/**
 *  Method for adding substitution data to a Transmission
 *
 *  Substitution data are key-value pairs that are provided
 *  to the subsititution engine. The substitution engine scans
 *  parts of the content for substitution syntax '{{ }}' and
 *  substitutes the values of a given key where the syntax was found
 *
 *  Please note that recipient level substitution data takes precedence
 *  over any Transmission level substitution data
 *
 *  @param subs object Key-value pairs of substitution data to be applied at the Transmission level
 */
Transmission.prototype.setSubstitutionData = function(subs) {
  this.model.substitution_data = subs;
  return this;
};

/**
 *  Method for adding a campaign to a Transmission
 *
 *  Campaigns are logical groupings of related Transmissions
 *
 *  For example, I may have multiple mailings related to my Labor Day Sale,
 *  and would apply the campaign 'LaborDay2k14' to all Transmissions associated with
 *  said sale.
 *
 *  It is also worth noting that Transmissions flagged with a given campaign will be available
 *  for filtering in both webhooks, as well as the Reporting UI/Metrics API
 *
 *  @param campaignID string Campaign Name, with a max length of 64 bytes
 */
Transmission.prototype.setCampaign = function(campaignID) {
  this.model.campaign_id = campaignID;
  return this;
};

/**
 *  Method for adding a description to a Transmission
 *
 *  Descriptions are arbitrary strings used further describe what a specific
 *  Transmission was/is for the user's benefit.
 *
 *  Please note that the only place currently that description is exposed is via
 *  the Transmissions API, and the fetch method of this SDK
 *
 * @param description string Description of a Transmission with a max length of 1024 bytes
 */
Transmission.prototype.setDescription = function(description) {
  this.model.description = description;
  return this;
};

/**
 *  Method for adding a Return Path to a Transmission
 *
 *  A return path is an email address supplied to a Transmission where any
 *  bounces generated 'in the wild' will be sent back to this address. Return
 *  Path is used at the server level.
 *
 *  Please note that this field can be specified in recipients if using
 *  VERP (Variable Envelope Return Path), which will give each recipient
 *  a unique envelope MAIL FROM
 *
 *  @param returnPath string Return Path to be applied to a Transmission
 */
Transmission.prototype.setReturnPath = function(returnPath) {
  this.model.return_path = returnPath;
  return this;
};

/**
 *  Method for adding a Reply To to a Transmission
 *
 *  A Reply To is very similar to Return Path, but instead of
 *  being used by servers, Reply To is used by humans. When a human
 *  in their mail client clicks the reply button, the To field of that email
 *  will be populated with the email address provided in the Reply To field
 *
 *  @param replyTo string Reply To to be applied to a Transmission
 */
Transmission.prototype.setReplyTo = function(replyTo) {
  this.model.content.reply_to = replyTo;
  return this;
};

/**
 *  Method for adding a Subject to a Transmission
 *
 *  Sets the subject line of content for a given Transmission
 *
 *  @param subject string Subject to be applied to a Transmission
 */
Transmission.prototype.setSubject = function(subject) {
  this.model.content.subject = subject;
  return this;
};

/**
 *  Method for adding a From to a Transmission
 *
 *  Sets the from header of content for a given Transmission.
 *  Please note that there are three ways to provide the from header
 *
 *  1. From is a string, like 'person@example.com'
 *  2. From is an object with a key email, like '{email: 'person@example.com'}'
 *  3. From is an object with a email and name key, like '{name: 'Jane Doe', email: 'person@example.com'}'
 *
 *  Using the third form of From will result is a 'pretty' From headers, like From: Jane Doe <person@example.com>
 *
 *  @param from object/string From header to be applied to a Transmission
 */
Transmission.prototype.setFrom = function(from) {
  this.model.content.from = from;
  return this;
};

/**
 *  Method for adding HTML content to a Transmission
 *
 *  Used for generating a Transmission using inline HTML content
 *  Please note that you cannot specify HTML content if you've also
 *  provided a stored template (useStoredTemplate)
 *
 *  You cannot specify HTML content if you've also provided RFC-822
 *  encoded content
 *
 *  @param html string HTML Content to be used when the Transmission is sent
 */
Transmission.prototype.setHTMLContent = function(html) {
  this.model.content.html = html;
  return this;
};

/**
 *  Method for adding Plain Text content to a Transmission
 *
 *  Use for generating a Transmission using line Plain Text content
 *  Please note that you cannot specify Plain Text content if you've also
 *  provided a stored template (useStoredTemplate)
 *
 *  You cannot specify Plain Text content if you've also provided RFC-822
 *  encoded content
 *
 *  @param plaintext string Plain Text Content to be used when the Transmission is sent
 */
Transmission.prototype.setTextContent = function(plaintext) {
  this.model.content.text = plaintext;
  return this;
};

/**
 *  Method for adding RFC 822 encoded content to a Transmission
 *
 *  Used for generating a Transmission using inline encoded content
 *  Please note that you cannot specify RFC-822 content if you've also
 *  provided a stored template (useStoredTemplate)
 *
 *  You cannot specify RFC-822 content if you've already provided HTML
 *  or Plain Text content
 *
 *  @param rfc string RFC-822 encoded content to be used when the Transmission is sent
 */
Transmission.prototype.setRfc822Content = function(rfc) {
  this.model.content.email_rfc822 = rfc;
  return this;
};

/**
 *  Method for adding custom headers to the content of a Transmission
 *
 *  Can contain any key-value pairs _except_
 *  - Subject
 *  - From
 *  - To
 *  -Reply-To
 *
 *  @param headers object Key-value pairs of headers to add to the content of a Transmission
 */
Transmission.prototype.setContentHeaders = function(headers) {
  this.model.content.headers = headers;
  return this;
};

/**
 *  Method for adding recipients to a Transmission
 *
 *  Used for supplying inline recipients for a Transmission. Emails will be generated
 *  for each recipient in the list.
 *
 *  The only required field in the recipient definition is address, all others are optional
 *  A recipient definition looks like this (if using multiple recipients, each object should go into an array)
 *
 *    {
 *      'address': {
 *        'name': 'Jane Doe',
 *        'email': 'person@example.com'
 *      },
 *      'metadata': {
 *        'gender': 'female',
 *        'age': '40-50'
 *      },
 *      'return_path': 'preferred@bounce.mycompany.com',
 *      'substitution_data': {
 *        'name': 'Jane',
 *        'type': 'Platinum'
 *      },
 *      'tags': {
 *        'maryland',
 *        'preferred_customer'
 *      }
 *    }
 *
 *  @param recipients array/object List of recipients to send a Transmission
 */
Transmission.prototype.setRecipients = function(recipients) {
  this.model.recipients = recipients;
  return this;
};

/**
 *  Method for specifying a stored recipient list
 *
 *  Used for supplying a Transmission with recipients from a stored recipient list
 *  Please note that you cannot use a stored recipient list _and_ inline recipients (setRecipients)
 *
 *  @param recipientList string Name of the recipient list to be used during Transmission
 */
Transmission.prototype.useRecipientList = function(recipientList) {
  this.model.list_name = recipientList;
  return this;
};

/**
 *  Method for specifying a stored template
 *
 *  Used for supplying a Transmission with content from a stored template
 *  Please note that you cannot use a stored template if you've also added inline
 *  HTML, Plain Text, or RFC-822 encoded content
 *
 *  @param templateID string Name of template to be used during Transmission
 */
Transmission.prototype.useStoredTemplate = function(templateID) {
  this.model.content.template_id = templateID;
  return this;
};

/**
 *  Method for enabling click tracking for a given transmission
 *
 *  By default, click tracking is enabled for a transmission
 */
Transmission.prototype.enableClickTracking = function() {
  this.model.click_tracking = true;
  return this;
};

/**
 *  Method for disabling click tracking for a given transmission
 *
 *  By default, click tracking is enabled for a transmission
 */
Transmission.prototype.disableClickTracking = function() {
  this.model.click_tracking = false;
  return this;
};

/**
 *  Method for enabling open tracking for a given transmission
 *
 *  By default, open tracking is enabled for a transmission
 */
Transmission.prototype.enableOpenTracking = function() {
  this.model.open_tracking = true;
  return this;
};

/**
 *  Method for disabling open tracking for a given transmission
 *
 *  By default, open tracking is enabled for a transmission
 */
Transmission.prototype.disableOpenTracking = function() {
  this.model.open_tracking = false;
  return this;
};

/**
 *  Method for allowing the sending of a draft version of a template with a transmission
 *
 *  By default, you cannot send a draft version of a stored template
 */
Transmission.prototype.useDraftTemplate = function() {
  this.model.use_draft_template = true;
};

/**
 *  Method for disallowing the sending of a draft version of a template with a transmission
 *
 *  By default, you cannot send a draft version of a stored template
 */
Transmission.prototype.usePublishedTemplate = function() {
  this.mode.use_draft_template = false;
};

module.exports = Transmission;
