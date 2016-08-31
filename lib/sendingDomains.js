'use strict';

let Promise = require('./Promise');
const api = 'sending-domains';

/*
 * "Class" declaration, Sending Domains API exposes five functions:
 * - create: creates a new sending domain
 * - update: updates an existing sending domain
 * - delete: deletes an existing sending domain
 * - verify: validates specified verification field types on a sending domain
 * - all: retreives a list of sending domains
 * - find: retreives info about a specific sending domain
 */
module.exports = function(client) {

  var sendingDomains = {
    all: function(callback) { //list
      var options = {
        uri: api
      };
      return client.get(options).asCallback(callback);
    },
    find: function(domain, callback) { //retrieve
      var options;

      if(!domain || typeof domain === 'function') {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain
      };
      return client.get(options).asCallback(callback);
    },
    create: function(sendingDomain, callback) {
      var options;

      if(!sendingDomain || typeof sendingDomain === 'function') {
        return Promise.reject(new Error('sending domain is required')).asCallback(callback);
      }

      options = {
        uri: api
        , json: sendingDomain
      };
      return client.post(options).asCallback(callback);
    },
    update: function(sendingDomain, callback) {
      var options;

      if(!sendingDomain || typeof sendingDomain === 'function') {
        return Promise.reject(new Error('sending domain is required')).asCallback(callback);
      }

      if(!sendingDomain.domain) {
        return Promise.reject(new Error('sendingDomain.domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + sendingDomain.domain
        , json: sendingDomain
      };
      return client.put(options).asCallback(callback);
    },
    delete: function(domain, callback) {
      var options;

      if (!domain || typeof domain === 'function') {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain
      };
      return client.delete(options).asCallback(callback);
    },
    verify: function(options, callback) {
      var reqOpts;

      if(!options || !options.domain) {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.domain + '/verify',
        json: options
      };

      delete options.domain;

      return client.post(reqOpts).asCallback(callback);
    }
  };

  return sendingDomains;
};
