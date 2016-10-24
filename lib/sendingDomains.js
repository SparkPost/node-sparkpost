'use strict';

const Promise = require('./Promise');
const api = 'sending-domains';

module.exports = function(client) {

  return {
    /**
     * Lists all sending domains
     *
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    list: function(callback) {
      let options = {
        uri: api
      };

      return client.get(options).asCallback(callback);
    },

    /**
     * Get a single sending domain, by domain
     *
     * @param {string} domain - The domain name to get
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    get: function(domain, callback) {
      let options;

      if (!domain || typeof domain === 'function') {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain
      };

      return client.get(options).asCallback(callback);
    },

    /**
     * Creates a new sending domain
     *
     * @param {Object} createOpts - attributes used to create the new domain
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    create: function(createOpts, callback) {
      let options;

      if (!createOpts || typeof createOpts !== 'object') {
        return Promise.reject(new Error('create options are required')).asCallback(callback);
      }

      options = {
        uri: api,
        json: createOpts
      };

      return client.post(options).asCallback(callback);
    },

    /**
     * Update an existing sending domain
     *
     * @param {string} domain - The domain to update
     * @param {Object} updateOpts - Hash of the sending domain attributes to update
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    update: function(domain, updateOpts, callback) {
      let options;

      if (typeof domain !== 'string') {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      if (!updateOpts || typeof updateOpts !== 'object') {
        return Promise.reject(new Error('update options are required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain,
        json: updateOpts
      };

      return client.put(options).asCallback(callback);
    },

    /**
     * Delete an existing sending domain
     *
     * @param {string} domain - The domain to delete
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    delete: function(domain, callback) {
      let options;

      if (typeof domain !== 'string') {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain
      };

      return client.delete(options).asCallback(callback);
    },

    /**
     * Verify an existing sending domain
     *
     * @param {string} domain - The domain to verify
     * @param {Object} options - Hash of options to include in verification request
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    verify: function(domain, options, callback) {
      let reqOpts;

      if (typeof domain !== 'string') {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      if (!options || typeof options !== 'object') {
        return Promise.reject(new Error('verification options are required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + domain + '/verify',
        json: options
      };

      return client.post(reqOpts).asCallback(callback);
    }
  };

};
