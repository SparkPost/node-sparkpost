'use strict';

var request = require('request')
  , config = require('./configuration');

/**
 * Private Method for migrating the flat user input into
 * a format that the Transmissions REST API expects
 *
 * This method does not perform any validation of the user's input, we
 * rely on the API to return appropriate errors for all the weird combinations
 * of things, like you can't specify rfc822 content and then specify html/plaintext
 *
 * @param input object Flat object of configuration for the transmission to be sent
 * @returns object
 */
var toApiFormat = function(input) {
  var model = {
    content: {},
    options: {},
    recipients: {}
  };

  model.description = input.description;
  model.return_path = input.returnPath || 'default@sparkpostmail.com';
  model.campaign_id = input.campaign;
  model.metadata = input.metadata;
  model.substitution_data = input.substitutionData;

  model.options.open_tracking = input.trackOpens === false ? false : true;
  model.options.click_tracking = input.trackClicks === false ? false : true;
  model.options.sandbox = input.useSandbox;

  model.content.use_draft_template = input.useDraftTemplate || false;
  model.content.reply_to = input.replyTo;
  model.content.subject = input.subject;
  model.content.from = input.from;
  model.content.html = input.html;
  model.content.text = input.text;
  model.content.email_rfc822 = input.rfc822;
  model.content.template_id = input.template;
  model.content.headers = input.customHeaders;

  model.recipients.list_id = input.recipientList;
  model.recipients = input.recipients;

  return model;
};

/**
 * Private Method for putting URL construction logic into one place
 *
 * @returns string Fully constructed URL for contacting the Transmissions API
 */
var constructURL = function () {
  return config.options.protocol + '://' + config.options.host + (config.options.port ? ':' + config.options.port: '') + '/api/' + config.options.version + '/transmissions';
};

/**
 *  Private Method for issuing GET request to Transmissions API
 *
 *  This method is responsible for getting the collection _and_
 *  a specific entity from the Transmissions API
 *
 *  If TransmissionID parameter is omitted, then we fetch the collection
 *
 *  @param TransmissionID string Transmission ID of specific Transmission to retrieve
 *  @param callback function
 */
var fetch = function(transmissionID, callback) {
  var cb = callback
    , options = {
      url: constructURL(),
      headers: {
        authorization: config.options.key
      },
      strictSSL: config.options.strictSSL
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

  // Fetch, Fido, Fetch! (We may want to abstract the actual HTTP requests in a helper when we have more libs)
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

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
module.exports = {
  send: function(transmissionBody, callback) {
    var mappedInput = toApiFormat(transmissionBody);

    var options = {
      url: constructURL(),
      json: mappedInput,
      headers: {
        authorization: config.options.key
      },
      strictSSL: config.options.strictSSL
    };

    request.post(options, function(err, res, body) {
      if (err) {
        callback(err);
      } else if (typeof res === 'undefined' || typeof res.body === 'undefined') {
        /*
         * If we're in here then something very strange has happened because we didn't
         * get a properly formatted response from the API call, so give generic error
         * since that's the best we can do in this case
         *
         * Note that this is the case for both successful responses and error responses
         */
        callback(new Error('Unexpected error occurred while trying to send transmission'));
      } else if (res.statusCode !== 200) {
        callback(res.body.errors);
      } else {
        callback(null, body);
      }
    });
  },
  all: function(callback) {
    fetch(callback);
  },
  find: function(transmissionID, callback) {
    fetch(transmissionID, callback);
  }
};
