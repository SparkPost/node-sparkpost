'use strict';

const api = 'subaccounts';

module.exports = function(client) {
  const subaccounts = {
    /**
     * List a summary of all subaccounts
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
     * Get details about a specified subaccount by its id
     *
     * @param {string} id - the id of the subaccount you want to look up
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
     * Create a new subaccount
     *
     * @param subaccount - an object of [subaccount attributes]{https://developers.sparkpost.com/api/subaccounts#header-request-body-attributes}
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    create: function(subaccount, callback) {
      if (!subaccount || typeof subaccount !== 'object') {
        return client.reject(new Error('subaccount object is required'), callback);
      }

      const reqOpts = {
        uri: api,
        json: subaccount
      };
      return client.post(reqOpts, callback);
    },
    /**
     * Update existing subaccount by id
     *
     * @param {string} id - the id of the subaccount you want to update
     * @param {Object} subaccount - an object of [subaccount attributes]{https://developers.sparkpost.com/api/subaccounts#header-request-body-attributes-1}
     * @param {RequestCb} callback
     * @returns {Promise}
     */
    update: function(id, subaccount, callback) {
      if (!id || typeof id !== 'string') {
        return client.reject(new Error('id is required'), callback);
      }

      if (!subaccount || typeof subaccount !== 'object') {
        return client.reject(new Error('subaccount object is required'), callback);
      }

      const reqOpts = {
        uri: `${api}/${id}`,
        json: subaccount
      };

      return client.put(reqOpts, callback);
    }
  };

  return subaccounts;
};
