'use strict';

let _ = require('lodash')
  , Promise = require('./Promise');
const api = 'relay-webhooks';

module.exports = function(client) {
  var relayWebhooks = {
    all: function(callback) {
      var reqOpts = {
        uri: api
      };
      return client.get(reqOpts).asCallback(callback);
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
    create: function(webhook, callback) {
      var reqOpts;

      if(!webhook || typeof webhook === 'function') {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api
        , json: webhook
      };
      return client.post(reqOpts).asCallback(callback);
    },
    update: function(webhook, callback) {
      var reqOpts;

      if(!webhook || typeof webhook === 'function') {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      if(!webhook.id) {
        return Promise.reject(new Error('webhook.id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + webhook.id
        , json: _.cloneDeep(webhook)
      };

      delete reqOpts.json.id;

      return client.put(reqOpts).asCallback(callback);
    },
    delete: function(id, callback) {
      var options;

      if (!id || typeof id === 'function') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };

      return client.delete(options, callback).asCallback(callback);
    }
  };

  return relayWebhooks;
};
