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
    find: function(webhookId, callback) {
      if(typeof webhookId === 'function') {
        callback = webhookId;
        webhookId = null;
      }

      if(!webhookId) {
        callback(new Error('webhookId is required'));
        return;
      }

      var options = {
        uri: api + '/' + webhookId
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

      if(!options.webhookId) {
        callback(new Error('webhookId is required in options'));
        return;
      }

      var webhookId = options.webhookId;
      var reqOpts = {
        uri: api + '/' + webhookId
        , json: toApiFormat(options)
      };
      client.put(reqOpts, callback);
    }
  };

  relayWebhooks['delete'] = function(webhookId, callback) {
    if (typeof webhookId === 'function') {
      callback = webhookId;
      webhookId = null;
    }

    if (!webhookId) {
      callback(new Error('webhookId is required'));
      return;
    }

    var options = {
      uri: api + '/' + webhookId
    };

    client['delete'](options, callback);
  };

  return relayWebhooks;
};
