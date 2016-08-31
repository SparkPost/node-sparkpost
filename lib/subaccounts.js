'use strict';

let Promise = require('./Promise');
const api = 'subaccounts';

module.exports = function(client) {
  var subaccounts = {
    all: function(callback) {
      var options = {
        uri: api
      };
      return client.get(options).asCallback(callback);
    },
    find: function(id, callback) {
      var options;

      if(!id || typeof id === 'function') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };
      return client.get(options).asCallback(callback);
    },
    create: function(subaccount, callback) {
      var reqOpts;

      if(!subaccount || typeof subaccount === 'function') {
        return Promise.reject(new Error('subaccount object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api,
        json: subaccount
      };
      return client.post(reqOpts).asCallback(callback);
    },
    update: function(subaccount, callback) {
      var reqOpts;

      if(!subaccount || typeof subaccount === 'function') {
        return Promise.reject(new Error('subaccount object is required')).asCallback(callback);
      }

      if(!subaccount.id) {
        return Promise.reject(new Error('subaccount.id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + subaccount.id,
        json: subaccount
      };

      delete subaccount.id;

      return client.put(reqOpts).asCallback(callback);
    }
  };

  return subaccounts;
};
