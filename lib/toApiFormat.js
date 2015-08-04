'use strict';
var _ = require('lodash');

module.exports = function toApiFormat(source) {

  var dest = {};
  // List of property names which we do not want to modify the sub-property names
  var excludeList = ['substitution_data', 'tags', 'metadata', 'attributes', 'headers'];

  try{
    // Handle arrays (Only need to handle arrays of objects for our use case.)
    if(Array.isArray(source) && _.isPlainObject(source[0])) {
      dest = [];
      for(var i = 0; i < source.length; i++) {
        // Exclude appropriately
        /*if( -1 === excludeList.indexOf(source[i])) {
          dest.push(toApiFormat(source[i]));
        } else {
          dest.push(source[i]);
        }*/
        dest.push(toApiFormat(source[i]));
      }
      return dest;
    }

    // Handle objects
    Object.keys(source).forEach(function(key) {

      // Cache snake_cased keys
      var snakedKey = _.snakeCase(key);

      // Exclude appropriately
      if( -1 === excludeList.indexOf(key)) {
        dest[snakedKey] = source[key];
        if( _.isObject (source[key] ) ) {
          dest[snakedKey] = toApiFormat(source[key]);
        }
      } else {
        dest[snakedKey] = source[key];
      }
    });
  } catch(e) {
    // Errors
    return e;
  }
  // No errors return results
  return dest;
};
