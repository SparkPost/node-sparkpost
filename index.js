"use strict";

var Transmission = require('./lib/transmission');

module.exports = function(config) {
  return {
    transmission: new Transmission()
  };
};
