'use strict';

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
      const options = {
        uri: api
      };

      return client.get(options, callback);
    },

    /**
     * Get a single sending domain, by domain
     *
     * @param {string} domain - The domain name to get
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    get: function(domain, callback) {
      if (!domain || typeof domain === 'function') {
        return client.reject(new Error('domain is required'), callback);
      }

      const options = {
        uri: `${api}/${domain}`
      };

      return client.get(options, callback);
    },

    /**
     * Creates a new sending domain
     *
     * @param {Object} createOpts - attributes used to create the new domain
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    create: function(createOpts, callback) {
      if (!createOpts || typeof createOpts !== 'object') {
        return client.reject(new Error('create options are required'), callback);
      }

      const options = {
        uri: api,
        json: createOpts
      };

      return client.post(options, callback);
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
      if (typeof domain !== 'string') {
        return client.reject(new Error('domain is required'), callback);
      }

      if (!updateOpts || typeof updateOpts !== 'object') {
        return client.reject(new Error('update options are required'), callback);
      }

      const options = {
        uri: `${api}/${domain}`,
        json: updateOpts
      };

      return client.put(options, callback);
    },

    /**
     * Delete an existing sending domain
     *
     * @param {string} domain - The domain to delete
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    delete: function(domain, callback) {
      if (typeof domain !== 'string') {
        return client.reject(new Error('domain is required'), callback);
      }

      const options = {
        uri: `${api}/${domain}`
      };

      return client.delete(options, callback);
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
      if (typeof domain !== 'string') {
        return client.reject(new Error('domain is required'), callback);
      }

      if (!options || typeof options !== 'object') {
        return client.reject(new Error('verification options are required'), callback);
      }

      const reqOpts = {
        uri: `${api}/${domain}/verify`,
        json: options
      };

      return client.post(reqOpts, callback);
    }
  };

};
