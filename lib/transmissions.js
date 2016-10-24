'use strict';

let _ = require('lodash')
  , Promise = require('./Promise');
const api = 'transmissions';

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
module.exports = function(client) {

  return {
    send: function(transmission, callback) {
      var reqOpts;

      if (!transmission || typeof transmission === 'function') {
        return Promise.reject(new Error('transmission object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api,
        json: _.cloneDeep(transmission),
        qs: {}
      };

      if (reqOpts.json.num_rcpt_errors) {
        reqOpts.qs.num_rcpt_errors = reqOpts.json.num_rcpt_errors;
        delete reqOpts.json.num_rcpt_errors;
      }

      return client.post(reqOpts).asCallback(callback);
    },
    all: function(options, callback) {
      var reqOpts;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      reqOpts = {
        uri: api,
        qs: options
      };

      return client.get(reqOpts).asCallback(callback);
    },
    find: function(id, callback) {
      var options;

      if (typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };

      return client.get(options).asCallback(callback);
    }
  };

};
