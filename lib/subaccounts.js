'use strict';

var api = 'subaccounts'
  , toApiFormat = require('./toApiFormat');

module.exports = function(client) {
  var subaccounts = {
    all: function(callback) {
      var options = {
        uri: api
      };
      client.get(options, callback);
    },
    find: function(options, callback) {
      options = options || {};

      if (!options.id) {
        callback(new Error('subaccount id is required'));
        return;
      }

      var reqOpts = {
        uri: api + '/' + options.id
      };

      client.get(reqOpts, callback);
    },
    create: function(options, callback) {
      options = options || {};

      if (!options.subaccount) {
        callback(new Error('subaccount object is required'));
        return;
      }

      var reqOpts = {
        uri: api,
        json: toApiFormat(options.subacount)
      };

      client.post(reqOpts, callback);
    },
    update: function(options, callback) {
      options = options || {};

      if (!options.subaccount) {
        callback(new Error('subaccount object is required'));
        return;
      }

      var object = toApiFormat(options.subaccount)
        , reqOpts = {
          uri: api + '/' + object.id,
          json: object
        };

      client.put(reqOpts, callback);
    }
  };

  return subaccounts;
};
