function MockRequest() {
  this.error = null;
  this.response = 200;
  this.body = 'success';
}

MockRequest.prototype.get = function(url, callbackFunction) {
  var response = {error: this.error, status: this.response, body: this.body};
  callbackFunction(response.error, {statusCode: response.status}, response.body);
};

MockRequest.prototype.restore = function() {
  this.error = null;
  this.response = 200;
  this.body = 'success';
};

module.exports = new MockRequest();
