'use strict';

/**
 * withCallback handles an optional nodeback
 * and return the promise object
 *
 * @param promise {Promise}
 * @param cb {Function}
 * @return Promise
 *
 * @example
 * function eitherOr(options, callback) {
 *   return withCallback(promiseThingy(options), callback);
 * }
 */

function withCallback(promise, cb) {
  if (typeof cb !== 'function') {
    cb = noop;
  }

  promise.then((result) => {
    cb(null, result);
  }).catch((err) => {
    cb(err);
  });

  return promise;
}

function noop() {}

module.exports = withCallback;
