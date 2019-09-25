'use strict';

let api = 'events';

/*
 * "Class" declaration, Events API exposes one function:
 * - search: retrieves list of events according to given params
 */
module.exports = function(client) {

  function search(parameters, callback) {
    const options = {
      uri: api
      , qs: {}
    };

    Object.keys(parameters).forEach(function(paramname) {
      if (Array.isArray(parameters[paramname])) {
        options.qs[paramname] = parameters[paramname].join(',');
      } else {
        options.qs[paramname] = parameters[paramname];
      }
    });
    return client.get(options, callback);
  }

  return {
    message: {
      search: function(parameters, callback) {
        api += '/message';
        return search(parameters, callback);
      }
    },
    ingest: {
      search: function(parameters, callback) {
        api += '/ingest';
        return search(parameters, callback);
      }
    }
  };
};
