'use strict';

var api = 'transmissions'
  /* global -Promise */
  , Promise = require('./Promise')
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
        return Promise.reject(new Error('transmissionBody is required')).asCallback(callback);
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

      return client.post(reqOpts).asCallback(callback);
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

      return client.get(reqOpts).asCallback(callback);
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
        return Promise.reject(new Error('transmissionID is required')).asCallback(callback);
      }

      return client.get(options).asCallback(callback);
    }
  };

};
