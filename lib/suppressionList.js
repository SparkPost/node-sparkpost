'use strict';

var api = 'suppression-list';

var toApiFormat = function(input) {
  var model = {
    recipients: input
  };

  return model;
};

module.exports = function(client) {

  return {
    search: function(parameters, callback) {
      var options = {
        uri: api
        , qs: parameters
      };
      client.get(options, callback);
    },
    checkStatus: function(email, callback) {
      var options = {
        uri: api + '/' + email
      };
      client.get(options, callback);
    },
    removeStatus: function(email, callback) {
      var options = {
        uri: api + '/' + email
      };
      client['delete'](options, callback);
    },
    upsert: function(recipient, callback) {
      var options = {
        uri: api + '/' + recipient.email
        , json: recipient
      };

      // Check for bulk upsert
      if(recipient.constructor === Array) {
        options.uri = api;
        options.json = toApiFormat(recipient);
      }

      client.put(options, callback);
    }
  };

};
