'use strict';

let _ = require('lodash')
  , Promise = require('./Promise');
const api = 'recipient-lists';

module.exports = function(client) {
  var recipientLists = {
    all: function(callback) {
      var reqOpts = {
        uri: api
      };
      return client.get(reqOpts).asCallback(callback);
    },
    find: function(options, callback) {
      var reqOpts;
      options = options || {};

      if(!options.id) {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.id
      };

      if(options.show_recipients) {
        reqOpts.qs = reqOpts.qs || {};
        reqOpts.qs.show_recipients = options.show_recipients;
      }

      return client.get(reqOpts).asCallback(callback);
    },
    create: function(recipientList, callback) {
      var reqOpts;

      if(!recipientList || typeof recipientList === 'function') {
        return Promise.reject(new Error('recipient list is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api,
        json: _.cloneDeep(recipientList),
        qs: {}
      };

      if (reqOpts.json.num_rcpt_errors) {
        reqOpts.qs.num_rcpt_errors = reqOpts.json.num_rcpt_errors;
        delete reqOpts.json.num_rcpt_errors;
      }

      return client.post(reqOpts).asCallback(callback);
    },
    update: function(recipientList, callback) {
      var reqOpts;

      if(!recipientList || typeof recipientList === 'function') {
        return Promise.reject(new Error('recipient list is required')).asCallback(callback);
      }

      if(!recipientList.id) {
        return Promise.reject(new Error('recipient list id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + recipientList.id,
        json: _.cloneDeep(recipientList),
        qs: {}
      };

      delete reqOpts.json.id;

      if (reqOpts.json.num_rcpt_errors) {
        reqOpts.qs.num_rcpt_errors = reqOpts.json.num_rcpt_errors;
        delete reqOpts.json.num_rcpt_errors;
      }

      return client.put(reqOpts).asCallback(callback);
    },
    delete: function(id, callback) {
      var reqOpts;

      if (!id || typeof id === 'function') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + id
      };
      return client.delete(reqOpts).asCallback(callback);
    }
  };

  return recipientLists;
};
