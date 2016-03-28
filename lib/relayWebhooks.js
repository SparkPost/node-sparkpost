'use strict';

var api = 'relay-webhooks';

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
      client.get(reqOpts, callback);
    },
    find: function(relayWebhookId, callback) {
      if(typeof relayWebhookId === 'function') {
        callback = relayWebhookId;
        relayWebhookId = null;
      }

      if(!relayWebhookId) {
        callback(new Error('relayWebhookId is required'));
        return;
      }

      var options = {
        uri: api + '/' + relayWebhookId
      };
      client.get(options, callback);
    },
    create: function(options, callback) {
      if(typeof options === 'function') {
        callback = options;
        options = null;
      }

      if(!options) {
        callback(new Error('options are required'));
        return;
      }

      if(!options.target) {
        callback(new Error('target is required in options'));
        return;
      }

      if(!options.domain) {
        callback(new Error('domain is required in options'));
        return;
      }

      var reqOpts = {
        uri: api
        , json: toApiFormat(options)
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

      if(!options.relayWebhookId) {
        callback(new Error('relayWebhookId is required in options'));
        return;
      }

      var relayWebhookId = options.relayWebhookId;
      var reqOpts = {
        uri: api + '/' + relayWebhookId
        , json: toApiFormat(options)
      };
      client.put(reqOpts, callback);
    },
    delete: function(relayWebhookId, callback) {
      if (typeof relayWebhookId === 'function') {
        callback = relayWebhookId;
        relayWebhookId = null;
      }

      if (!relayWebhookId) {
        callback(new Error('relayWebhookId is required'));
        return;
      }

      var options = {
        uri: api + '/' + relayWebhookId
      };

      client.delete(options, callback);
    }
  };

  return relayWebhooks;
};
