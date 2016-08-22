'use strict';

var api = 'webhooks'
  /* global -Promise */
  , Promise = require('./Promise')
  , toApiFormat = require('./toApiFormat');

module.exports = function(client) {
  var webhooks = {
    all: function(options, callback) {
      var reqOpts = {
        uri: api
      };

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.timezone) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.timezone = options.timezone;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    describe: function(options, callback) {
      options = options || {};

      if(!options.id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }
      var reqOpts = {
        uri: api + '/' + options.id
      };

      if (options.timezone) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.timezone = options.timezone;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    create: function(webhook, callback) {
      if(typeof webhook === 'function') {
        callback = webhook;
        webhook = null;
      }

      if(!webhook) {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }
      var options = {
        uri: api
        , json: toApiFormat(webhook)
      };

      return client.post(options).asCallback(callback);
    },
    update: function(webhook, callback) {
      if(typeof webhook === 'function') {
        callback = webhook;
        webhook = null;
      }

      if(!webhook) {
        return Promise.reject(new Error('webhook object is required')).asCallback(callback);
      }

      var object = toApiFormat(webhook)
        , options = {
          uri: api + '/' + webhook.id
          , json: object
        };

      return client.put(options).asCallback(callback);
    },
    delete: function(id, callback) {
      if (typeof id === 'function') {
        callback = id;
        id = null;
      }

      if (!id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + id
      };

      return client.delete(options).asCallback(callback);
    },
    validate: function(options, callback) {
      options = options || {};

      if(!options.id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      if(!options.message) {
        return Promise.reject(new Error('message is required')).asCallback(callback);
      }

      var reqOpts = {
        uri: api + '/' + options.id + '/validate'
        , json: {
          message: options.message
        }
      };

      return client.post(reqOpts).asCallback(callback);
    },
    getBatchStatus: function(options, callback) {
      options = options || {};

      if(!options.id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      var reqOpts = {
        uri: api + '/' + options.id + '/batch-status'
      };

      if (options.limit) {
        reqOpts.qs = reqOpts.qs || {};
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
    getSamples: function(options, callback){
      var reqOpts = {
        uri: api + '/events/samples'
      };

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.events) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.events = options.events;
      }

      return client.get(reqOpts).asCallback(callback);
    }
  };

  return webhooks;
};
