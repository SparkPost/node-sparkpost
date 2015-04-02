function MockRequest() {
  this.error = null;
  this.response = {
    statusCode: 200,
    body: {
      errors: [],
      results: 'success'
    }
  }
}

MockRequest.prototype.get = function(options, callbackFunction) {
  var response = {error: this.error, response: this.response, body: this.response.body};
  callbackFunction(response.error, response.response, response.body);
};

MockRequest.prototype.post = function(options, callbackFunction) {
  var response = {error: this.error, response: this.response, body: this.response.body || undefined};
  callbackFunction(response.error, response.response, response.body);
};

MockRequest.prototype.put = function(options, callbackFunction) {
  var response = {error: this.error, response: this.response, body: this.response.body};
  callbackFunction(response.error, response.response, response.body);
};

MockRequest.prototype.restore = function() {
  this.error = null;
  this.response = {
    statusCode: 200,
    body: {
      errors: [],
      results: 'success'
    }
  }
};

module.exports = new MockRequest();
