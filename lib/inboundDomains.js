'use strict';

var api = 'inbound-domains'
  /* global -Promise */
  , Promise = require('bluebird');

module.exports = function(client) {
  var inboundDomains = {
    all: function(callback) {
      var options = {
        uri: api
      };
      return client.get(options).asCallback(callback);
    },
    find: function(domain, callback) {
      if(typeof domain === 'function') {
        callback = domain;
        domain = null;
      }

      if(!domain) {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + domain
      };
      return client.get(options).asCallback(callback);
    },
    create: function(domain, callback) {
      if(typeof domain === 'function') {
        callback = domain;
        domain = null;
      }

      if(!domain) {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      var options = {
        uri: api
        , json: {
          domain: domain
        }
      };
      return client.post(options, callback).asCallback(callback);
    },
    delete: function(domain, callback) {
      if (typeof domain === 'function') {
        callback = domain;
        domain = null;
      }

      if (!domain) {
        return Promise.reject(new Error('domain is required')).asCallback(callback);
      }

      var options = {
        uri: api + '/' + domain
      };
      return client.delete(options).asCallback(callback);
    }
  };

  return inboundDomains;
};
