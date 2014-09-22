'use strict';

var request = require('request')
  , config = require('./configuration')
  , _ = require('lodash');

var Transmission = function(params) {
  var self = this;
  params = params || {};

  this.options = config.options;
  this.options.baseUrl = '/api/' + this.options.version + '/transmissions';

  this.model = {
    content: {},
    options: {}
  };

  this.defaults = {
    recipients: [],
    options: {
      open_tracking: true,
      click_tracking: true
    },
    content: {
      use_draft_template: false
    }
  };

  /*
   * Provides alternate style for setting data on transmission
   * If preferred style is setProperty, you can do that as well
   */
  this.model.campaign_id = params.campaign;
  this.model.metadata = params.metadata;
  this.model.substitution_data = params.substitutionData;
  this.model.description = params.description;
  this.model.return_path = params.returnPath;
  this.model.content.reply_to = params.replyTo;
  this.model.content.subject = params.subject;
  this.model.content.from = params.from;
  this.model.content.html = params.html;
  this.model.content.text = params.text;
  this.model.content.email_rfc822 = params.rfc822Part;
  this.model.content.headers = params.headers;
  this.model.recipients = params.recipients;
  /** If you supply both recipients and recipientList,
   *  the list will override the recipients
   */
  if(params.recipientList) {
    self.useRecipientList(params.recipientList);
  }

  this.model.content.template_id = params.template;

  this.model.options.open_tracking = params.openTracking;
  this.model.options.click_tracking = params.clickTracking;
  this.model.content.use_draft_template = params.useDraftTemplate;

  this.model = _.merge(this.defaults, this.model);
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
    url: this.options.protocol + '://' + this.options.host + (this.options.port ? ':' + this.options.port : '') + this.options.baseUrl,
    json: this.model,
    headers: {
      authorization: this.options.key
    },
    strictSSL: this.options.strictSSL
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
 *  Private Method for issuing GET request to Transmissions API
 *
 *  This method is responsible for getting the collection _and_
 *  a specific entity from the Transmissions API
 *
 *  If TransmissionID parameter is omitted, then we fetch the collection
 *
 *  @param config object Configuration keys/values from the Transmission Class
 *  @param TransmissionID string Transmission ID of specific Transmission to retrieve
 *  @param callback function
 */
var fetch = function(config, transmissionID, callback) {
  var cb = callback
    , options = {
      url: config.protocol + '://' + config.host + (config.port ? ':' + config.port : '') +  config.baseUrl,
      headers: {
        authorization: config.key
      },
      strictSSL: config.strictSSL
    };

  /*
   * Check that someone passed in a real Transmission ID, if not,
   * then the transmissionID parameter is acutally our callback
   */
  if (typeof transmissionID !== 'function' && typeof transmissionID !== undefined) {
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
 *  Method for retrieving information about all transmissions
 *  Wrapper method for a cleaner interface
 */
Transmission.prototype.all = function(callback) {
  fetch(this.options, callback);
};

/**
 *  Method for retrieving information about a single transmission
 *  Wrapper method for a cleaner interface
 */
Transmission.prototype.find = function(transmissionID, callback) {
  fetch(this.options, transmissionID, callback);
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
 *  Method for adding a recipient to a Transmission
 *
 *  Used for supplying inline recipients for a Transmission. Emails will be generated
 *  for each recipient in the list.
 *
 *  The only required field in the recipient definition is address, all others are optional
 *  A recipient definition looks like this (if using multiple recipients, iteratively call this method)
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
 *  @param recipients object of recipient data to send a Transmission
 */
Transmission.prototype.setRecipient = function(recipients) {
  var self = this;

  /** The data type for recipients could be an object if
   *  specifying a list instead of inline array of recipients
   */
  if(!Array.isArray(this.model.recipients)) {
    self.model.recipients = [];
  }
  this.model.recipients.push(recipients);
  return this;
};

/**
 *  Method for specifying a stored recipient list
 *
 *  Used for supplying a Transmission with recipients from a stored recipient list
 *  Please note that you cannot use a stored recipient list _and_ inline recipients (setRecipient)
 *
 *  @param recipientList string Name of the recipient list to be used during Transmission
 */
Transmission.prototype.useRecipientList = function(recipientList) {
  //Resetting the data type as it could've been an array of inline recipients
  this.model.recipients = {};
  this.model.recipients.list_name = recipientList;
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
  this.model.options.click_tracking = true;
  return this;
};

/**
 *  Method for disabling click tracking for a given transmission
 *
 *  By default, click tracking is enabled for a transmission
 */
Transmission.prototype.disableClickTracking = function() {
  this.model.options.click_tracking = false;
  return this;
};

/**
 *  Method for enabling open tracking for a given transmission
 *
 *  By default, open tracking is enabled for a transmission
 */
Transmission.prototype.enableOpenTracking = function() {
  this.model.options.open_tracking = true;
  return this;
};

/**
 *  Method for disabling open tracking for a given transmission
 *
 *  By default, open tracking is enabled for a transmission
 */
Transmission.prototype.disableOpenTracking = function() {
  this.model.options.open_tracking = false;
  return this;
};

/**
 *  Method for allowing the sending of a draft version of a template with a transmission
 *
 *  By default, you cannot send a draft version of a stored template
 */
Transmission.prototype.useDraftTemplate = function() {
  this.model.content.use_draft_template = true;
};

/**
 *  Method for disallowing the sending of a draft version of a template with a transmission
 *
 *  By default, you cannot send a draft version of a stored template
 */
Transmission.prototype.usePublishedTemplate = function() {
  this.model.content.use_draft_template = false;
};

module.exports = Transmission;
