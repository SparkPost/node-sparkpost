'use strict';

var request = require('request')
  , config = require('./configuration');

/**
 * Private Method for migrating the flat user input into
 * a format that the Sending Domains REST API expects
 *
 * This method does not perform any validation of the user's input, we
 * rely on the API to return appropriate errors for all the weird combinations
 * of things, like you can't specify rfc822 content and then specify html/plaintext
 *
 * @param input object Flat object of configuration for the sending domain to be sent
 * @returns object
 */
var toApiFormat = function(input) {
  var model = {
    dkim: {}
  };

  model.domain = input.domainName;
  model.dkim['private'] = input.privateKey;
  model.dkim['public'] = input.publicKey;
  model.dkim.selector = input.selector;
  model.dkim.headers = input.headers;

  return model;
};

/**
 * Private Method for putting URL construction logic into one place
 *
 * @returns string Fully constructed URL for contacting the Sending Domains API
 */
var constructURL = function () {
  return config.options.protocol + '://' + config.options.host + (config.options.port ? ':' + config.options.port: '') + '/api/' + config.options.version + '/sending-domains';
};

/**
 *  Private Method for issuing GET request to Sending Domains API
 *
 *  This method is responsible for getting the collection _and_
 *  a specific entity from the Sending Domains API
 *
 *  If DomainName parameter is omitted, then we fetch the collection
 *
 *  @param DomainName string Domain Name of specific Sending Domain to retrieve
 *  @param callback function
 */
var fetch = function(domainName, callback) {
  var cb = callback
    , options = {
      url: constructURL(),
      headers: {
        authorization: config.options.key
      },
      strictSSL: config.options.strictSSL
    };

  /*
   * Check that someone passed in a real Domain Name, if not,
   * then the domainName parameter is acutally our callback
   */
  if (typeof domainName !== 'function' && typeof domainName !== undefined) {
    options.url = options.url + '/' + domainName;
  } else {
    cb = domainName;
  }

  // Fetch, Fido, Fetch! (We may want to abstract the actual HTTP requests in a helper when we have more libs)
  request.get(options, function(err, res, body) {
    if (err) {
      cb(new Error('Unable to contact Sending Domains API: ' + err));
    } else if (res.statusCode === 404) {
      cb(new Error('The specified Domain Name does not exist'));
    } else if (res.statusCode !== 200) {
      cb(new Error('Received bad response from Sending Domains API: ' + res.statusCode));
    } else {
      cb(null, body);
    }
  });
};

/**
 *  Private Method for issuing POST/PUT request to Sending Domains API
 *
 *  This method is responsible for creating and updating a specific entity
 *  from the Sending Domains API
 *
 *  @param options object Object containing domain body to create/update and update flag
 *  @param callback function
 */
var write = function(options, callback) {
  var reqOpts = {
    url: constructURL() + (options.update ? '/' + options.domainBody.domainName : ''),
    json: toApiFormat(options.domainBody),
    headers: {
      authorization: config.options.key
    },
    strictSSL: config.options.strictSSL
  };

  var reqCallback = function(err, res, body) {
    if (err) {
      callback(err);
    } else if (res.statusCode !== 200) {
      callback(res.body.errors);
    } else {
      callback(null, body);
    }
  };

  if (options.update) {
    request.put(reqOpts, reqCallback);
  } else {
    request.post(reqOpts, reqCallback);
  }

};

/*
 * "Class" declaration, Sending Domains API exposes five functions:
 * - create: creates a new sending domain
 * - update: updates an existing sending domain
 * - verify: validates specified verification field types on a sending domain
 * - all: retreives a list of sending domains
 * - find: retreives info about a specific sending domain
 */
module.exports = {
  find: function(domainName, callback) { //retrieve
    fetch(domainName, callback);
  },
  all: function(callback) { //list
    fetch(callback);
  },
  create: function(domainBody, callback) {
    write({domainBody: domainBody}, callback);
  },
  update: function(domainBody, callback) {
    write({domainBody: domainBody, update: true}, callback);
  },
  verify: function(domainName, options, callback) {
    var cb = callback;
    var payload = {
      dkim_verify: true,
      spf_verify: true
    };

    if (typeof options !== 'function' && typeof options !== undefined) {
      payload.dkim_verify = options.verifyDKIM === false ? false : true;
      payload.spf_verify = options.verifySPF === false ? false : true;
    } else {
      cb = options;
    }

    var reqOpts = {
      url: constructURL() + '/' + domainName + '/verify',
      json: payload,
      headers: {
        authorization: config.options.key
      },
      strictSSL: config.options.strictSSL
    };

    request.post(reqOpts, function(err, res, body) {
      if (err) {
        cb(err);
      } else if (res.statusCode !== 200) {
        cb(res.body.errors);
      } else {
        cb(null, body);
      }
    });
  }
};
