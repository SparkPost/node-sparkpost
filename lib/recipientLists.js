'use strict';

const Promise = require('./Promise');
const api = 'recipient-lists';

module.exports = function(client) {
  return {
    /**
     * Get a list of all your recipient lists
     * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-retrieve-get
     *
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    list: function(callback) {
      var reqOpts = {
        uri: api
      };
      return client.get(reqOpts).asCallback(callback);
    },

    /**
     * Get a list of all your recipient lists
     * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-list-get
     *
     * @param {string} id - Unique ID of the list to return
     * @param {Object} options - Hash of request options
     * @param {RequestCb} [callback]
     * @return {Promise}
     */
    get: function(id, options, callback) {
      var reqOpts;
      options = options || {};

      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id,
        qs: options
      };

      return client.get(reqOpts).asCallback(callback);
    },


    /**
     * Create a new recipient list
     * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-create-post
     *
     * @param  {Object} recipientList - recipient list object
     * @param  {Array} recipientList.recipients - Array of recipient objects
     * @param  {RequestCb} callback
     * @return {Promise}
     */
    create: function(recipientList, callback) {
      var reqOpts;

      if (!recipientList || typeof recipientList !== 'object' || !recipientList.recipients) {
        return Promise.reject(new Error('recipient list is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api,
        json: recipientList,
        qs: {
          num_rcpt_errors: recipientList.num_rcpt_errors
        }
      };

      return client.post(reqOpts).asCallback(callback);
    },

    /**
     * Update an existing list
     * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-update-put
     *
     * @param {string} id - Unique ID of the list to be updated
     * @param {Object} recipientList - recipient list object
     * @param  {Array} recipientList.recipients - Array of recipient objects
     * @param  {RequestCb} callback
     * @return {Promise}
     *
     */
    update: function(id, recipientList, callback) {
      var reqOpts;

      if (!id) {
        return Promise.reject(new Error('recipient list id is required')).asCallback(callback);
      }

      if (!recipientList || typeof recipientList === 'function') {
        return Promise.reject(new Error('recipient list is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id,
        json: recipientList,
        qs: {
          num_rcpt_errors: recipientList.num_rcpt_errors
        }
      };

      return client.put(reqOpts).asCallback(callback);
    },

    /**
     * Delete an existing recipient list
     * https://developers.sparkpost.com/api/recipient-lists#recipient-lists-delete-delete
     *
     * @param {string} id - ID of the list to be updated
     * @param  {RequestCb} callback
     * @return {Promise}
     *
     */
    delete: function(id, callback) {
      var reqOpts;

      if (!id || typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id
      };

      return client.delete(reqOpts).asCallback(callback);
    }
  };

};
