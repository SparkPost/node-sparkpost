'use strict';

const Promise = require('./Promise');
const api = 'webhooks';

module.exports = function(client) {
  return {

    /**
     * Lists all webhooks
     *
     * @param {Object} [options] - Hash of options
     * @param {string} [options.timezone] - The timezone to use for the last_successful and last_failure properties.
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    list: function(options, callback) {
      var reqOpts = {
        uri: api,
        qs: {}
      };

      if (!options || typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.timezone) {
        reqOpts.qs.timezone = options.timezone;
      }

      return client.get(reqOpts).asCallback(callback);
    },

    /**
     * Get a single webhook by ID
     *
     * @param {string} id - The ID of the webhook to get
     * @param {Object} [options] - Hash of options
     * @param {string} [options.timezone] - The timezone to use for the last_successful and last_failure properties.
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get: function(id, options, callback) {
      var reqOpts;

      if (!options || typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id,
        qs: {}
      };

      if (options.timezone) {
        reqOpts.qs.timezone = options.timezone;
      }

      return client.get(reqOpts).asCallback(callback);
    },

    /**
     * Creates a new webhook
     *
     * @param {Object} webhook - attributes used to create the new webhook
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create: function(webhook, callback) {
      var options;

      if (!webhook || typeof webhook === 'function') {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      options = {
        uri: api,
        json: webhook
      };

      return client.post(options).asCallback(callback);
    },

    /**
     * Update an existing webhook
     *
     * @param {string} id - The ID of the webhook to update
     * @param {Object} webhook - Hash of the webhook attributes to update
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    update: function(id, webhook, callback) {
      var options;
      if (!id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      if (!webhook || typeof webhook === 'function') {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id,
        json: webhook
      };

      delete options.json.id;

      return client.put(options).asCallback(callback);
    },

    /**
     * Delete an existing webhook
     *
     * @param {string} id - The ID of the webhook to delete
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    delete: function(id, callback) {
      var options;

      if (!id || typeof id === 'function') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };

      return client.delete(options).asCallback(callback);
    },

    /**
     * Sends an example message event batch from the Webhook API to the target URL.
     *
     * @param {string} id - The ID of the webhook to validate
     * @param {Object} options - Hash of options used to validate the webhook
     * @param {string} options.message - The message (payload) to send to the webhook consumer.
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    validate: function(id, options, callback) {
      var reqOpts;

      if (typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      if (!options || typeof options === 'function' || !options.message) {
        return Promise.reject(new Error('message is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id + '/validate',
        json: {
          message: options.message
        }
      };

      return client.post(reqOpts).asCallback(callback);
    },

    /**
     * Gets recent status information about a webhook.
     *
     * @param {string} id - The ID of the webhook to check
     * @param {Object} [options] - Hash of options
     * @param {string} [options.limit] - The maximum number of results to return.
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    getBatchStatus: function(id, options, callback) {
      var reqOpts;

      if (!options || typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id + '/batch-status',
        qs: {}
      };

      if (options.limit) {
        reqOpts.qs.limit = options.limit;
      }

      return client.get(reqOpts).asCallback(callback);
    },

    /**
     * Lists descriptions of the events, event types, and event fields that could be included in a Webhooks post to your target URL.
     *
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    getDocumentation: function(callback) {
      var reqOpts = {
        uri: api + '/events/documentation'
      };
      return client.get(reqOpts).asCallback(callback);
    },

    /**
     * Lists examples of the event data that will be posted to a webhook consumer.
     *
     * @param {Object} [options] - Hash of options
     * @param {string} [options.events] - A comma delimited list of events to get samples of.
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    getSamples: function(options, callback) {
      var reqOpts = {
        uri: api + '/events/samples',
        qs: {}
      };

      if (!options || typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.events) {
        reqOpts.qs.events = options.events;
      }

      return client.get(reqOpts).asCallback(callback);
    }
  };
};
