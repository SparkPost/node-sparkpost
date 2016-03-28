'use strict';

var api = 'inbound-domains'
  , toApiFormat = require('./toApiFormat');

module.exports = function(client) {
  var inboundDomains = {
    all: function(callback) {
      var options = {
        uri: api
      };
      client.get(options, callback);
    },
    find: function(domain, callback) {
      if(typeof domain === 'function') {
        callback = domain;
        domain = null;
      }

      if(!domain) {
        callback(new Error('domain is required'));
        return;
      }

      var options = {
        uri: api + '/' + domain
      };
      client.get(options, callback);
    },
    create: function(domain, callback) {
      if(typeof domain === 'function') {
        callback = domain;
        domain = null;
      }

      if(!domain) {
        callback(new Error('domain is required'));
        return;
      }

      var options = {
        uri: api
        , json: toApiFormat(domain)
      };
      client.post(options, callback);
    },
    delete: function(domain, callback) {
      if (typeof domain === 'function') {
        callback = domain;
        domain = null;
      }

      if (!domain) {
        callback(new Error('domain is required'));
        return;
      }

      var options = {
        uri: api + '/' + domain
      };
      client.delete(options, callback);
    }
  };

  return inboundDomains;
};
