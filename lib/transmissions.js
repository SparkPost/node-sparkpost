'use strict';

const _ = require('lodash');
const api = 'transmissions';

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

      return client.get(reqOpts, callback);
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
        return client.reject(new Error('id is required'), callback);
      }

      const options = {
        uri: `${api}/${id}`
      };

      return client.get(options, callback);
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
      // Handle optional options argument
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (!transmission || typeof transmission !== 'object') {
        return client.reject(new Error('transmission object is required'), callback);
      }

      transmission = formatPayload(transmission);

      const reqOpts = {
        uri: api,
        json: transmission,
        qs: options
      };

      return client.post(reqOpts, callback);
    }
  };

};

function formatPayload(originalTransmission) {
  const transmission = _.cloneDeep(originalTransmission);

  // don't format the payload if we are not given an array of recipients
  if (!_.isArray(transmission.recipients)) {
    return transmission;
  }

  // format all the original recipients to be in the object format
  transmission.recipients = _.map(transmission.recipients, (recipient) => {
    recipient.address = addressToObject(recipient.address);

    return recipient;
  });

  // add the CC headers
  if (_.isArray(transmission.cc) && transmission.cc.length > 0) {
    _.set(transmission, 'content.headers.CC', generateCCHeader(transmission));
  }

  const headerTo = generateHeaderTo(transmission.recipients);

  transmission.recipients = addListToRecipients(transmission, 'cc', headerTo);
  transmission.recipients = addListToRecipients(transmission, 'bcc', headerTo);

  delete transmission.cc;
  delete transmission.bcc;

  return transmission;
}

function addListToRecipients(transmission, listName, headerTo) {
  if (!_.isArray(transmission[listName])) {
    return transmission.recipients;
  }

  return transmission.recipients.concat(_.map(transmission[listName], (recipient) => {
    recipient.address = addressToObject(recipient.address);

    recipient.address.header_to = headerTo;

    // remove name from address - name is only put in the header for cc and not at all for bcc
    if (_.has(recipient.address, 'name')) {
      delete recipient.address.name;
    }

    return recipient;
  }));
}

function generateCCHeader(transmission) {
  return _.map(transmission.cc, (ccRecipient) => addressToString(ccRecipient.address)).join(', ');
}

function generateHeaderTo(recipients) {
  // if a recipient has a header_to then it is cc'd or bcc'd and we don't want it in the header_to value
  const originalRecipients = _.filter(recipients, (recipient) => !_.has(recipient.address, 'header_to'));

  return _.map(originalRecipients, (recipient) => addressToString(recipient.address)).join(', ');
}

function addressToString(address) {
  if (_.isPlainObject(address)) {
    if (_.has(address, 'name')) {
      address = `"${address.name}" <${address.email}>`;
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

    const matches = /"?(.[^"]*)?"?\s*<(.+)>/gi.exec(address);

    if (matches) {
      addressObject.name = matches[1];
      addressObject.email = matches[2];
    } else {
      addressObject.email = address;
    }
  }

  return addressObject;
}
