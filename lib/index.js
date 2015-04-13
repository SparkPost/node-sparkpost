'use strict';

var version  = require( '../package.json').version;
var url      = require('url');
var request  = require( 'request');
var _        = require( 'lodash' );

//REST API Config Defaults
var defaults = {
  host: 'api.sparkpost.com',
  protocol: 'https',
  port: '443',
  strictSSL: true,
  apiVersion: 'v1'
};

var resolveUri = function( origin, uri ) {
  if( !/^http/.test( uri ) ) {
    uri = url.resolve( origin, uri );
  }
  return uri;
};

var SparkPost = function(apiKey, options) {
  options = options || {};

  if (!apiKey) {
    if (process.env.SPARKPOST_API_KEY) {
      this.apiKey = process.env.SPARKPOST_API_KEY;
    }
    else {
      throw 'Client requires an API Key.';
    }
  } else {
    this.apiKey = apiKey;
  }

  // adding version to object
  this.version = version;

  // setting up default headers
  this.defaultHeaders = _.merge({
    'User-Agent': 'node-sparkpost/' + this.version
    , 'Content-Type': 'application/json'
  }, options.headers);

  //Optional client config
  this.protocol = options.protocol || defaults.protocol;
  this.host = options.host || defaults.host;
  this.port = options.port || defaults.port;
  this.strictSSL = typeof options.strictSSL !== 'undefined' ? options.strictSSL : defaults.strictSSL;
  this.apiVersion = options.apiVersion || defaults.apiVersion;

  this.sendingDomains = require('./sendingDomains')(this);
};

SparkPost.prototype.getBaseUrl = function () {
  var urlObj = {
    protocol: this.protocol
    , hostname: this.host
    , port: this.port
    , pathname: '/api/' + this.apiVersion + '/'
  };

  return url.format(urlObj);
};

SparkPost.prototype.request = function( options, callback ) {

  console.log(options.uri);
  // if we don't have a fully qualified URL let's make one
  options.uri = resolveUri( this.getBaseUrl(), options.uri );
  console.log(options.uri);

  // merge headers
  options.headers = _.merge( {}, this.defaultHeaders, options.headers );

  // add Authorization with API Key
  options.headers.Authorization = this.apiKey;

  // set Strict SSL
  options.strictSSL = typeof options.strictSSL === 'undefined' ? this.strictSSL : options.strictSSL;

  request( options, callback );
};

SparkPost.prototype.get = function( options, callback ) {
  options.method = 'GET';

  this.request( options, callback );
};

SparkPost.prototype.post = function( options, callback ) {
  options.method = 'POST';

  this.request( options, callback );
};

SparkPost.prototype.put = function( options, callback ) {
  options.method = 'PUT';

  this.request( options, callback );
};

SparkPost.prototype.delete = function( options, callback ) {
  options.method = 'DELETE';

  this.request( options, callback );
};

module.exports = SparkPost;
