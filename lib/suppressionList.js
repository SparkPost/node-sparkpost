'use strict';

let Promise = require('./Promise');
const api = 'suppression-list';

module.exports = function(client) {

  return {
    search: function(parameters, callback) {
      var options = {
        uri: api
        , qs: parameters
      };
      return client.get(options).asCallback(callback);
    },
    getEntry: function(email, callback) {
      var options;

      if(!email || typeof email === 'function') {
        return Promise.reject(new Error('email is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + email
      };
      return client.get(options).asCallback(callback);
    },
    deleteEntry: function(email, callback) {
      var options;

      if(!email || typeof email === 'function') {
        return Promise.reject(new Error('email is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + email
      };
      return client.delete(options).asCallback(callback);
    },
    upsert: function(listEntries, callback) {
      var options;

      if(!listEntries || typeof listEntries === 'function') {
        return Promise.reject(new Error('list entries is required')).asCallback(callback);
      }

      if(!Array.isArray(listEntries)) {
        listEntries = [listEntries];
      }

      options = {
        uri: api,
        json: { recipients: listEntries }
      };

      return client.put(options, callback).asCallback(callback);
    }
  };

};
