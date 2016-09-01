'use strict';

let _ = require('lodash')
  , Promise = require('./Promise');
const api = 'webhooks';

module.exports = function(client) {
  var webhooks = {
    all: function(options, callback) {
      var reqOpts = {
        uri: api,
        qs: {}
      };

      if (!options || typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.timezone) {
        reqOpts.qs.timezone = options.timezone;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    describe: function(options, callback) {
      var reqOpts;
      options = options || {};

      if (!options.id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.id,
        qs: {}
      };

      if (options.timezone) {
        reqOpts.qs.timezone = options.timezone;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    create: function(webhook, callback) {
      var options;

      if (! webhook || typeof webhook === 'function') {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      options = {
        uri: api
        , json: webhook
      };

      return client.post(options).asCallback(callback);
    },
    update: function(webhook, callback) {
      var options;

      if (! webhook || typeof webhook === 'function') {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      if (!webhook.id) {
        return Promise.reject(new Error('webhook.id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + webhook.id,
        json: _.cloneDeep(webhook)
      };

      delete options.json.id;

      return client.put(options).asCallback(callback);
    },
    delete: function(id, callback) {
      var options;

      if (!id || typeof id === 'function') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };

      return client.delete(options).asCallback(callback);
    },
    validate: function(options, callback) {
      var reqOpts;
      options = options || {};

      if(!options.id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      if(!options.message) {
        return Promise.reject(new Error('message is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.id + '/validate'
        , json: {
          message: options.message
        }
      };

      return client.post(reqOpts).asCallback(callback);
    },
    getBatchStatus: function(options, callback) {
      var reqOpts;
      options = options || {};

      if(!options.id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.id + '/batch-status',
        qs: {}
      };

      if (options.limit) {
        reqOpts.qs.limit = options.limit;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    getDocumentation: function(callback) {
      var reqOpts = {
        uri: api + '/events/documentation'
      };
      return client.get(reqOpts).asCallback(callback);
    },
    getSamples: function(options, callback) {
      var reqOpts = {
        uri: api + '/events/samples',
        qs: {}
      };

      if (!options || typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.events) {
        reqOpts.qs.events = options.events;
      }

      return client.get(reqOpts).asCallback(callback);
    }
  };

  return webhooks;
};
