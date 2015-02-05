'use strict';

var SendingDomains = require('./lib/sendingDomains');
var Transmission = require('./lib/transmission');
var config = require('./lib/configuration');

module.exports = function(globalOpts) {
  config.setConfig(globalOpts);

  return {
    sendingDomains: SendingDomains,
    transmission: Transmission
  };
};

module.exports.SendGridCompatibility = require('./lib/SendGridCompatibility');
