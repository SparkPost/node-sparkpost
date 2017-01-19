'use strict';

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
      const options = {
        uri: api
        , qs: parameters
      };
      return client.get(options, callback);
    },

    /**
     * Gets a single entry by email address ID
     *
     * @param {String} email
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    get: function(email, callback) {
      if (!email || typeof email === 'function') {
        return client.reject(new Error('email is required'), callback);
      }

      const options = {
        uri: `${api}/${email}`
      };
      return client.get(options, callback);
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
      if (!listEntries || typeof listEntries === 'function') {
        return client.reject(new Error('list entries is required'), callback);
      }

      if (!Array.isArray(listEntries)) {
        listEntries = [listEntries];
      }

      const options = {
        uri: api,
        json: { recipients: listEntries }
      };

      return client.put(options, callback);
    },

    /**
     * Deletes a single entry, by email address ID
     *
     * @param {String} email
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    delete: function(email, callback) {
      if (!email || typeof email === 'function') {
        return client.reject(new Error('email is required'), callback);
      }

      const options = {
        uri: `${api}/${email}`
      };
      return client.delete(options, callback);
    }
  };

};
