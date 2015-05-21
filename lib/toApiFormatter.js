'use strict';
var snaker = require('./snaker');

module.exports = function toApiFormatter(targetObj, callback) {
  if (typeof(targetObj) !== 'object') {
    callback(null, targetObj);
  }

  var key
    , keys = Object.keys(targetObj)
    , i = keys.length
    , destObj = {}
    , snakeKey
    ;

  while(i--) {
    key = keys[i];
    snakeKey = snaker(key);
    destObj[snakeKey] = targetObj[key];
  }

  callback(null, destObj);
};
