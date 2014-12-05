'use strict';

var transmission = require('../transmission');
var configuration = require('../configuration');

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

var mergeObjects = function(obj1, obj2){
  var merged = {};
  for (var key1 in obj1) {
    merged[key1] = obj1[key1];
  }
  for (var key2 in obj2) {
    merged[key2] = obj2[key2];
  }
  return merged;
};

var consolidateSubstitutionData = function(payload) {
  var substitutionData = {};
  if (payload.sub !== undefined && payload.section !== undefined){
    substitutionData = mergeObjects(payload.sub, payload.section);
  } else if (payload.sub !== undefined){
    substitutionData = payload.sub;
  } else if (payload.section !== undefined){
    substitutionData = payload.section;
  }
  return substitutionData;
};

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
