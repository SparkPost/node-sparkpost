'use strict';

/**
 * asCallback method mimics bluebird and allows
 * promise object to handle an optional nodeback
 *
 * @param cb {Function}
 * @return Promise
 *
 * @example
 * function eitherOr(options, callback) {
 *   return promiseThingy(options).asCallback(callback);
 * }
 */
Promise.prototype.asCallback = function(cb) {
  if (typeof cb !== 'function') {
    cb = noop;
  }

  return this.then((result) => {
    cb(null, result);
    return this;
  }).catch((err) => {
    cb(err);
    return this;
  });
};

function noop() {}

module.exports = Promise;
