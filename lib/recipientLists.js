'use strict';

var api = 'recipient-lists'
  , toApiFormat = require('./toApiFormat');

module.exports = function(client) {
  var recipientLists = {
    all: function(callback) {
      var reqOpts = {
        uri: api
      };
      client.get(reqOpts, callback);
    },
    find: function(options, callback) {
      options = options || {};

      if(!options.id) {
        callback(new Error('id is required'));
        return;
      }

      var reqOpts = {
        uri: api + '/' + options.id
      };

      if(options.show_recipients) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.show_recipients = options.show_recipients;
      }

      client.get(reqOpts, callback);
    },
    create: function(options, callback) {
      options = options || {};

      if(!options.recipients) {
        callback(new Error('recipients list is required'));
        return;
      }
      var reqOpts = {
        uri: api
      };

      if (options.num_rcpt_errors) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.num_rcpt_errors = options.num_rcpt_errors;
        delete options.num_rcpt_errors;
      }

      reqOpts.json = toApiFormat(options);

      client.post(reqOpts, callback);
    }
  };

  recipientLists['delete'] = function(id, callback) {
    if (typeof id === 'function') {
      callback = id;
      id = null;
    }

    if (!id) {
      callback(new Error('id is required'));
      return;
    }

    var reqOpts = {
      uri: api + '/' + id
    };
    client['delete'](reqOpts, callback);
  };

  return recipientLists;
};
