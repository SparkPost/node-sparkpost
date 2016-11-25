'use strict';

const _ = require('lodash');
const api = 'transmissions';
const Promise = require('./Promise');

/*
 * "Class" declaration, Transmissions exposes three functions, one for sending a transmission,
 * another for getting a list of transmissions that have been sent, and another for getting
 * info about a specific transmission
 */
module.exports = function(client) {

  return {
    /**
     * List an overview of all transmissions in the account
     *
     * @param {Object} options
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    list: function(options, callback) {
      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      const reqOpts = {
        uri: api,
        qs: options
      };

      return client.get(reqOpts).asCallback(callback);
    },
    /**
     * Retrieve the details about a transmission by its id
     *
     * @param {String} id
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    get: function(id, callback) {
      if (typeof id !== 'string') {
        return Promise.reject(new Error('id is required')).asCallback(callback);
      }

      const options = {
        uri: `${api}/${id}`
      };

      return client.get(options).asCallback(callback);
    },
    /**
     * Sends a message by creating a new transmission
     *
     * @param {Object} transmission
     * @param {Object} options
     * @param {RequestCb} [callback]
     * @returns {Promise}
     */
    send: function(transmission, options, callback) {

      let modifiedTransmission = _.cloneDeep(transmission);

      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!transmission || typeof transmission !== 'object') {
        return Promise.reject(new Error('transmission object is required')).asCallback(callback);
      }

      // format the payload if we are given an array of recipients
      if (_.has(modifiedTransmission, 'recipients') &&
          _.isArray(modifiedTransmission.recipients) &&
          !_.has(modifiedTransmission.recipients[0], 'list_id')) {
        formatPayload(modifiedTransmission);
      }

      const reqOpts = {
        uri: api,
        json: modifiedTransmission,
        qs: options
      };

      return client.post(reqOpts).asCallback(callback);
    }
  };

};

function formatPayload(transmission) {
  // format all the original recipients to be in the object format
  transmission.recipients = _.map(transmission.recipients, (recipient) => {
    recipient.address = addressToObject(recipient.address);

    return recipient;
  });

  // add the CC headers
  if (_.has(transmission, 'cc') && _.isArray(transmission.cc)) {
    addCCHeader(transmission);
  }

  addListToRecipients(transmission, 'cc');
  addListToRecipients(transmission, 'bcc');

  return transmission;
}

function addListToRecipients(transmission, listName) {
  if (_.has(transmission, listName) && _.isArray(transmission[listName])) {
    let headerTo = generateHeaderTo(transmission.recipients)
      , list = transmission[listName];

    transmission.recipients = transmission.recipients.concat(_.map(list, (recipient) => {
      recipient.address = addressToObject(recipient.address);

      recipient.address.header_to = headerTo;

      // remove name from address - name is only put in the header for cc and not at all for bcc
      if (_.has(recipient.address, 'name')) {
        delete recipient.address.name;
      }

      return recipient;
    }));

    delete transmission[listName];
  }
}

function addCCHeader(transmission) {
  // default the headers to a blank object
  transmission.content.headers = transmission.content.headers || {};

  transmission.content.headers.CC = _.map(transmission.cc, (ccRecipient) => {
    return addressToString(ccRecipient.address);
  }).join(', ');
}

function generateHeaderTo(recipients) {
  let originalRecipients = _.filter(recipients, (recipient) => {
    return !_.has(recipient.address, 'header_to');
  });

  return _.map(originalRecipients, (recipient) => {
    return addressToString(recipient.address);
  }).join(', ');
}

function addressToString(address) {
  if (!_.isString(address)) {
    if (_.has(address, 'name')) {
      address = '"' + address.name + '" <' + address.email + '>';
    } else {
      address = address.email;
    }
  }

  return address;
}

function addressToObject(address) {
  let addressObject = address;

  if (_.isString(address)) {
    addressObject = {};

    if (isEmail(address)) {
      addressObject.email = address;
    } else {
      let matches = /"?(.[^"]*)?"?\s*<(.+)>/gi.exec(address);

      if (matches) {
        addressObject.name = matches[1];
        addressObject.email = matches[2];
      } else {
        throw new Error('Invalid address format: ' + address);
      }
    }
  }

  return addressObject;
}

function isEmail(email) {
  let emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  return emailRegex.test(email);
}
