'use strict';

var api = 'sending-domains';

/**
 * Private Method for migrating the flat user input into
 * a format that the Sending Domains REST API expects
 *
 * This method does not perform any validation of the user's input, we
 * rely on the API to return appropriate errors for all the weird combinations
 * of things, like you can't specify rfc822 content and then specify html/plaintext
 *
 * @param input object Flat object of configuration for the sending domain to be sent
 * @returns object
 */
var toApiFormat = function(input) {
  var model = {
    dkim: {}
  };

  model.domain = input.domainName;
  model.dkim['private'] = input.privateKey;
  model.dkim['public'] = input.publicKey;
  model.dkim.selector = input.selector;
  model.dkim.headers = input.headers;

  return model;
};

/*
 * "Class" declaration, Sending Domains API exposes five functions:
 * - create: creates a new sending domain
 * - update: updates an existing sending domain
 * - verify: validates specified verification field types on a sending domain
 * - all: retreives a list of sending domains
 * - find: retreives info about a specific sending domain
 */
module.exports = function (client) {

  return {
    find: function (domainName, callback) { //retrieve
      var options = {
        uri: api + '/' + domainName
      };
      client.get(options, callback);
    },
    all: function (callback) { //list
      var options = {
        uri: api
      };
      client.get(options, callback);
    },
    create: function (domainBody, callback) {
      var options = {
        uri: api
        , json: toApiFormat(domainBody)
      };
      client.post(options, callback);
    },
    update: function (domainBody, callback) {
      var obj = toApiFormat(domainBody);
      var options = {
        uri: api + '/' + obj.domain
        , json: toApiFormat(domainBody)
      };
      client.put(options, callback);
    },
    verify: function (domainName, options, callback) {
      var cb = callback;
      var payload = {
        dkim_verify: true,
        spf_verify: true
      };

      if (typeof options !== 'function' && typeof options !== undefined) {
        payload.dkim_verify = options.verifyDKIM !== false;
        payload.spf_verify = options.verifySPF !== false;
      } else {
        cb = options;
      }

      var reqOpts = {
        method: 'GET',
        url: api + '/' + domainName + '/verify',
        json: payload
      };

      client.get(api, reqOpts, cb);
    }
  };

};
