'use strict';

const api = 'recipient-validation';

module.exports = function(client) {
  return {
    /**
     * To validate a given email address
     *
     * @param {string} address - the email address of the recipient that requires validation
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    validate: function(address, callback) {
      if (!address || typeof address !== 'string') {
        return client.reject(new Error('Email Address is required'), callback);
      }

      const options = {
        uri: `${api}/single/${address}`
      };
      return client.get(options, callback);
    }
  };
};
