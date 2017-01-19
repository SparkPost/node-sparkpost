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
      const options = {
        uri: api
        , qs: {}
      };

      Object.keys(parameters).forEach(function(paramname) {
        if (Array.isArray(parameters[paramname])) {
          options.qs[paramname] = parameters[paramname].join(',');
        } else {
          options.qs[paramname] = parameters[paramname];
        }
      });
      return client.get(options, callback);
    }
  };
};
