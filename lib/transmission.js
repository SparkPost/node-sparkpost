"use strict";
var request = require('request');

var transmission = function() {
  this.baseUrl = '/api/v1/transmissions';
  this.openTracking = true;
  this.clickTracking = true;
  this.useDraftTemplate = false;
};

transmission.prototype.send = function() {};
transmission.prototype.fetch = function(transmissionID) {};

transmission.prototype.setMetadata = function() {};
transmission.prototype.setSubstitutionData = function() {};

transmission.prototype.setCampaign = function() {};
transmission.prototype.setDescription = function() {};

transmission.prototype.setReturnPath = function() {};
transmission.prototype.setReplyTo = function() {};
transmission.prototype.setSubject = function() {};
transmission.prototype.setFrom = function() {};

transmission.prototype.setHTMLContent = function() {};
transmission.prototype.setTextContent = function() {};
transmission.prototype.setRfc2822Content = function() {};
transmission.prototype.setHeader = function() {};
transmission.prototype.setRecipients = function() {};

transmission.prototype.useRecipientList = function() {};
transmission.prototype.useStoredTemplate = function() {};

module.exports = transmission;
