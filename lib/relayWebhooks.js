'use strict';

const api = 'relay-webhooks';

module.exports = function(client) {
  return {
    /**
     * List all relay webhooks
     *
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    list: function(callback) {
      const reqOpts = {
        uri: api
      };
      return client.get(reqOpts, callback);
    },
    /**
     * Get details about a specified relay webhook by its id
     *
     * @param {string} id - the id of the relay webhook you want to look up
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get: function(id, callback) {
      if (!id || typeof id !== 'string') {
        return client.reject(new Error('id is required'), callback);
      }

      const options = {
        uri: `${api}/${id}`
      };

      return client.get(options, callback);
    },
    /**
     * Create a new relay webhook
     *
     * @param {Object} webhook - an object of [relay webhook attributes]{https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties}
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create: function(webhook, callback) {
      if (!webhook || typeof webhook !== 'object') {
        return client.reject(new Error('webhook object is required'), callback);
      }

      const reqOpts = {
        uri: api
        , json: webhook
      };

      return client.post(reqOpts, callback);
    },
    /**
     * Update an existing relay webhook
     *
     * @param {string} id - the id of the relay webhook you want to update
     * @param {Object} webhook - an object of [relay webhook attributes]{https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties}
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    update: function(id, webhook, callback) {
      if (!id || typeof id !== 'string') {
        return client.reject(new Error('id is required'), callback);
      }

      if (!webhook || typeof webhook !== 'object') {
        return client.reject(new Error('webhook object is required'), callback);
      }

      const reqOpts = {
        uri: `${api}/${id}`
        , json: webhook
      };

      return client.put(reqOpts, callback);
    },
    /**
     * Delete an existing relay webhook
     *
     * @param {string} id - the id of the relay webhook you want to delete
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    delete: function(id, callback) {
      if (!id || typeof id !== 'string') {
        return client.reject(new Error('id is required'), callback);
      }

      const options = {
        uri: `${api}/${id}`
      };

      return client.delete(options, callback);
    }
  };
};
