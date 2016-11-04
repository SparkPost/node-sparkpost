'use strict';

const Promise = require('./Promise');
const api = 'suppression-list';

module.exports = function(client) {

  return {
    /**
     * Lists all entries in your suppression list,
     * filtered by an optional set of parameters
     *
     * @param {Object} [parameters] - Hash of parameters to filter results
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    list: function(parameters, callback) {
      let options = {
        uri: api
        , qs: parameters
      };
      return client.get(options).asCallback(callback);
    },

    /**
     * Gets a single entry by email address ID
     *
     * @param {String} email
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    get: function(email, callback) {
      let options;

      if (!email || typeof email === 'function') {
        return Promise.reject(new Error('email is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + email
      };
      return client.get(options).asCallback(callback);
    },

    /**
     * Updates existing entries, or creates entries
     * if they don't exist for that email address ID
     *
     * @param {Array|Object} listEntries - List of suppression entry objects to upsert
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    upsert: function(listEntries, callback) {
      let options;

      if (!listEntries || typeof listEntries === 'function') {
        return Promise.reject(new Error('list entries is required')).asCallback(callback);
      }

      if (!Array.isArray(listEntries)) {
        listEntries = [listEntries];
      }

      options = {
        uri: api,
        json: { recipients: listEntries }
      };

      return client.put(options, callback).asCallback(callback);
    },

    /**
     * Deletes a single entry, by email address ID
     *
     * @param {String} email
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    delete: function(email, callback) {
      let options;

      if (!email || typeof email === 'function') {
        return Promise.reject(new Error('email is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + email
      };
      return client.delete(options).asCallback(callback);
    }
  };

};
