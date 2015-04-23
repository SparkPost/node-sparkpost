'use strict';

var api = 'templates';

var toApiFormat = function(input) {
  var model = input;

  return model;
};

module.exports = function(client) {
  var templates = {
    find: function (id, options, callback) {
      var cb = callback
        , opts = options
        , reqOpts = {
          uri: api + '/' + id
        };

      if (typeof options === 'function') {
        cb = options;
        opts = {};
      }

      if (opts && opts.draft) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.draft = opts.draft;
      }

      client.get(reqOpts, cb);
    },
    all: function(callback) {
      var options = {
        uri: api
      };
      client.get(options, callback);
    },
    create: function(template, callback) {
      var options = {
        uri: api
        , json: toApiFormat(template)
      };
      client.post(options, callback);
    },
    update: function(template, options, callback) {
      var cb = callback
        , opts = options
        , object = toApiFormat(template)
        , reqOpts = {
          uri: api + '/' + object.id
          , json: object
        };

      if (typeof options === 'function') {
        cb = options;
        opts = {};
      }

      if (opts && opts.update_published) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.update_published = opts.update_published;
      }

      client.put(reqOpts, cb);
    },
    preview: function(id, data, options, callback) {
      var cb = callback
        , opts = options
        , reqOpts = {
          uri: api + '/' + id + '/preview'
          , json: {
            substitution_data: data
          }
        };

      if (typeof options === 'function') {
        cb = options;
        opts = {};
      }

      if (opts && opts.draft) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.draft = opts.draft;
      }

      client.post(reqOpts, cb);
    }
  };

  templates['delete'] = function(id, callback) {
    var options = {
      uri: api + '/' + id
    };
    client['delete'](options, callback);
  };

  return templates;
};
