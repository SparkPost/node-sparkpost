'use strict';

const withCallback = require('./Promise');
const api = 'inbound-domains';

module.exports = function(client) {
  return {
    /**
     * List an overview of all inbound domains in the account.
     *
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    list: function(callback) {
      const options = {
        uri: api
      };
      return withCallback(client.get(options), callback);
    },
    /**
     * Get an inbound domain by its domain name
     *
     * @param {string} domain
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get: function(domain, callback) {
      if (!domain || typeof domain !== 'string') {
        return withCallback(Promise.reject(new Error('domain is required')), callback);
      }

      const options = {
        uri: `${api}/${domain}`
      };
      return withCallback(client.get(options), callback);
    },
    /**
     * Create a new inbound domain
     *
     * @param {Object} createOpts
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create: function(createOpts, callback) {
      if (!createOpts || typeof createOpts !== 'object') {
        return withCallback(Promise.reject(new Error('create options are required')), callback);
      }

      const options = {
        uri: api
        , json: createOpts
      };
      return withCallback(client.post(options, callback), callback);
    },
    /**
     * Delete an existing inbound domain
     *
     * @param {string} domain
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    delete: function(domain, callback) {
      if (!domain || typeof domain !== 'string') {
        return withCallback(Promise.reject(new Error('domain is required')), callback);
      }

      const options = {
        uri: `${api}/${domain}`
      };
      return withCallback(client.delete(options), callback);
    }
  };
};
