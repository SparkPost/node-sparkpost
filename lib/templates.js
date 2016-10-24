'use strict';

const api = 'templates';
const Promise = require('./Promise');
const _ = require('lodash');

module.exports = function(client) {
  return {
    /**
     * List an overview of all templates.
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
     * Get details about a specified template by its id.
     *
     * @param {string} id
     * @param {Object} options
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get: function(id, options, callback) {
      var reqOpts;
      options = options || {};

      if (!id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id
        , qs: options
      };

      return client.get(reqOpts).asCallback(callback);
    },
    /**
     * Create a new template.
     *
     * @param {Object} template
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create: function(template, callback) {
      var reqOpts;

      if (!template || typeof template !== 'object') {
        return Promise.reject(new Error('template object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api
        , json: template
      };

      return client.post(reqOpts).asCallback(callback);
    },
    /**
     * Update an existing template.
     *
     * @param {String} id
     * @param {Object} template
     * @param {Object} options
     * @param {RequestCb} callback
     * @returns {Promise}
     */
    update: function(id, template, options, callback) {
      var reqOpts;

      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      if (!template || typeof template !== 'object') {
        return Promise.reject(new Error('template object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id
        , json: template
        , qs: options
      };

      return client.put(reqOpts).asCallback(callback);
    },
    /**
     * Delete an existing template.
     *
     * @param {String} id
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    delete: function(id, callback) {
      var options;

      if (!id || typeof id !== 'string') {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };
      return client.delete(options).asCallback(callback);
    },
    /**
     * Preview the most recent version of an existing template by id.
     *
     * @param {String} id
     * @param {Object} options
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    preview: function(id, options, callback) {
      var reqOpts;
      options = options || {};

      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id + '/preview'
        , json: _.cloneDeep(options)
        , qs: {}
      };

      if (reqOpts.json.draft) {
        reqOpts.qs.draft = reqOpts.json.draft;
        delete reqOpts.json.draft;
      }

      return client.post(reqOpts).asCallback(callback);
    }
  };
};
