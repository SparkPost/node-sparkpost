'use strict';

var api = 'relay-webhooks'
  /* global -Promise */
  , Promise = require('./Promise');

var toApiFormat = function(input) {
  var model = {
    match: {}
  };

  model.target = input.target;
  model.match.domain = input.domain;

  model.name = input.name;
  model.auth_token = input.authToken;
  model.match.protocol = input.protocol;

  return model;
};

module.exports = function(client) {
  var relayWebhooks = {
    all: function(callback) {
      var reqOpts = {
        uri: api
      };
      return client.get(reqOpts).asCallback(callback);
    },
    find: function(relayWebhookId, callback) {
      if(typeof relayWebhookId === 'function') {
        callback = relayWebhookId;
        relayWebhookId = null;
      }

      if(!relayWebhookId) {
        return Promise.reject(new Error('relayWebhookId is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + relayWebhookId
      };
      return client.get(options).asCallback(callback);
    },
    create: function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = null;
      }

      if(!options) {
        return Promise.reject(new Error('options are required')).asCallback(callback);
      }

      if(!options.target) {
        return Promise.reject(new Error('target is required in options')).asCallback(callback);
      }

      if(!options.domain) {
        return Promise.reject(new Error('domain is required in options')).asCallback(callback);
      }

      var reqOpts = {
        uri: api
        , json: toApiFormat(options)
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

      if(!options.relayWebhookId) {
        return Promise.reject(new Error('relayWebhookId is required in options')).asCallback(callback);
      }

      var relayWebhookId = options.relayWebhookId;
      var reqOpts = {
        uri: api + '/' + relayWebhookId
        , json: toApiFormat(options)
      };
      return client.put(reqOpts).asCallback(callback);
    },
    delete: function(relayWebhookId, callback) {
      if (typeof relayWebhookId === 'function') {
        callback = relayWebhookId;
        relayWebhookId = null;
      }

      if (!relayWebhookId) {
        return Promise.reject(new Error('relayWebhookId is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + relayWebhookId
      };

      client.delete(options, callback).asCallback(callback);
    }
  };

  return relayWebhooks;
};
