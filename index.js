'use strict';

var Transmission = require('./lib/transmission');

module.exports = function() {
  return {
    transmission: Transmission
  };
};
