"use strict";
var request = require('request');

var transmission = function(apiKey, hostname) {
  this.baseUrl = '/api/v1/transmissions';
  this.openTracking = true;
  this.clickTracking = true;
  this.useDraftTemplate = false;
  this.model = {};
  this.options = {
    hostname: 'app-momentum.dev.int.messagesystems.com',
    port: 80,
    httpScheme: 'http',
    apiKey: '123'
  };
};

transmission.prototype.send = function() {};

/**
 *  Method for issuing GET request to Transmissions API
 *
 *  This method is responsible for getting the collection _and_
 *  a specific entity from the Transmissions API
 *
 *  If transmissionID parameter is omitted, then we fetch the collection
 *
 *  @param transmissionID string Transmission ID of specific Transmission to retrieve
 */
transmission.prototype.fetch = function(transmissionID, callback) {
  var cb = callback
    , constructedUrl = this.options.httpScheme + '://' + this.options.hostname + this.baseUrl;

  // Check that someone passed in a real transmission id
  if (typeof transmissionID !== 'function' && typeof transmissionID !== undefined) {
    constructedUrl = constructedUrl + '/' + transmissionID;
  } else {
    cb = transmissionID;
  }

  request.get(constructedUrl, function(err, res, body) {
    if (err) {
      cb(new Error('Unable to contact Transmissions API: ' + err))
    } else if (res.statusCode === 404) {
      cb(new Error('The specified transmission ID does not exist'))
    } else if (res.statusCode !== 200) {
      cb(new Error('Received bad response from Transmission API: ' + res.statusCode))
    } else {
      cb(null, body);
    }
  });
};

transmission.prototype.setMetadata = function() {};
transmission.prototype.setSubstitutionData = function() {};

transmission.prototype.setCampaign = function(campaignID) {
  if (typeof campaignID !== 'string') {
    throw new Error('Campaign Name must be a string');
  } else if (Buffer.byteLength(campaignID) > 64) {
    throw new Error('Campaign Name must be less than 64 bytes in length');
  } else {
    this.model.campaignID = campaignID;
  }

  return this;
};

transmission.prototype.setDescription = function(description) {
  if (typeof description !== 'string') {
    throw new Error('Transmission description must be a string');
  } else if (Buffer.byteLength(description) > 1024) {
    throw new Error('Transmission description must be less that 1024 bytes in length');
  } else {
    this.model.description = description;
  }

  return this;
};

transmission.prototype.setReturnPath = function(returnPath) {
  if (typeof returnPath !== 'string') {
    throw new Error('Return Path must be a string');
  } else {
    this.model.returnPath = returnPath;
  }

  return this;
};

transmission.prototype.setReplyTo = function(replyTo) {
  if (typeof replyTo !== 'string') {
    throw new Error('Reply To must be a string');
  } else if (typeof this.model.content === 'undefined') {
    this.model.content = {};
    this.model.content.replyTo = replyTo;
  } else {
    this.model.content.replyTo = replyTo;
  }

  return this;
};

transmission.prototype.setSubject = function(subject) {
  if (typeof subject !== 'string') {
    throw new Error('Subject must be a string')
  } else if (typeof this.model.content === 'undefined') {
    this.model.content = {};
    this.model.content.subject = subject;
  } else {
    this.model.content.subject = subject;
  }

  return this;
};

transmission.prototype.setFrom = function() {};

transmission.prototype.setHTMLContent = function(html) {
  if (typeof html !== 'string') {
    throw new Error('HTML content must be a string');
  } else if (typeof this.model.content === 'undefined') {
    this.model.content = {};
    this.model.content.html = html;
  } else if (this.model.content.hasOwnProperty('rfc2822')) {
    throw new Error('You cannot specify HTML content after providing RFC-2822 encoded content');
  } else {
    this.model.content.html = html;
  }

  return this;
};

transmission.prototype.setTextContent = function(plaintext) {
  if (typeof plaintext !== 'string') {
    throw new Error('Plain Text content must be a string');
  } else if (typeof this.model.content === 'undefined') {
    this.model.content = {};
    this.model.plaintext = plaintext
  } else if (this.model.content.hasOwnProperty('rfc2822')) {
    throw new Error('You cannot specify Plain Text content after providing RFC-2822 encoded content');
  } else {
    this.model.plaintext = plaintext
  }

  return this;
};

transmission.prototype.setRfc2822Content = function(rfc) {};

transmission.prototype.setHeader = function() {};

transmission.prototype.setRecipients = function(recipients) {
  if (Array.isArray(recipients) === false && recipients.constructor !== Object) {
    throw new Error('Recipients must be an Object or Array');
  } else if (this.model.hasOwnProperty('recipientList')) {
    throw new Error('You cannot use inline recipients if you already provided a recipient list');
  } else {
    this.model.recipients = recipients;
  }

  return this;
};

transmission.prototype.useRecipientList = function(recipientList) {
  if (typeof recipientList !== 'string') {
    throw new Error('Recipient List Name must be a string');
  } else if (this.model.hasOwnProperty('recipients')) {
    throw new Error('You cannot use a recipient list if you have already provided inline recipients');
  } else {
    this.model.recipientList = recipientList;
  }

  return this;
};

transmission.prototype.useStoredTemplate = function(templateID) {
  if (typeof templateID !== 'string') {
    throw new Error('Template Name must be a string');
  } else if (typeof this.model.content === 'undefined'){
    this.model.content = {};
    this.model.content.storedTemplate = templateID;
  } else {
    if (this.model.content.hasOwnProperty('html') || this.model.content.hasOwnProperty('plaintext')) {
      throw new Error('You cannot use a stored template if you have already provided content parts');
    } else if (this.model.content.hasOwnProperty('rfc2822')) {
      throw new Error('You cannot use a stored template after providing RFC-2822 encoded content');
    } else {
      this.model.content.storedTemplate = templateID
    }
  }

  return this;
};

module.exports = transmission;
