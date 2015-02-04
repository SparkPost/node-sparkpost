var MockSendingDomains = function() {
  this.passing = true;
};

MockSendingDomains.prototype.create = function(input, callback) {
  if (this.passing) {
    callback(null, 'Everything went better than expected');
  } else {
    callback(new Error('Now you done messed up'));
  }
};
MockSendingDomains.prototype.update = function(input, callback) {
  if (this.passing) {
    callback(null, 'Everything went better than expected');
  } else {
    callback(new Error('Now you done messed up'));
  }
};
MockSendingDomains.prototype.verify = function(input, callback) {
  if (this.passing) {
    callback(null, 'Everything went better than expected');
  } else {
    callback(new Error('Now you done messed up'));
  }
};
MockSendingDomains.prototype.all = function() {};
MockSendingDomains.prototype.find = function() {};

module.exports = new MockSendingDomains();
