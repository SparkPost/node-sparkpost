'use strict';

const Promise = require('./Promise');
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
      let reqOpts = {
        uri: api
      };
      return client.get(reqOpts).asCallback(callback);
    },
    /**
     * Get details about a specified relay webhook by its id
     *
     * @param {string} id - the id of the relay webhook you want to look up
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get: function(id, callback) {
      let options;

      if (!id || typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };
      return client.get(options).asCallback(callback);
    },
    /**
     * Create a new relay webhook
     *
     * @param {Object} webhook - an object of [relay webhook attributes]{https://developers.sparkpost.com/api/relay-webhooks#header-relay-webhooks-object-properties}
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create: function(webhook, callback) {
      let reqOpts;

      if (!webhook || typeof webhook !== 'object') {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api
        , json: webhook
      };
      return client.post(reqOpts).asCallback(callback);
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
      let reqOpts;

      if (!id || typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      if (!webhook || typeof webhook !== 'object') {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id
        , json: webhook
      };

      return client.put(reqOpts).asCallback(callback);
    },
    /**
     * Delete an existing relay webhook
     *
     * @param {string} id - the id of the relay webhook you want to delete
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    delete: function(id, callback) {
      let options;

      if (!id || typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };

      return client.delete(options, callback).asCallback(callback);
    }
  };
};
