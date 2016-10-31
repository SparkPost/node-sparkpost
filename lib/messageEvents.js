'use strict';

const api = 'message-events';

/*
 * "Class" declaration, Message Events API exposes one function:
 * - search: retrieves list of message events according to given params
 */
module.exports = function(client) {
  return {
    /**
     * Search for message events using given parameters
     *
     * @param {Object} parameters
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    search: function(parameters, callback) {
      var options = {
        uri: api
        , qs: parameters
      };
      return client.get(options).asCallback(callback);
    }
  };
};

