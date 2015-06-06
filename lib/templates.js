'use strict';

var api = 'templates'
  , toApiFormat = require('./toApiFormat');

module.exports = function(client) {
  var templates = {
    all: function(callback) {
      var options = {
        uri: api
      };
      client.get(options, callback);
    },
    find: function(options, callback) {
      options = options || {};

      if(!options.id) {
        callback(new Error('template id is required'));
        return;
      }

      var reqOpts = {
        uri: api + '/' + options.id
      };

      if(options.draft) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.draft = options.draft;
      }

      client.get(reqOpts, callback);
    },
    create: function(options, callback) {
      options = options || {};

      if (!options.template) {
        callback(new Error('template object is required'));
        return;
      }

      var reqOpts = {
        uri: api
        , json: toApiFormat(options.template)
      };

      client.post(reqOpts, callback);
    },
    update: function(options, callback) {
      options = options || {};

      if(!options.template) {
        callback(new Error('template object is required'));
        return;
      }

      var object = toApiFormat(options.template)
        , reqOpts = {
          uri: api + '/' + object.id
          , json: object
        };

      if(options.update_published) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.update_published = options.update_published;
      }

      client.put(reqOpts, callback);
    },
    preview: function(options, callback) {
      options = options || {};

      if(!options.id) {
        callback(new Error('template id is required'));
        return;
      }

      var reqOpts = {
        uri: api + '/' + options.id + '/preview'
        , json: {
          substitution_data: options.data
        }
      };

      if (options.draft) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.draft = options.draft;
      }

      client.post(reqOpts, callback);
    }
  };

  templates['delete'] = function(id, callback) {
    if (typeof id === 'function') {
      callback = id;
      id = null;
    }

    if (!id) {
      callback(new Error('template id is required'));
      return;
    }

    var options = {
      uri: api + '/' + id
    };
    client['delete'](options, callback);
  };

  return templates;
};
