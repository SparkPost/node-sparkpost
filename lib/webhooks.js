'use strict';

var api = 'webhooks';

var toApiFormat = function(input) {
  var model = input;

  return model;
};

module.exports = function(client) {
  var webhooks = {
    all: function(options, callback) {
      var cb = callback
        , opts = options
        , reqOpts = {
          uri: api
        };

      if (typeof options === 'function') {
        cb = options;
        opts = {};
      }

      if (opts && opts.timezone) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.timezone = opts.timezone;
      }

      client.get(reqOpts, cb);
    },
    describe: function(id, options, callback) {
      var cb = callback
        , opts = options
        , reqOpts = {
          uri: api + '/' + id
        };

      if (typeof options === 'function') {
        cb = options;
        opts = {};
      }

      if (opts && opts.timezone) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.timezone = opts.timezone;
      }

      client.get(reqOpts, cb);
    },
    create: function(webhook, callback) {

    },
    update: function(webhook, callback) {

    },
    validate: function(id, message, callback) {
      var options = {
        uri: api + '/' + id
        , json: {
          message: message
        }
      };

      client.post(options, callback);
    },
    getBatchStatus: function(id, options, callback) {
      var cb = callback
        , opts = options
        , reqOpts = {
          uri: api + '/' + id + '/batch-status'
        };

      if (typeof options === 'function') {
        cb = options;
        opts = {};
      }

      if (opts && opts.timezone) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.timezone = opts.timezone;
      }

      client.get(reqOpts, cb);
    }
  };

  webhooks['delete'] = function(id, callback) {
    var options = {
      uri: api + '/' + id
    };

    client['delete'](options, callback);
  };

  return webhooks;
};
