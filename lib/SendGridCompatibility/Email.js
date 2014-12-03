function Email(options){
  self = options;
}

Email.prototype.addTo = function (address){
  if (typeof this.to === 'string'){
    this.to = [this.to];
  }
  this.to.push(address);
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
  this.headers[key] = value;
};
Email.prototype.setHeaders = function (headers){
  this.headers = headers;
};
Email.prototype.addSubstitution = function (key, value){
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
  this.section[key] = value;
};
Email.prototype.setSections = function (sections){
  this.section = sections;
};
Email.prototype.addUniqueArg = function (arg){
  throw new Error('Unique Argument compatibility is not supported.');
};
Email.prototype.setUniqueArgs = function (args){
  throw new Error('Unique Argument compatibility is not supported.');
};
Email.prototype.addCategory = function (category){
  throw new Error('Category compatibility is not supported.');
};
Email.prototype.setCategories = function (categories){
  throw new Error('Category compatibility is not supported.');
};
Email.prototype.addFilter = function (filter){
  throw new Error('Filter compatibility is not supported.');
};
Email.prototype.setFilters = function (filters){
  throw new Error('Filter compatibility is not supported.');
};
Email.prototype.addFile = function (file){
  throw new Error('File compatibility is not supported.');
};

module.exports = Email;
