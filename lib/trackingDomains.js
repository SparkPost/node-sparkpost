'use strict';

const api = 'tracking-domains';

module.exports = function(client) {
  return {
    /**
     * Lists all tracking domains
     *
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    list: function(options, callback) {

      const reqOpts = {
        uri: api,
        qs: {}
      };


      if (options.default) {
        reqOpts.qs.default = options.default;
      }

      if (options.subaccounts) {

        reqOpts.qs.subaccounts = options.subaccounts;
      }

      return client.get(reqOpts, callback);
    },

    /**
     * Get a single tracking domain by domain
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
     * Creates a new tracking domain
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
     * Update an existing tracking domain
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
     * Delete an existing tracking domain
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
     * Verify an existing tracking domain
     *
     * @param {string} domain - The domain to verify
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    verify: function(domain, callback) {
      if (typeof domain !== 'string') {
        return client.reject(new Error('domain is required'), callback);
      }

      const reqOpts = {
        uri: `${api}/${domain}/verify`
      };

      return client.post(reqOpts, callback);
    }
  };

};
