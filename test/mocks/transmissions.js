var MockTransmissions = function() {
  this.passing = true;
};

MockTransmissions.prototype.send = function(input, callback) {
  if (this.passing) {
    callback(null, 'Everything went better than expected');
  } else {
    callback(new Error('Now you done messed up'));
  }
};
MockTransmissions.prototype.all = function() {};
MockTransmissions.prototype.find = function() {};

module.exports = new MockTransmissions();
