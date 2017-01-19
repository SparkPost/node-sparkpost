'use strict';

const api = 'templates';

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
      const options = {
        uri: api
      };
      return client.get(options, callback);
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
      options = options || {};

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!id) {
        return client.reject(new Error('template id is required'), callback);
      }

      const reqOpts = {
        uri: `${api}/${id}`
        , qs: options
      };

      return client.get(reqOpts, callback);
    },
    /**
     * Create a new template.
     *
     * @param {Object} template
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create: function(template, callback) {
      if (!template || typeof template !== 'object') {
        return client.reject(new Error('template object is required'), callback);
      }

      const reqOpts = {
        uri: api
        , json: template
      };

      return client.post(reqOpts, callback);
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
      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!id) {
        return client.reject(new Error('template id is required'), callback);
      }

      if (!template || typeof template !== 'object') {
        return client.reject(new Error('template object is required'), callback);
      }

      const reqOpts = {
        uri: `${api}/${id}`
        , json: template
        , qs: options
      };

      return client.put(reqOpts, callback);
    },
    /**
     * Delete an existing template.
     *
     * @param {String} id
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    delete: function(id, callback) {
      if (!id || typeof id !== 'string') {
        return client.reject(new Error('template id is required'), callback);
      }

      const options = {
        uri: `${api}/${id}`
      };
      return client.delete(options, callback);
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
      options = options || {};

      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!id) {
        return client.reject(new Error('template id is required'), callback);
      }

      const reqOpts = {
        uri: `${api}/${id}/preview`
        , json: _.cloneDeep(options)
        , qs: {}
      };

      if (reqOpts.json.draft) {
        reqOpts.qs.draft = reqOpts.json.draft;
        delete reqOpts.json.draft;
      }

      return client.post(reqOpts, callback);
    }
  };
};
