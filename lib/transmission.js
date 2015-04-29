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

  model.options.open_tracking = input.trackOpens;
  model.options.click_tracking = input.trackClicks;
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

      if(typeof transmissionBody === 'function') {
        callback = transmissionBody;
        transmissionBody = null;
      }

      if(!transmissionBody) {
        callback(new Error('transmissionBody is required'));
        return;
      }

      var mappedInput = toApiFormat(transmissionBody);

      var options = {
        uri: api,
        json: mappedInput
      };

      client.post(options, callback);
    },
    all: function (callback) {
      var options = {
        uri: api
      };

      client.get(options, callback);
    },
    find: function (transmissionID, callback) {
      var options = {
        uri: api + '/' + transmissionID
      };

      if(typeof transmissionID === 'function') {
        callback = transmissionID;
        transmissionID = null;
      }

      if(!transmissionID) {
        callback(new Error('transmissionID is required'));
        return;
      }

      client.get(options, callback);
    }
  };

};
