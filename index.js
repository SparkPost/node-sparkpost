'use strict';

var Transmission = require('./lib/transmission');
var config = require('./lib/configuration');

module.exports = function(globalOpts) {
  config.setConfig(globalOpts);

  return {
    transmission: Transmission
  };
};
