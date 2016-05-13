'use strict';

var api = 'suppression-list'
  , toApiFormat = require('./toApiFormat');

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
      if(typeof email === 'function') {
        callback = email;
        email = null;
      }

      if(!email) {
        callback(new Error('email is required'));
        return;
      }

      var options = {
        uri: api + '/' + email
      };
      client.get(options, callback);
    },
    removeStatus: function(email, callback) {
      if(typeof email === 'function') {
        callback = email;
        email = null;
      }

      if(!email) {
        callback(new Error('email is required'));
        return;
      }

      var options = {
        uri: api + '/' + email
      };
      client['delete'](options, callback);
    },
    upsert: function(recipients, callback) {
      var options;

      if(typeof recipients === 'function') {
        callback = recipients;
        recipients = null;
      }

      if(!recipients) {
        callback(new Error('recipient is required'));
        return;
      }

      if(!Array.isArray(recipients)) {
        recipients = [recipients];
      }

      recipients = toApiFormat(recipients);
      options = {
        uri: api,
        json: { recipients: recipients }
      };

      client.put(options, callback);
    }
  };

};
