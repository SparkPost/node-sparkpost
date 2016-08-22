'use strict';

var api = 'recipient-lists'
  /* global -Promise */
  , Promise = require('./Promise')
  , toApiFormat = require('./toApiFormat');

module.exports = function(client) {
  var recipientLists = {
    all: function(callback) {
      var reqOpts = {
        uri: api
      };
      return client.get(reqOpts).asCallback(callback);
    },
    find: function(options, callback) {
      options = options || {};

      if(!options.id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      var reqOpts = {
        uri: api + '/' + options.id
      };

      if(options.show_recipients) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.show_recipients = options.show_recipients;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    create: function(options, callback) {
      options = options || {};

      if(!options.recipients) {
        return Promise.reject(new Error('recipients list is required')).asCallback(callback);
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

      return client.post(reqOpts).asCallback(callback);
    },
    update: function(options, callback) {
      options = options || {};

      if(!options.id) {
        return Promise.reject(new Error('recipients list id is required')).asCallback(callback);
      }

      var reqOpts = {
        uri: api + '/' + options.id
      };

      if (options.num_rcpt_errors) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.num_rcpt_errors = options.num_rcpt_errors;
        delete options.num_rcpt_errors;
      }

      reqOpts.json = toApiFormat(options);

      return client.put(reqOpts, callback).asCallback(callback);
    },
    delete: function(id, callback) {
      if (typeof id === 'function') {
        callback = id;
        id = null;
      }

      if (!id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      var reqOpts = {
        uri: api + '/' + id
      };
      return client.delete(reqOpts).asCallback(callback);
    }
  };

  return recipientLists;
};
