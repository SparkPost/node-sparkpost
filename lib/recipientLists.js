'use strict';

var api = 'recipient-lists';

var toApiFormat = function(input) {
  var model = input;

  return model;
};

module.exports = function(client) {
  var recipientLists = {
    find: function(id, options, callback) {
      var cb = callback
        , opts = options
        , reqOpts = {
          uri: api + '/' + id
        };

      if (typeof options === 'function') {
        cb = options;
        opts = {};
      }

      if (opts && opts.show_recipients) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.show_recipients = reqOpts.show_recipients;
      }

      client.get(reqOpts, cb);
    },
    all: function(callback) {
      var reqOpts = {
        uri: api
      };
      client.get(reqOpts, callback);
    },
    create: function(list, options, callback) {
      var cb = callback
        , opts = options
        , reqOpts = {
          uri: api
          , json: toApiFormat(list)
        };

      if (typeof options === 'function') {
        cb = options;
        opts = {};
      }

      if (opts && opts.num_rcpt_errors) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.num_rcpt_errors = reqOpts.num_rcpt_errors;
      }

      client.post(reqOpts, cb);
    }
  };

  recipientLists['delete'] = function(id, callback) {
    var reqOpts = {
      uri: api + '/' + id
    };
    client['delete'](reqOpts, callback);
  };

  return recipientLists;
};
