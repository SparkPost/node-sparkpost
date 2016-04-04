'use strict';
var _ = require('lodash')
  , pointer = require('json-pointer');

var excludeList = [
  '/substitution_data',
  '/tags',
  '/metadata',
  '/attributes',
  '/headers',
  '/content/email_rfc822'
];

function snakedKeyClone(source) {

  if (!_.isObject(source)) {
    return source;
  }

  var target = {};

  if (Array.isArray(source)) {
    target = [];
    for (var i = 0; i < source.length; i++) {
      target.push(snakedKeyClone(source[i]));
    }
    return target;
  }

  Object.keys(source).forEach(function(key) {
    target[_.snakeCase(key)] = snakedKeyClone(source[key]);
  });

  return target;
}

module.exports = function toApiFormat(source) {

  var excludedObjects = {};

  // Look in the source object for the excluded pointers and take a copy of the
  // objects pointed to by those keys. Then remove them from the source object.
  excludeList.forEach(function(exclusionPointer) {
    if (pointer.has(source, exclusionPointer)) {
      pointer.set(excludedObjects, exclusionPointer, pointer.get(source, exclusionPointer));
      pointer.remove(source, exclusionPointer);
    }
  });

  // Make a clone of the remaining source object but with snaked case keys
  var target = snakedKeyClone(source);

  // Reinstated the un-modified objects into the target
  pointer.walk(excludedObjects, function(val, ptr) {
    pointer.set(target, ptr, val);
  });

  return target;
};
