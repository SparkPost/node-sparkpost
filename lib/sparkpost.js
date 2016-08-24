'use strict';

var version = require('../package.json').version
  , url = require('url')
  , Promise = require('./Promise')
  , request = require('request')
  , _ = require('lodash')
  , defaults, resolveUri, handleOptions, createSparkPostError, SparkPost;

//REST API Config Defaults
defaults = {
  origin: 'https://api.sparkpost.com:443',
  apiVersion: 'v1'
};

resolveUri = function(origin, uri) {
  if(!/^http/.test(uri)) {
    uri = url.resolve(origin, uri);
  }
  return uri;
};

handleOptions = function(apiKey, options) {
  if (typeof apiKey === 'object') {
    options = apiKey;
    options.key = process.env.SPARKPOST_API_KEY;
  } else {
    options = options || {};
    options.key = apiKey;
  }

  options.origin = options.origin || options.endpoint || defaults.origin;

  return options;
};

createSparkPostError = function(res, body) {
  var err = new Error(res.statusMessage);
  body = body || {};
  err.name = 'SparkPostError';
  err.errors = body.errors;
  err.statusCode = res.statusCode;

  return err;
};

SparkPost = function(apiKey, options) {

  options = handleOptions(apiKey, options);

  this.apiKey = options.key || process.env.SPARKPOST_API_KEY;

  if(typeof this.apiKey === 'undefined') {
    throw new Error('Client requires an API Key.');
  }

  // adding version to object
  this.version = version;

  // setting up default headers
  this.defaultHeaders = _.merge({
    'User-Agent': 'node-sparkpost/' + this.version
    , 'Content-Type': 'application/json'
  }, options.headers);

  //Optional client config
  this.origin = options.origin;
  this.apiVersion = options.apiVersion || defaults.apiVersion;

  this.inboundDomains = require('./inboundDomains')(this);
  this.messageEvents = require('./messageEvents')(this);
  this.recipientLists = require('./recipientLists')(this);
  this.relayWebhooks = require('./relayWebhooks')(this);
  this.sendingDomains = require('./sendingDomains')(this);
  this.subaccounts = require('./subaccounts')(this);
  this.suppressionList = require('./suppressionList')(this);
  this.templates = require('./templates')(this);
  this.transmissions = require('./transmissions')(this);
  this.webhooks = require('./webhooks')(this);
};

SparkPost.prototype.request = function(options, callback) {
  var baseUrl;

  // we need options
  if(!_.isPlainObject(options)) {
    throw new TypeError('options argument is required');
  }

  baseUrl = this.origin + '/api/' + this.apiVersion + '/';

  // if we don't have a fully qualified URL let's make one
  options.uri = resolveUri(baseUrl, options.uri);

  // merge headers
  options.headers = _.merge({}, this.defaultHeaders, options.headers);

  // add Authorization with API Key
  options.headers.Authorization = this.apiKey;

  // set Strict SSL (Always true)
  options.strictSSL = true;

  // set JSON (Always true)
  options.json = true;

  // default to accepting gzipped responses
  if (typeof options.gzip === 'undefined') {
    options.gzip = true;
  }

  return new Promise(function(resolve, reject) {
    request(options, function(err, res, body) {
      var invalidCodeRegex = /(5|4)[0-9]{2}/
        , response;

      if (err) {
        reject(err);
      } else if (invalidCodeRegex.test(res.statusCode)) {
        err = createSparkPostError(res, body);
        reject(err);
      } else {
        response = body.results || body;
        if (options.debug) {
          response.debug = res;
        }
        resolve(response);
      }
    });
  }).asCallback(callback);
};

SparkPost.prototype.get = function(options, callback) {
  options.method = 'GET';

  return this.request(options).asCallback(callback);
};

SparkPost.prototype.post = function(options, callback) {
  options.method = 'POST';

  return this.request(options).asCallback(callback);
};

SparkPost.prototype.put = function(options, callback) {
  options.method = 'PUT';

  return this.request(options).asCallback(callback);
};

SparkPost.prototype.delete = function(options, callback) {
  options.method = 'DELETE';

  return this.request(options).asCallback(callback);
};

module.exports = SparkPost;
