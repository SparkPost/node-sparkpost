'use strict';

var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , zlib = require('zlib')
  , nock = require('nock')
  , SparkPost = require('../../lib/sparkpost')
  , libVersion = require('../../package.json').version;

chai.use(require('sinon-chai'));


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

  it('should allow debug to be set in options', function() {
    const key = '12345678901234567890';
    let options = {}
      , client;

    // testing default initialization
    client = new SparkPost(key, options);
    expect(client.debug).to.equal(false);

    // testing setting flag
    options.debug = true;
    client = new SparkPost(key, options);
    expect(client.debug).to.equal(true);
  });

  function checkUserAgent(clientOptions, checkFn, done) {
    let req = {
        method: 'GET'
        , uri: 'get/test'
        , json: true
        , debug: true
    }
    , client;

    nock('https://api.sparkpost.com')
      .get('/api/v1/get/test')
      .reply(200, function() {
        expect(this.req.headers).to.have.property('user-agent');
        checkFn(this.req.headers['user-agent']);
        return { ok: true };
      });

    client = new SparkPost('123456789', clientOptions);
    client.request(req, done);
  }

  it('should allow users to self identify in user-agent', function(done) {
    let options = {
      stackIdentity: 'phantasmatron/1.1.3.8'
    }
    checkUserAgent(options, function(userAgent) {
      expect(userAgent).to.include(options.stackIdentity);
    }, done);
  });

  it('should include lib version in user-agent', function(done) {
    checkUserAgent({}, function(userAgent) {
      expect(userAgent).to.include('node-sparkpost/' + libVersion);
    }, done);
  });

  it('should include Node.JS version in user-agent', function(done) {
    checkUserAgent({}, function(userAgent) {
      expect(userAgent).to.include('node.js/' + process.version);
    }, done);
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
        , json: true
        , debug: true
      };

      client.request(options, function(err, data) {
        // making sure original request was GET
        expect(data.debug.request.method).to.equal('GET');

        // finish async test
        done();
      });
    });

    it('should return an error when the request fails', function(done) {
      // simulate a bad multipart to make request error
      nock('https://api.sparkpost.com')
        .get('/api/v1/get/test/fail')
        .reply(200);

      var options = {
        method: 'GET'
        , uri: 'get/test/fail'
        , multipart: [ {} ]
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
        expect(err).to.be.defined;

        // finish async test
        done();
      });
    });

    it('should return an error if statusCode not 2XX and there is no body', function(done) {
      // simulate a timeout
      nock('https://api.sparkpost.com')
        .post('/api/v1/post/test/fail')
        .reply(422);

      var options = {
        method: 'POST'
        , uri: 'post/test/fail'
      };

      client.request(options, function(err, data) {
        expect(data).to.be.defined;
        expect(err).to.be.defined;

        expect(err.errors).to.be.undefined;

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
        , json: true
        , debug: true
      };

      client.request(options, function(err, data) {
        expect(data.debug.request.uri.href).to.equal('https://test.sparkpost.com/test');

        // finish async test
        done();
      });
    });

    it('should accept gzipped responses', function(done) {
      var TEST_MESSAGE = 'This is a compressible test and it is full of compressible test stuff.'
        , compressedMsg
        , gzipNock
        , options = {
          method: 'GET'
          , uri: 'https://test.sparkpost.com/test'
          , gzip: true
          , json: true
          , debug: true
        };

      zlib.gzip(JSON.stringify({ msg: TEST_MESSAGE+TEST_MESSAGE }), function(err, gzipped) {
        expect(err).to.be.null;
        compressedMsg = gzipped;
        gzipNock = nock('https://test.sparkpost.com', {
            reqheaders: {
              'accept-encoding': /gzip/
            }
          })
          .get('/test')
          .reply(200, compressedMsg, {
            'X-Transfer-Length': String(compressedMsg.length)
            , 'Content-Length': undefined
            , 'Content-Encoding': 'gzip'
          });
        client.request(options, function(err, data) {
          expect(err).to.be.null;
          expect(data.debug.statusCode).to.equal(200);
          expect(data.msg).to.equal(TEST_MESSAGE + TEST_MESSAGE);

          // finish async test
          done();
        });
      });
    });

    it('should support explicitly disabled gzip option', function(done) {
      var TEST_MESSAGE = 'This is an uncompressed test message';

      nock('https://test.sparkpost.com')
        .get('/test')
        .reply(200, { msg: TEST_MESSAGE });

      var options = {
        method: 'GET'
        , uri: 'https://test.sparkpost.com/test'
        , gzip: false
        , json: true
        , debug: true
      };

      client.request(options, function(err, data) {
        expect(err).to.be.null;
        expect(data.debug.statusCode).to.equal(200);
        expect(data.msg).to.equal(TEST_MESSAGE);
        expect(data.debug.headers).not.to.have.property('content-encoding');

        // finish async test
        done();
      });
    });
  });

  describe('get method', function() {
    var client;

    before(function() {
      // setting up a client for all tests to use
      var key = '12345678901234567890';
      var options = {};

      client = new SparkPost(key, options);
    });

    it('should deliver a GET + response', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'request');

      nock('https://api.sparkpost.com')
        .get('/api/v1/get/test')
        .reply(200, { ok: true });

      client.get({uri: 'get/test', debug: true}, function(err, data) {
        // need to make sure we called request method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure original request was GET
        expect(data.debug.request.method).to.equal('GET');

        SparkPost.prototype.request.restore(); // restoring function
        done();
      });
    });

    it('should return a parsed JSON object', function(done) {
      nock('https://test.sparkpost.com')
        .get('/test')
        .reply(200, '{ "ok": true }');

      var options = {
        uri: 'https://test.sparkpost.com/test'
      };

      client.get(options, function(err, data) {
        expect(data).to.not.be.a('string');
        expect(data).to.be.an('object');
        expect(data).to.deep.equal({ok: true});

        // finish async test
        done();
      });
    });
  });

  describe('post method', function() {
    var client;

    before(function() {
      // setting up a client for all tests to use
      var key = '12345678901234567890';
      var options = {};

      client = new SparkPost(key, options);
    });

    it('should deliver a POST', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'request');

      nock('https://api.sparkpost.com')
        .post('/api/v1/post/test')
        .reply(200, { ok: true });

      var reqOptions = {
        uri: 'post/test'
        , json: {
          testingData: 'test data'
        }
        , debug: true
      };

      client.post(reqOptions, function(err, data) {
        // need to make sure we called request method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure original request was POST
        expect(data.debug.request.method).to.equal('POST');

        SparkPost.prototype.request.restore(); // restoring function
        done();
      });
    });

    it('should return a parsed JSON object', function(done) {
      nock('https://test.sparkpost.com')
        .post('/test')
        .reply(200, '{ "ok": true }');

      var options = {
        uri: 'https://test.sparkpost.com/test'
        , json: {
          testingData: 'test data'
        }
      };

      client.post(options, function(err, data) {
        expect(data).to.not.be.a('string');
        expect(data).to.be.an('object');
        expect(data).to.deep.equal({ok: true});

        // finish async test
        done();
      });
    });
  });

  describe('put method', function() {
    var client;

    before(function() {
      // setting up a client for all tests to use
      var key = '12345678901234567890';
      var options = {};

      client = new SparkPost(key, options);
    });

    it('should deliver a PUT/UPDATE', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'request');

      nock('https://api.sparkpost.com')
        .put('/api/v1/put/test')
        .reply(200, { ok: true });

      var reqOptions = {
        uri: 'put/test'
        , json: {
          testingData: 'test data'
        }
        , debug: true
      };

      client.put(reqOptions, function(err, data) {
        // need to make sure we called request method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure original request was PUT
        expect(data.debug.request.method).to.equal('PUT');

        SparkPost.prototype.request.restore(); // restoring function
        done();
      });
    });

    it('should return a parsed JSON object', function(done) {
      nock('https://test.sparkpost.com')
        .put('/test')
        .reply(200, '{ "ok": true }');

      var options = {
        uri: 'https://test.sparkpost.com/test'
        , json: {
          testingData: 'test data'
        }
      };

      client.put(options, function(err, data) {
        expect(data).to.not.be.a('string');
        expect(data).to.be.an('object');
        expect(data).to.deep.equal({ok: true});

        // finish async test
        done();
      });
    });
  });

  describe('delete method', function() {
    var client;

    before(function() {
      // setting up a client for all tests to use
      var key = '12345678901234567890';
      var options = {};

      client = new SparkPost(key, options);
    });

    it('should deliver a DELETE', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'request');

      nock('https://api.sparkpost.com')
        .delete('/api/v1/delete/test')
        .reply(200, { ok: true });

      var reqOptions = {
        uri: 'delete/test'
        , json: {
          testingData: 'test data'
        }
        , debug: true
      };

      client.delete(reqOptions, function(err, data) {
        // need to make sure we called request method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure original request was DELETE
        expect(data.debug.request.method).to.equal('DELETE');

        SparkPost.prototype.request.restore(); // restoring function
        done();
      });
    });

    it('should return a parsed JSON object', function(done) {
      nock('https://test.sparkpost.com')
        .delete('/test')
        .reply(200, '{ "ok": true }');

      var options = {
        uri: 'https://test.sparkpost.com/test'
        , json: {
          testingData: 'test data'
        }
      };

      client.delete(options, function(err, data) {
        expect(data).to.not.be.a('string');
        expect(data).to.be.an('object');
        expect(data).to.deep.equal({ok: true});

        // finish async test
        done();
      });
    });
  });
});
