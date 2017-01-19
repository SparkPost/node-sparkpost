'use strict';

const version = require('../package.json').version;
const url = require('url');
const withCallback = require('./withCallback');
const request = require('request');
const _ = require('lodash');

//REST API Config Defaults
const defaults = {
  origin: 'https://api.sparkpost.com:443',
  apiVersion: 'v1',
  debug: false
};

const resolveUri = function(origin, uri) {
  if (!/^http/.test(uri)) {
    uri = url.resolve(origin, uri);
  }
  return uri;
};

const handleOptions = function(apiKey, options) {
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

const createSparkPostError = function(res, body) {
  const err = new Error(res.statusMessage);
  body = body || {};
  err.name = 'SparkPostError';
  err.errors = body.errors;
  err.statusCode = res.statusCode;

  return err;
};

const createVersionStr = function(version, options) {
  let versionStr = `node-sparkpost/${version} node.js/${process.version}`;
  if (options.stackIdentity) {
    versionStr += `${options.stackIdentity} ${versionStr}`;
  }
  return versionStr;
};

const SparkPost = function(apiKey, options) {

  options = handleOptions(apiKey, options);

  this.apiKey = options.key || process.env.SPARKPOST_API_KEY;

  if (typeof this.apiKey === 'undefined') {
    throw new Error('Client requires an API Key.');
  }

  // adding version to object
  this.version = version;

  // setting up default headers
  this.defaultHeaders = _.merge({
    'User-Agent': createVersionStr(version, options)
    , 'Content-Type': 'application/json'
  }, options.headers);

  //Optional client config
  this.origin = options.origin;
  this.apiVersion = options.apiVersion || defaults.apiVersion;
  this.debug = (typeof options.debug === 'boolean') ? options.debug : defaults.debug;

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
  const baseUrl = `${this.origin}/api/${this.apiVersion}/`;

  // we need options
  if (!_.isPlainObject(options)) {
    throw new TypeError('options argument is required');
  }

  // if we don't have a fully qualified URL let's make one
  options.uri = resolveUri(baseUrl, options.uri);

  // merge headers
  options.headers = _.merge({}, this.defaultHeaders, options.headers);

  // add Authorization with API Key
  options.headers.Authorization = this.apiKey;

  // set Strict SSL (Always true)
  options.strictSSL = true;

  // default to accepting gzipped responses
  if (typeof options.gzip === 'undefined') {
    options.gzip = true;
  }

  // set debug
  options.debug = (typeof options.debug === 'boolean') ? options.debug : this.debug;

  return withCallback(new Promise(function(resolve, reject) {
    request(options, function(err, res, body) {
      const invalidCodeRegex = /(5|4)[0-9]{2}/;
      let response;

      if (err) {
        reject(err);
      } else if (invalidCodeRegex.test(res.statusCode)) {
        err = createSparkPostError(res, body);
        reject(err);
      } else {
        response = body;
        if (options.debug) {
          response.debug = res;
        }
        resolve(response);
      }
    });
  }), callback);
};

SparkPost.prototype.get = function(options, callback) {
  options.method = 'GET';
  options.json = true;

  return this.request(options, callback);
};

SparkPost.prototype.post = function(options, callback) {
  options.method = 'POST';

  return this.request(options, callback);
};

SparkPost.prototype.put = function(options, callback) {
  options.method = 'PUT';

  return this.request(options, callback);
};

SparkPost.prototype.delete = function(options, callback) {
  options.method = 'DELETE';

  return this.request(options, callback);
};

SparkPost.prototype.reject = function(error, callback) {
  return withCallback(Promise.reject(error), callback);
};

module.exports = SparkPost;

/**
 * Standard error-first callback for HTTP requests

 * @callback RequestCb
 * @param {Error} err - Any error that occurred
 * @param {Object} [data] - API response body (or just the value of `body.results`, if it exists)
 */
