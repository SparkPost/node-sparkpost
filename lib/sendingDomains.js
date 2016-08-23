'use strict';

var api = 'sending-domains'
  , Promise = require('./Promise')
  , toApiFormat = require('./toApiFormat');

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

      if(typeof domain === 'function') {
        callback = domain;
        domain = null;
      }

      if(!domain) {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain
      };
      return client.get(options).asCallback(callback);
    },
    create: function(domainBody, callback) {
      var options;

      if(typeof domainBody === 'function') {
        callback = domainBody;
        domainBody = null;
      }

      if(!domainBody) {
        return Promise.reject(new Error('domainBody is required')).asCallback(callback);
      }

      if(!domainBody.domain) {
        return Promise.reject(new Error('domain is required in the domainBody')).asCallback(callback);
      }

      options = {
        uri: api
        , json: toApiFormat(domainBody)
      };
      return client.post(options).asCallback(callback);
    },
    update: function(domainBody, callback) {
      var obj, options;

      if(typeof domainBody === 'function') {
        callback = domainBody;
        domainBody = null;
      }

      if(!domainBody) {
        return Promise.reject(new Error('domainBody is required')).asCallback(callback);
      }

      if(!domainBody.domain) {
        return Promise.reject(new Error('domain is required in the domainBody')).asCallback(callback);
      }

      obj = toApiFormat(domainBody);
      options = {
        uri: api + '/' + obj.domain
        , json: toApiFormat(domainBody)
      };
      return client.put(options).asCallback(callback);
    },
    delete: function(domain, callback) {
      var options;

      if (typeof domain === 'function') {
        callback = domain;
        domain = null;
      }

      if (!domain) {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      options = {
        uri: api + '/' + domain
      };
      return client.delete(options).asCallback(callback);
    },
    verify: function(options, callback) {
      var reqOpts;
      options = options || {};

      if(!options.domain) {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      reqOpts = {
        uri: api + '/' + options.domain + '/verify',
        json: {
          dkim_verify: options.verifyDKIM !== false,
          spf_verify: options.verifySPF !== false
        }
      };

      return client.post(reqOpts).asCallback(callback);
    }
  };

  return sendingDomains;
};
