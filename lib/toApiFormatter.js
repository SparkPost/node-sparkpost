'use strict';
var snaker = require('./snaker');

module.exports = function toApiFormatter(targetObj, callback) {
  if (typeof(targetObj) !== 'object' || typeof(targeObj) === 'string' || typeof(targetObj) === 'number' || typeof(targetObj) === 'boolean') {
    callback(null, targetObj);
  }

  var key
    , keys = Object.keys(targetObj)
    , i = keys.length
    , destObj = {}
    , snaked_key
    ;

  while(i--) {
    key = keys[i];
    if( key === (snaked_key = snaker(key))) {
      continue;
    }
    destObj[snaked_key] = toApiFormatter(targetObj[key], function(err, data) {
      destObj[snaked_key] = data;
    });
  }

  callback(null, destObj);
};
