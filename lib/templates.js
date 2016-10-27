'use strict';

var api = 'templates'
  , Promise = require('./Promise')
  , toApiFormat = require('./toApiFormat');

module.exports = function(client) {
  var templates = {
    all: function(callback) {
      var options = {
        uri: api
      };
      return client.get(options).asCallback(callback);
    },
    find: function(options, callback) {
      var reqOpts;
      options = options || {};

      if (!options.id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.id
      };

      if (options.draft) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.draft = options.draft;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    create: function(options, callback) {
      var reqOpts;
      options = options || {};

      if (!options.template) {
        return Promise.reject(new Error('template object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api
        , json: toApiFormat(options.template)
      };

      return client.post(reqOpts).asCallback(callback);
    },
    update: function(options, callback) {
      var object, reqOpts;
      options = options || {};

      if (!options.template) {
        return Promise.reject(new Error('template object is required')).asCallback(callback);
      }

      object = toApiFormat(options.template);
      reqOpts = {
        uri: api + '/' + object.id
        , json: object
      };

      if (options.update_published) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.update_published = options.update_published;
      }

      return client.put(reqOpts).asCallback(callback);
    },
    delete: function(id, callback) {
      var options;

      if (typeof id === 'function') {
        callback = id;
        id = null;
      }

      if (!id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + id
      };
      return client.delete(options).asCallback(callback);
    },
    preview: function(options, callback) {
      var reqOpts;
      options = options || {};

      if (!options.id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.id + '/preview'
        , json: {
          substitution_data: options.data
        }
      };

      if (options.draft) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.draft = options.draft;
      }

      return client.post(reqOpts).asCallback(callback);
    }
  };

  return templates;
};
