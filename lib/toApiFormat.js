'use strict';
var _ = require('lodash');

module.exports = function toApiFormat(source) {
  var dest;
  var excludeList = ['recipients', 'substitution_data', 'tags', 'metadata', 'content', 'attributes', 'headers'];

  for(var prop in source) {
    var excluded = excludeList.indexOf(prop);
    var enumerable = Object.propertyIsEnumerable(prop);
    var hasProp = source.hasOwnProperty(prop);
    if(-1 === excluded && enumerable && hasProp) {
      dest[_.snakeCase(prop)] = toApiFormat(source[prop]);
    } else {
      dest[_.snakeCase(prop)] = source[prop];
    }
  }

  /*
  Object.keys(source).forEach(function(key) {
    if(_.isObject(source[key]) && source.hasOwnProperty(key) && -1 === excludeList.indexOf(key)) {
      dest[_.snakeCase(key)] = toApiFormat(source[key]);
    }
  });

  sourceKeys.forEach(function(key) {
    // Prevent munging keys that are important to customer requests
    if(-1 === excludedKeyList(key)) {
      // Map to new object with approprately cased key
      dest[_.snakeCase(key)] = source[key];
      // If the value is an object, recurse
      if(_.isObject(source[key]) && source.hasOwnProperty(key)) {
        dest[_.snakeCase(key)] = toApiFormat(source[key]);
      }
      // If the value is an array, and the array's
      // first child is an object, recurse children
      if(_.isArray(source[key]) && _.isObject(source[key][0])) {
        
      }
    }
  });

  try{
    // Handle Arrays
    if(_.isArray(source) && _.isObject(source[0])) {
      dest = [];
      for( var i = 0; i < source.length; i++ ) {
        dest[i] = toApiFormat(source[i]);
      }
    } else if(_.isObject(source) && 'undefined' !== source.length) {
      dest = {};
      for(var key in source) {
        dest[_.snakeCase(key)] = source[key];
        if(_.isObject(source[key]) && source.hasOwnProperty(key)) {
          // Handle actual objects
          dest[_.snakeCase(key)] = toApiFormat(source[key]);
        }
      }
    }
  } catch(e) {
    return e;
  }
  */

  // No errors return results
  return dest;
};
