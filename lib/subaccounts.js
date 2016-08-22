'use strict';

var api = 'subaccounts'
  /* global -Promise */
  , Promise = require('./Promise');

var toApiFormat = function(input) {
  var model = {};

  model.name = input.name;
  model.key_label = input.keyLabel;
  model.ip_pool = input.ipPool;
  model.status = input.status;

  model.key_grants = Array.isArray(input.keyGrants) ? input.keyGrants : [input.keyGrants];

  // server returns 500 if key_valid_ips is empty array
  if (input.keyValidIps) {
    var keyValidIpsIsArray = Array.isArray(input.keyValidIps);
    if (keyValidIpsIsArray && input.keyValidIps.length > 0) {
      model.key_valid_ips = input.keyValidIps;
    } else if (!keyValidIpsIsArray) {
      model.key_valid_ips = [input.keyValidIps];
    }
  }

  return model;
};

var validateCreateOptions = function(input) {
  if (!input.name) {
    return 'name is required';
  }

  if (!input.keyLabel) {
    return 'keyLabel is required';
  }

  if (!input.keyGrants) {
    return 'keyGrants is required';
  }

  return null;
};

module.exports = function(client) {
  var subaccounts = {
    all: function(callback) {
      var options = {
        uri: api
      };
      return client.get(options).asCallback(callback);
    },
    find: function(subaccountId, callback) {
      if(typeof subaccountId === 'function') {
        callback = subaccountId;
        subaccountId = null;
      }

      if (!subaccountId) {
        return Promise.reject(new Error('subaccountId is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + subaccountId
      };
      return client.get(options).asCallback(callback);
    },
    create: function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = null;
      }

      if (!options) {
        return Promise.reject(new Error('options are required')).asCallback(callback);
      }

      var validation = validateCreateOptions(options);
      if (validation) {
        return Promise.reject(new Error(validation + ' in options')).asCallback(callback);
      }

      var reqOpts = {
        uri: api,
        json: toApiFormat(options)
      };
      return client.post(reqOpts).asCallback(callback);
    },
    update: function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = null;
      }

      if(!options) {
        return Promise.reject(new Error('options are required')).asCallback(callback);
      }

      if(!options.subaccountId) {
        return Promise.reject(new Error('subaccountId is required in options')).asCallback(callback);
      }

      var subaccountId = options.subaccountId;
      var reqOpts = {
        uri: api + '/' + subaccountId,
        json: toApiFormat(options)
      };
      return client.put(reqOpts).asCallback(callback);
    }
  };

  return subaccounts;
};
