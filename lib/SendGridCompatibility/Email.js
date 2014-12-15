'use strict';

/**
 * Email object constructor
 *
 * @param options object that contains initial values
 */
function Email(options){
  for (var option in options) {
    this[option] = options[option];
  }
}

/**
 * SendGrid email compatibility functions
 *
 * @param Most have a single value to map
 * Add functions will often contain a key / value pair
 */
Email.prototype.addTo = function (address){
  if (this.to === undefined){
    this.to = address;
  } else if (typeof this.to === 'string'){
    this.to = [this.to];
    this.to.push(address);
  } else {
    this.to.push(address);
  }
};
Email.prototype.setFrom = function (address){
  this.from = address;
};
Email.prototype.setSubject = function (subject){
  this.subject = subject;
};
Email.prototype.setText = function (text){
  this.text = text;
};
Email.prototype.setHtml = function (html){
  this.html = html;
};
Email.prototype.addHeader = function (key, value){
  if (this.headers === undefined){
    this.headers = {};
  }
  this.headers[key] = value;
};
Email.prototype.setHeaders = function (headers){
  this.headers = headers;
};
Email.prototype.addSubstitution = function (key, value){
  if (this.sub === undefined){
    this.sub = {};
  }
  if (typeof value === 'string'){
    this.sub[key] = [value];
  } else {
    this.sub[key] = value;
  }
};
Email.prototype.setSubstitutions = function (substitutions){
  this.sub = substitutions;
};
Email.prototype.addSection = function (key, value){
  if (this.section === undefined){
    this.section = {};
  }
  this.section[key] = value;
};
Email.prototype.setSections = function (sections){
  this.section = sections;
};
// SparkPost doesn't currently support addUniqueArg, throw an error
Email.prototype.addUniqueArg = function (){
  throw new Error('Unique Argument compatibility is not supported.');
};
// SparkPost doesn't currently support setUniqueArgs, throw an error
Email.prototype.setUniqueArgs = function (){
  throw new Error('Unique Argument compatibility is not supported.');
};
// SparkPost doesn't currently support addCategory, throw an error
Email.prototype.addCategory = function (){
  throw new Error('Category compatibility is not supported.');
};
// SparkPost doesn't currently support setCategories, throw an error
Email.prototype.setCategories = function (){
  throw new Error('Category compatibility is not supported.');
};
// SparkPost doesn't currently support addFilter, throw an error
Email.prototype.addFilter = function (){
  throw new Error('Filter compatibility is not supported.');
};
// SparkPost doesn't currently support setFilters, throw an error
Email.prototype.setFilters = function (){
  throw new Error('Filter compatibility is not supported.');
};
// SparkPost doesn't currently support addFile, throw an error
Email.prototype.addFile = function (){
  throw new Error('File compatibility is not supported.');
};

module.exports = Email;
