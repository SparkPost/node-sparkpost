'use strict';

var api = 'message-events';

/*
 * "Class" declaration, Message Events API exposes one function:
 * - search: retrieves list of message events according to given params
 */
module.exports = function (client) {
  return {
    search: function(parameters, callback) {
      var options = {
        uri: api
        , qs: parameters
      };
      client.get(options, callback);
    }
  };
};
