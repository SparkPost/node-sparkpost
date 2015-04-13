'use strict';

var api = 'transmissions';

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

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
module.exports = function(client) {

  return {
    send: function (transmissionBody, callback) {
      var mappedInput = toApiFormat(transmissionBody);

      var options = {
        url: api,
        json: mappedInput
      };

      client.post(options, function (err, res, body) {
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
    all: function (callback) {
      var options = {
        url: api
      };

      client.get(options, function(err, res, body) {
        if (err) {
          callback(new Error('Unable to contact Transmissions API: ' + err));
        } else if (res.statusCode === 404) {
          callback(new Error('The specified Transmission ID does not exist'));
        } else if (res.statusCode !== 200) {
          callback(new Error('Received bad response from Transmission API: ' + res.statusCode));
        } else {
          callback(null, body);
        }
      });
    },
    find: function (transmissionID, callback) {
      var options = {
        uri: api + '/' + transmissionID
      };

      client.get(options, function(err, res, body) {
        if (err) {
          callback(new Error('Unable to contact Transmissions API: ' + err));
        } else if (res.statusCode === 404) {
          callback(new Error('The specified Transmission ID does not exist'));
        } else if (res.statusCode !== 200) {
          callback(new Error('Received bad response from Transmission API: ' + res.statusCode));
        } else {
          callback(null, body);
        }
      });
    }
  };

};
