'use strict';
var _ = require('lodash');
var url = require('url');
var SparkPost = require('../sparkpost');

/**
 * SendGrid compatibility constructor
 * Responsible for taking the api key and config options and
 * translating them into a format compatible with SparkPost's
 * options.
 *
 * @param username: dropped SendGrid username string
 * @param apiKey: api key string
 * @param options: optional additional options object
 */
var sendgrid = function(username, apiKey, options) {
  options = options || {};
  var urlOpts = {
    protocol: options.protocol
    , hostname: options.host
    , port: options.port
  }
  , opts = {
    endpoint: url.format(urlOpts)
  };

  this.client = new SparkPost(apiKey, opts);
};

/**
 * Private Method for translating a user's SendGrid substitutions and sections
 * to a consolidated SparkPost substitutionData object
 *
 * @param payload: SendGrid formatted object or SendGrid Email object to
 * be translated into a SparkPost payload
 * @returns object: substitutionData object as per SparkPost payload format
 */
var consolidateSubstitutionData = function(payload) {
  var substitutionData = {};
  if (payload.sub !== undefined && payload.section !== undefined){
    substitutionData = _.merge(payload.sub, payload.section);
  } else if (payload.sub !== undefined){
    substitutionData = payload.sub;
  } else if (payload.section !== undefined){
    substitutionData = payload.section;
  }
  return substitutionData;
};

/**
 * Private Method for translating a user's SendGrid to and toname to a recipients
 * array that the transmissions "Class" can understand
 *
 * @param payload: SendGrid formatted object or SendGrid Email object to
 * be translated into a SparkPost payload
 * @returns array: recipients array as per SparkPost payload format
 */
var parseTo = function(payload){
  var recipients = [];
  if (typeof payload.to === 'string'){
    payload.to = [payload.to];
  }
  for (var i = 0; payload.to.length > i; i++){
    var to = {
      address: {
        email: payload.to[i]
      }
    };
    if (payload.toname !== undefined && payload.toname[i] !== undefined){
      to.address.name = payload.toname[i];
    }
    recipients.push(to);
  }
  return recipients;
};

/**
 * Private Method for translating a user's SendGrid payload to a format
 * that the transmissions "Class" can understand
 *
 * @param payload: SendGrid formatted object or SendGrid Email object to
 * be translated into a SparkPost payload
 * @returns object: translation from SendGrid payload to SparkPost payload
 */
var translatePayload = function(payload) {
  var sub = consolidateSubstitutionData(payload)
    , input = {
    recipients: [],
    from: '',
    html: '',
    text: '',
    subject: ''
  };

  if (payload.to !== undefined){
    input.recipients = parseTo(payload);
  }
  input.from = payload.from;
  if (payload.fromname !== undefined){
    input.from = input.from + ' <' + payload.fromname + '>';
  }
  input.subject = payload.subject;
  input.text = payload.text;
  input.html = payload.html;
  input.replyTo = payload.replyto;
  input.customHeaders = payload.headers;
  input.substitutionData = (Object.keys(sub).length > 0) ? sub : undefined;

  return input;
};

/**
 * An exposed function of SendGridCompatibility that calls upon
 * private helper methods to translate an Email or inline object
 * and then pass that content to the transmissions send function.
 *
 * @param payload: SendGrid formatted object or SendGrid Email object to
 * be translated into a SparkPost payload and sent
 */
sendgrid.prototype.send = function(payload, callback) {
  var translated = translatePayload(payload);
  this.client.transmissions.send({transmissionBody: translated }, callback);
};

sendgrid.prototype.Email = require('./Email');

module.exports = sendgrid;
