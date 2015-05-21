'use strict';
var snaker = require('./snaker');

module.exports = function toApiFormatter(targetObj, callback) {
  var key
    , keys = Object.keys(targetObj)
    , i = keys.length
    , destObj = {}
    ;

  while(i--) {
    key = keys[i];
    destObj[snaker(key)] = targetObj[key];
  }

  callback(null, destObj);
};
