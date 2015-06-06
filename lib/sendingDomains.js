'use strict';

var api = 'sending-domains'
  , toApiFormat = require('./toApiFormat');

/*
 * "Class" declaration, Sending Domains API exposes five functions:
 * - create: creates a new sending domain
 * - update: updates an existing sending domain
 * - verify: validates specified verification field types on a sending domain
 * - all: retreives a list of sending domains
 * - find: retreives info about a specific sending domain
 */
module.exports = function (client) {

  return {
    all: function (callback) { //list
      var options = {
        uri: api
      };
      client.get(options, callback);
    },
    find: function (domain, callback) { //retrieve
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
    create: function (domainBody, callback) {
      if(typeof domainBody === 'function') {
        callback = domainBody;
        domainBody = null;
      }

      if(!domainBody) {
        callback(new Error('domainBody is required'));
        return;
      }

      if(!domainBody.domain) {
        callback(new Error('domain is required in the domainBody'));
        return;
      }

      var options = {
        uri: api
        , json: toApiFormat(domainBody)
      };
      client.post(options, callback);
    },
    update: function (domainBody, callback) {
      if(typeof domainBody === 'function') {
        callback = domainBody;
        domainBody = null;
      }

      if(!domainBody) {
        callback(new Error('domainBody is required'));
        return;
      }

      if(!domainBody.domain) {
        callback(new Error('domain is required in the domainBody'));
        return;
      }

      var obj = toApiFormat(domainBody);
      console.log( obj );
      var options = {
        uri: api + '/' + obj.domain
        , json: toApiFormat(domainBody)
      };
      client.put(options, callback);
    },
    verify: function (options, callback) {
      options = options || {};

      if(!options.domain) {
        callback(new Error('domain is required'));
        return;
      }

      var reqOpts = {
        uri: api + '/' + options.domain + '/verify',
        json: {
          dkim_verify: options.verifyDKIM !== false,
          spf_verify: options.verifySPF !== false
        }
      };

      client.post(reqOpts, callback);
    }
  };
};
