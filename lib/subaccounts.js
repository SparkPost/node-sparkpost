'use strict';

var api = 'subaccounts';

var toApiFormat = function(input) {
  var model = {};

  model.name = input.name;
  model.key_label = input.keyLabel;
  model.ip_pool = input.ipPool;
  model.status = input.status;

  model.key_grants = Array.isArray(input.keyGrants)
    ? input.keyGrants
    : [input.keyGrants];
  model.key_valid_ips = Array.isArray(input.keyValidIps)
    ? input.keyValidIps
    : [input.keyValidIps];

  return model;
}

module.exports = function(client) {
  var subaccounts = {
    all: function(callback) {
      var options = {
        uri: api
      };
      client.get(options, callback);
    },
    find: function(subaccountId, callback) {
      if(typeof subaccountId === 'function') {
        callback = subaccountId;
        subaccountId = null;
      }

      if (!subaccountId) {
        callback(new Error('subaccountId is required'));
        return;
      }

      var options = {
        uri: api + '/' + subaccountId
      };
      client.get(options, callback);
    },
    create: function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = null;
      }

      if (!options) {
        callback(new Error('options are required'));
        return;
      }

      if(!options.name) {
        callback(new Error('name is required in options'));
        return;
      }
      if(!options.keyLabel) {
        callback(new Error('keyLabel is required in options'));
        return;
      }
      if(!options.keyGrants) {
        callback(new Error('keyGrants is required in options'));
        return;
      }

      var reqOpts = {
        uri: api,
        json: toApiFormat(options)
      };
      client.post(reqOpts, callback);
    },
    update: function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = null;
      }

      if(!options) {
        callback(new Error('options are required'));
        return;
      }

      if(!options.subaccountId) {
        callback(new Error('subaccountId is required in options'))
        return;
      }

      var subaccountId = options.subaccountId;
      var reqOpts = {
        uri: api + '/' + subaccountId,
        json: toApiFormat(options)
      };
      client.put(reqOpts, callback);
    }
  };

  return subaccounts;
};
