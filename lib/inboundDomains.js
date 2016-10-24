'use strict';

const api = 'inbound-domains';
const Promise = require('./Promise');

module.exports = function(client) {
  return {
    /**
     * List an overview of all inbound domains in the account.
     *
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    list: function(callback) {
      var options = {
        uri: api
      };
      return client.get(options).asCallback(callback);
    },
    /**
     * Get an inbound domain by its domain name
     *
     * @param {string} domain
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get: function(domain, callback) {
      let options;

      if (!domain || typeof domain !== 'string') {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain
      };
      return client.get(options).asCallback(callback);
    },
    /**
     * Create a new inbound domain
     *
     * @param {Object} createOpts
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create: function(createOpts, callback) {
      let options;

      if (!createOpts || typeof createOpts !== 'object') {
        return Promise.reject(new Error('create options are required')).asCallback(callback);
      }

      options = {
        uri: api
        , json: createOpts
      };
      return client.post(options, callback).asCallback(callback);
    },
    /**
     * Delete an existing inbound domain
     *
     * @param {string} domain
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    delete: function(domain, callback) {
      let options;

      if (!domain || typeof domain !== 'string') {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain
      };
      return client.delete(options).asCallback(callback);
    }
  };
};
