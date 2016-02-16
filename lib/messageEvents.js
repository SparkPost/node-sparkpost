'use strict';

var api = 'message-events';

/*
 * "Class" declaration, Message Events API exposes one function:
 * - search: retrieves list of message events according to given params
 */
module.exports = function (client) {
  return {
    search: function(parameters, callback) {
      var arrayParams = [
        'bounce_classes',
        'campaign_ids',
        'events',
        'friendly_froms',
        'message_ids',
        'recipients',
        'template_ids',
        'transmission_ids'
      ]
        , options;

      arrayParams.forEach(function(paramname) {
        if (Array.isArray(parameters[paramname])) {
          parameters[paramname] = parameters[paramname].toString();
        }
      });

      options = {
        uri: api
        , qs: parameters
      };
      client.get(options, callback);
    }
  };
};

