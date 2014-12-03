'use strict';

var transmission = require('../transmission');
var configuration = require('../configuration');

var sendgrid = function(username, key, options) {
  var configOptions = options;
  if (configOptions === undefined) {
    configOptions = {'key': key};
  } else {
    configOptions['key'] = key;
  }
  configuration.setConfig(configOptions);
};

var translatePayload = function(payload) {
  var input = {
    recipients: [],
    from: '',
    html: '',
    text: '',
    subject: ''
  }

  for (var i = 0; payload.to.length > i; i++){
    var to = { address: { email: payload.to[i] } };
    if (payload.toname !== undefined && payload.toname[i] !== undefined){
      to.address.name = payload.toname;
    }
    input.recipients.push(to);
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
  if (payload.sub !== undefined && payload.section !== undefined){
    input.substitutionData = {};
    for (var key in payload.sub) {
      input.substitutionData[key] = payload.sub[key];
    }
    for (var key in payload.section) {
      input.substitutionData[key] = payload.section[key];
    }
  } else if (payload.sub !== undefined){
    input.substitutionData = payload.sub;
  } else if (payload.section !== undefined){
    input.substitutionData = payload.section;
  }
  console.log(input);

  return input;
};

sendgrid.prototype.send = function(payload, callback) {
  var translated = translatePayload(payload);
  transmission.send(translated, function (err, res){
    if(err){
      console.log(err);
    }
  });
};

sendgrid.prototype.Email = require('./Email');
module.exports.Email = require('./Email');

module.exports = sendgrid;
