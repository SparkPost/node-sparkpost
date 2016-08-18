'use strict';

var api = 'suppression-list'
  /* global -Promise */
  , Promise = require('bluebird')
  , toApiFormat = require('./toApiFormat');

module.exports = function(client) {

  return {
    search: function(parameters, callback) {
      var options = {
        uri: api
        , qs: parameters
      };
      return client.get(options).asCallback(callback);
    },
    checkStatus: function(email, callback) {
      if(typeof email === 'function') {
        callback = email;
        email = null;
      }

      if(!email) {
        return Promise.reject(new Error('email is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + email
      };
      return client.get(options).asCallback(callback);
    },
    removeStatus: function(email, callback) {
      if(typeof email === 'function') {
        callback = email;
        email = null;
      }

      if(!email) {
        return Promise.reject(new Error('email is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + email
      };
      return client.delete(options).asCallback(callback);
    },
    upsert: function(recipients, callback) {
      var options;

      if(typeof recipients === 'function') {
        callback = recipients;
        recipients = null;
      }

      if(!recipients) {
        return Promise.reject(new Error('recipient is required')).asCallback(callback);
      }

      if(!Array.isArray(recipients)) {
        recipients = [recipients];
      }

      recipients = toApiFormat(recipients);
      options = {
        uri: api,
        json: { recipients: recipients }
      };

      return client.put(options, callback).asCallback(callback);
    }
  };

};
