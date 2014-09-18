'use strict';

/**
 *  Singleton Module for sharing global configuration
 *  across multiple files/modules
 *
 *  The only required configuration value from a consumer is
 *  an API key provided in the field 'key'
 */
var Configuration = function () {
  this.defaults = {
    host: 'app.cloudplaceholder.com',
    schema: 'https',
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
  var config = {};

  if (typeof values === 'undefined' || values.hasOwnProperty('key') === false) {
    throw new Error('You must provide an API key');
  }

  for (var key in this.defaults) {
    config[key] = (typeof values[key] !== 'undefined' ? values[key] : this.defaults[key]);
  }

  this.options = config;
};

module.exports = new Configuration();
