'use strict';

const api = 'transmissions';
const Promise = require('./Promise');

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
module.exports = function(client) {

  return {
    /**
     * List an overview of all transmissions in the account
     *
     * @param {Object} options
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    list: function(options, callback) {
      var reqOpts;

      // Handle optional options argument
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
    /**
     * Retrieve the details about a transmission by its id
     *
     * @param {String} id
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get: function(id, callback) {
      var options;

      if (typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };

      return client.get(options).asCallback(callback);
    },
    /**
     * Sends a message by creating a new transmission
     *
     * @param {Object} transmission
     * @param {Object} options
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    send: function(transmission, options, callback) {
      var reqOpts;

      if (!transmission || typeof transmission !== 'object') {
        return Promise.reject(new Error('transmission object is required')).asCallback(callback);
      }

      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      reqOpts = {
        uri: api,
        json: transmission,
        qs: options
      };

      return client.post(reqOpts).asCallback(callback);
    }
  };

};
