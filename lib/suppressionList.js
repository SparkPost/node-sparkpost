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
    upsert: function(recipient, callback) {
      if(typeof recipient === 'function') {
        callback = recipient;
        recipient = null;
      }

      if(!recipient) {
        callback(new Error('recipient is required'));
        return;
      }

      var options = {
        uri: api + '/' + recipient.email
        , json: recipient
      };

      // Check for bulk upsert
      if(recipient.constructor === Array) {
        options.uri = api;
        options.json = toApiFormat(recipient);
      } else if(!recipient.email) {
        callback(new Error('email is required in the recipient object'));
        return;
      }

      client.put(options, callback);
    }
  };

};
