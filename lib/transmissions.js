'use strict';

var api = 'transmissions'
  , toApiFormat = require('./toApiFormat');

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
module.exports = function(client) {

  return {
    send: function (transmissionBody, callback) {

      if(typeof transmissionBody === 'function') {
        callback = transmissionBody;
        transmissionBody = null;
      }

      if(!transmissionBody) {
        callback(new Error('transmissionBody is required'));
        return;
      }

      var mappedInput = toApiFormat(transmissionBody);

      var options = {
        uri: api,
        json: mappedInput
      };

      client.post(options, callback);
    },
    all: function (callback) {
      var options = {
        uri: api
      };

      client.get(options, callback);
    },
    find: function (transmissionID, callback) {
      var options = {
        uri: api + '/' + transmissionID
      };

      if(typeof transmissionID === 'function') {
        callback = transmissionID;
        transmissionID = null;
      }

      if(!transmissionID) {
        callback(new Error('transmissionID is required'));
        return;
      }

      client.get(options, callback);
    }
  };

};
