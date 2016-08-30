'use strict';

let Promise = require('./Promise');
const api = 'templates';

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

      if(!options.id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.id
        , qs: {}
      };

      if(options.draft) {
        reqOpts.qs.draft = options.draft;
        delete options.draft;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    create: function(template, callback) {
      var reqOpts;

      if (!template || typeof template === 'function') {
        return Promise.reject(new Error('template object is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api
        , json: template
      };

      return client.post(reqOpts).asCallback(callback);
    },
    update: function(template, callback) {
      var reqOpts;

      if(!template || typeof template === 'function') {
        return Promise.reject(new Error('template object is required')).asCallback(callback);
      }

      if(!template.id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + template.id
        , json: template
        , qs: {}
      };

      delete template.id;

      if(template.update_published) {
        reqOpts.qs.update_published = template.update_published;
        delete template.update_published;
      }

      return client.put(reqOpts).asCallback(callback);
    },
    delete: function(id, callback) {
      var options;

      if (!id || typeof id === 'function') {
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

      if(!options.id) {
        return Promise.reject(new Error('template id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.id + '/preview'
        , json: {
          substitution_data: options.substitution_data
        }
        , qs: {}
      };

      if (options.draft) {
        reqOpts.qs.draft = options.draft;
        delete options.draft;
      }

      return client.post(reqOpts).asCallback(callback);
    }
  };

  return templates;
};
