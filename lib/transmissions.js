'use strict';

var api = 'transmissions'
  , toApiFormat = require('./toApiFormat');

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
module.exports = function(client) {

  return {
    send: function (options, callback) {
      options = options || {};

      if(!options.transmissionBody) {
        callback(new Error('transmissionBody is required'));
        return;
      }

      var mappedInput = toApiFormat(options.transmissionBody);

      var reqOpts = {
        uri: api,
        json: mappedInput
      };

      if (options.num_rcpt_errors) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.num_rcpt_errors = options.num_rcpt_errors;
        delete options.num_rcpt_errors;
      }

      client.post(reqOpts, callback);
    },
    all: function (options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = {};
      }

      var reqOpts = {
        uri: api,
        qs: {}
      };

      if (options.campaign_id) {
        reqOpts.qs.campaign_id = options.campaign_id;
      }

      if (options.template_id) {
        reqOpts.qs.template_id = options.template_id;
      }

      client.get(reqOpts, callback);
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
