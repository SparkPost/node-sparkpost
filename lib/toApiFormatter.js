/* jshint ignore:start */
'use strict';
var snaker = require('./snaker');
var _ = require('lodash');

module.exports = function toApiFormat(inObj, callback) {
  var output;

  try{
    // Handle Arrays
    if(_.isArray(inObj)) {
      output = [];
      for( var i = 0; i < inObj.length; i++ ) {
        output[i] = toApiFormat(inObj[i]);
      }
    } else if(_.isObject(inObj) && 'undefined' !== inObj.length) {
      output = {};
      for(var key in inObj) {
        output[snaker(key)] = inObj[key];
        if(_.isObject(inObj[key]) && inObj.hasOwnProperty(key)) {
          // Handle actual objects
          output[snaker(key)] = toApiFormat(inObj[key]);
        }
      }
    }
  } catch(e) {
    return callback(e);
  }

  // No errors return results
  if( !callback ) {
    return output;
  } else {
    return callback(null,output);
  }
};
/* jshint ignore:end */
