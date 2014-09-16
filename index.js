"use strict";

module.exports = function(config) {
  return {
    transmission: require('./lib/transmission')()
  };
};
