'use strict';
var _ = require('lodash');

/**
 *  Singleton Module for sharing global configuration
 *  across multiple files/modules
 *
 *  The only required configuration value from a consumer is
 *  an API key provided in the field 'key'
 */
var Configuration = function () {
  this.defaults = {
    host: 'api.sparkpost.com',
    protocol: 'https',
    port: '443',
    strictSSL: true,
    key: '',
    version: 'v1'
  };
  this.options = {};
};

/**
 *  Method for setting globally applicable configuration values
 *
 *  @param value object Key-value pairs of global sdk configuration
 */
Configuration.prototype.setConfig = function(values) {

  if (typeof values === 'undefined' || values.hasOwnProperty('key') === false) {
    throw new Error('You must provide an API key');
  }

  this.options = _.merge(this.defaults, values);
};

module.exports = new Configuration();
