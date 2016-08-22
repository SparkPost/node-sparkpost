'use strict';

var api = 'transmissions'
  /* global -Promise */
  , Promise = require('./Promise');

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
module.exports = function(client) {

  return {
    send: function (options, callback) {
      if(!options || typeof options === 'function') {
        return Promise.reject(new Error('options object is required')).asCallback(callback);
      }

      var reqOpts = {
        uri: api,
        json: options
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
        qs: options
      };

      return client.get(reqOpts).asCallback(callback);
    },
    find: function (id, callback) {
      if (typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + id
      };

      return client.get(options).asCallback(callback);
    }
  };

};
