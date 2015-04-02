'use strict';
var _ = require('lodash');
var transmission = require('../transmission');
var configuration = require('../configuration');

/**
 * SendGrid compatibility constructor
 * Responsible for taking the api key and config options and
 * translating them into a format compatible with SparkPost's
 * configuration.setConfig function.
 *
 * @param username: dropped SendGrid username string
 * @param apiKey: api key string
 * @param options: optional additional options object
 */
var sendgrid = function(username, apiKey, options) {
  var configOptions = options;
  if (configOptions === undefined) {
    configOptions = {key: apiKey};
  } else {
    configOptions = translateConfig(options);
    configOptions.key = apiKey;
  }
  configuration.setConfig(configOptions);
};

/**
 * Private Method for translating a user's SendGrid config options
 * to a SparkPost compatible set by dropping unnecessary data
 *
 * @param payload: SendGrid formatted config options object
 * @returns object: config options with incompatible entries removed
 */
var translateConfig = function(options) {
  var translated = {};
  if (options.host !== undefined) {
    translated.host = options.host;
  }
  if (options.protocol !== undefined) {
    translated.protocol = options.protocol;
  }
  if (options.port !== undefined) {
    translated.port = options.port;
  }
  return translated;
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
  transmission.send(translated, function (err, res){
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

sendgrid.prototype.Email = require('./Email');

module.exports = sendgrid;