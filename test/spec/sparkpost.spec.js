var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , SparkPost = require('../../lib/sparkpost');

chai.use(sinonChai);

describe('SparkPost Library', function() {

  it('should be a constructor', function() {
    expect(SparkPost).to.be.a('function');
  });

  it('should require an API key', function() {
    var client;

    try {
      client = new SparkPost();
    } catch (err) {
      expect(err.message).to.equal('Client requires an API Key.');
    }
  });

  it('should allow an API key to be passed in', function() {
    var key = '12345678901234567890';
    var client = new SparkPost(key);

    expect(client.apiKey).to.equal(key);
  });

  it('should read an API key from an environment variable', function() {
    process.env.SPARKPOST_API_KEY = '12345678901234567890';
    var client = new SparkPost();

    expect(client.apiKey).to.equal(process.env.SPARKPOST_API_KEY);
    process.env.SPARKPOST_API_KEY = null;
  });

  it('should allow an API key passed in to take precedence over an environment variable', function() {
    var key = '12345678901234567890';
    process.env.SPARKPOST_API_KEY = 'abcdefghijklmnopqrst';
    var client = new SparkPost(key);

    expect(client.apiKey).to.equal(key);
    process.env.SPARKPOST_API_KEY = null;
  });

  it('should take a custom rest endpoint', function() {
    var key = '12345678901234567890';
    var options = {};

    // testing default initialization
    var client = new SparkPost(key, options);

    expect(client.origin).to.equal('https://api.sparkpost.com:443');

    options.origin = 'https://dev.sparkpost.com';

    // testing custom endpoint
    client = new SparkPost(options);

    expect(client.origin).to.equal('https://dev.sparkpost.com');
  });

  describe('request method', function() {
    var client;

    before(function() {
      // setting up a client for all tests to use
      var key = '12345678901234567890';
      var options = {};

      client = new SparkPost(key, options);
    });

    it('should throw an error when no options are passed', function() {

      try {
        client.request(null, function() {});
      } catch(err) {
        expect(err.name).to.equal('TypeError');
        expect(err.message).to.equal('options argument is required');
      }
    });

    it('should make a request to the API', function(done) {
      nock('https://api.sparkpost.com')
        .get('/api/v1/get/test')
        .reply(200, { ok: true });

      var options = {
        method: 'GET'
        , uri: 'get/test'
      };

      client.request(options, function(err, data) {
        // making sure original request was GET
        expect(data.request.method).to.equal('GET');

        // finish async test
        done();
      });
    });

    it('should return an error when the request fails', function(done) {
      // simulate a timeout
      nock('https://api.sparkpost.com')
        .get('/api/v1/get/test/fail')
        .delayConnection(500)
        .reply(200);

      var options = {
        method: 'GET'
        , uri: 'get/test/fail'
        , timeout: 100
      };

      client.request(options, function(err, data) {
        expect(data).to.be.undefined;
        expect(err).to.be.defined;

        // finish async test
        done();
      });
    });

    it('should return an error if statusCode not 2XX', function(done) {
      // simulate a timeout
      nock('https://api.sparkpost.com')
        .post('/api/v1/post/test/fail')
        .reply(422, { errors: [] });

      var options = {
        method: 'POST'
        , uri: 'post/test/fail'
      };

      client.request(options, function(err, data) {
        expect(data).to.be.defined;
        expect(err).to.be.defined;

        expect(err.errors).to.deep.equal(data.body.errors);

        // finish async test
        done();
      });
    });

    it('should use a full URI if provided', function(done) {
      nock('https://test.sparkpost.com')
        .get('/test')
        .reply(200, { ok: true });

      var options = {
        method: 'GET'
        , uri: 'https://test.sparkpost.com/test'
      };

      client.request(options, function(err, data) {
        expect(data.request.uri.href).to.equal('https://test.sparkpost.com/test');

        // finish async test
        done();
      });
    });
  });

  describe('get method', function() {
    it('should deliver a GET + response', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'request');

      var key = '12345678901234567890';
      var client = new SparkPost(key);

      nock('https://api.sparkpost.com')
        .get('/api/v1/get/test')
        .reply(200, { ok: true });

      client.get({uri: 'get/test'}, function(err, data) {
        // need to make sure we called request method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure original request was GET
        expect(data.request.method).to.equal('GET');

        SparkPost.prototype.request.restore(); // restoring function
        done();
      });
    });
  });

  describe('post method', function() {
    it('should deliver a POST', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'request');

      var key = '12345678901234567890';
      var client = new SparkPost(key);

      nock('https://api.sparkpost.com')
        .post('/api/v1/post/test')
        .reply(200, { ok: true });

      var reqOptions = {
        uri: 'post/test'
        , json: {
          testingData: 'test data'
        }
      };

      client.post(reqOptions, function(err, data) {
        // need to make sure we called request method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure original request was POST
        expect(data.request.method).to.equal('POST');

        SparkPost.prototype.request.restore(); // restoring function
        done();
      });
    });
  });

  describe('put method', function() {
    it('should deliever a PUT/UPDATE', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'request');

      var key = '12345678901234567890';
      var client = new SparkPost(key);

      nock('https://api.sparkpost.com')
        .put('/api/v1/put/test')
        .reply(200, { ok: true });

      var reqOptions = {
        uri: 'put/test'
        , json: {
          testingData: 'test data'
        }
      };

      client.put(reqOptions, function(err, data) {
        // need to make sure we called request method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure original request was PUT
        expect(data.request.method).to.equal('PUT');

        SparkPost.prototype.request.restore(); // restoring function
        done();
      });
    });
  });

  describe('delete method', function() {
    it('should deliever a DELETE', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'request');

      var key = '12345678901234567890';
      var client = new SparkPost(key);

      nock('https://api.sparkpost.com')
        .delete('/api/v1/delete/test')
        .reply(200, { ok: true });

      var reqOptions = {
        uri: 'delete/test'
        , json: {
          testingData: 'test data'
        }
      };

      client.delete(reqOptions, function(err, data) {
        // need to make sure we called request method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure original request was DELETE
        expect(data.request.method).to.equal('DELETE');

        SparkPost.prototype.request.restore(); // restoring function
        done();
      });
    });
  });
});
