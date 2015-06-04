'use strict';

var version = require( '../package.json').version
  , url = require('url')
  , request = require( 'request')
  , _ = require( 'lodash' );

//REST API Config Defaults
var defaults = {
  origin: 'https://api.sparkpost.com:443',
  apiVersion: 'v1'
};

var resolveUri = function(origin, uri) {
  if(!/^http/.test(uri)) {
    uri = url.resolve(origin, uri);
  }
  return uri;
};

var handleOptions = function(apiKey, options) {
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

var SparkPost = function(apiKey, options) {

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

  this.recipientLists = require('./recipientLists')(this);
  this.sendingDomains = require('./sendingDomains')(this);
  this.suppressionList = require('./suppressionList')(this);
  this.templates = require('./templates')(this);
  this.transmissions = require('./transmissions')(this);
  this.webhooks = require('./webhooks')(this);
};

SparkPost.prototype.request = function( options, callback ) {

  // we need options
  if(!_.isPlainObject(options)) {
    throw new TypeError( 'options argument is required' );
  }

  var baseUrl = this.origin + '/api/' + this.apiVersion + '/';

  // if we don't have a fully qualified URL let's make one
  options.uri = resolveUri( baseUrl, options.uri );

  // merge headers
  options.headers = _.merge({}, this.defaultHeaders, options.headers);

  // add Authorization with API Key
  options.headers.Authorization = this.apiKey;

  // set Strict SSL (Always true)
  options.strictSSL = true;

  request(options, function(err, res, body) {
    var invalidCodeRegex = /(5|4)[0-9]{2}/;
    if(err) {
      return callback(err, res);
    } else if(invalidCodeRegex.test(res.statusCode)) {
      err = new Error(res.statusMessage);
      err.name = 'SparkPostError';
      err.errors = body.errors;
      err.statusCode = res.statusCode;
      return callback(err, res);
    } else {
      return callback(null, res);
    }
  });
};

SparkPost.prototype.get = function( options, callback ) {
  options.method = 'GET';

  this.request(options, callback);
};

SparkPost.prototype.post = function( options, callback ) {
  options.method = 'POST';

  this.request(options, callback);
};

SparkPost.prototype.put = function( options, callback ) {
  options.method = 'PUT';

  this.request(options, callback);
};

SparkPost.prototype['delete'] = function( options, callback ) {
  options.method = 'DELETE';

  this.request(options, callback);
};

SparkPost.SendGridCompatibility = require('./SendGridCompatibility');

module.exports = SparkPost;
