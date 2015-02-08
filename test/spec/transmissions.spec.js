var chai = require('chai')
  , expect = chai.expect
  , proxyquire = require('proxyquire')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , configuration = require('../../lib/configuration')
  , MockRequest = require('../mocks/request.js');

chai.use(sinonChai);

describe('Transmissions Library', function() {
  var transmission;

  beforeEach(function() {
    transmission = proxyquire('../../lib/transmission', {
      'request': MockRequest
    });
 });

  describe('Instantiation', function() {
    it('should expose three public methods for use', function() {
      expect(transmission.send).to.be.a.function;
      expect(transmission.all).to.be.a.function;
      expect(transmission.find).to.be.a.function;
    });
  });

  describe('toApiFormat Helper Method', function() {
    var sendSpy;

    beforeEach(function() {
      sendSpy = sinon.spy(MockRequest, 'post');
    });

    afterEach(function() {
      sendSpy.restore();
    });

    it('should default the return path for sparkpost users', function() {
      transmission.send({}, function(err, res) {
        expect(sendSpy.args[0][0].json.return_path).to.equal('default@sparkpostmail.com');
      });
    });

    it('should allow on prem users to override the return path', function() {
      transmission.send({returnPath: 'sketchy@weird-domain.com'}, function(err, res) {
        expect(sendSpy.args[0][0].json.return_path).to.equal('sketchy@weird-domain.com');
      });
    });

    it('should default open and click tracking', function() {
      transmission.send({}, function(err, res) {
        expect(sendSpy.args[0][0].json.options.open_tracking).to.be.true;
        expect(sendSpy.args[0][0].json.options.click_tracking).to.be.true;
      });
    });

    it('should allow a user to override open and click tracking', function() {
      transmission.send({trackOpens: false, trackClicks: false}, function(err, res) {
        expect(sendSpy.args[0][0].json.options.open_tracking).to.be.false;
        expect(sendSpy.args[0][0].json.options.click_tracking).to.be.false;
      });
    });

    it('should allow a user to override useSandbox ', function() {
      transmission.send({useSandbox: true}, function(err, res) {
        expect(sendSpy.args[0][0].json.options.sandbox).to.be.true;
      });
    });

    it('should default using a published stored template', function() {
      transmission.send({}, function(err, res) {
        expect(sendSpy.args[0][0].json.content.use_draft_template).to.be.false;
      });
    });

    it('should allow a user to override and use a draft stored template', function() {
      transmission.send({useDraftTemplate: true}, function(err, res) {
        expect(sendSpy.args[0][0].json.content.use_draft_template).to.be.true;
      });
    });
  });

  describe('fetch Helper Method', function() {
    it('should construct a URL appropriately based on global config', function() {
      configuration.setConfig({
          key: 'fancyKey',
          host: 'example.com',
          protocol: 'http',
          strictSSL: false,
          port: '123',
          version: 'v1'
      });

      var fetchSpy = sinon.spy(MockRequest, 'get');
      transmission.all(function(err, res) {
        expect(fetchSpy.args[0][0].url).to.equal('http://example.com:123/api/v1/transmissions');
      });
      MockRequest.restore();
    });

    it('should handle being wrapped by all appropriately', function() {
      transmission.all(function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });

    it('should handle being wrapped by find appropriately', function() {
      transmission.find(12, function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });

    it('should return the appropriate error when the request fails', function() {
      MockRequest.error = 'test';
      transmission.find(12, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/Unable to contact Transmissions API: test/);
      });
      MockRequest.restore();
    });

    it('should return the appropriate error when the request 404s', function() {
      MockRequest.response.statusCode = 404;
      transmission.find(12, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/The specified Transmission ID does not exist/);
      });
      MockRequest.restore();
    });

    it('should return the appropriate error when the request does not 200', function() {
      MockRequest.response.statusCode = 500;
      transmission.find(12, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/Received bad response from Transmission API: 500/);
      });
      MockRequest.restore();
    });
  });

  describe('send Method', function() {
    it('should construct a URL based on global config', function() {
      configuration.setConfig({
          key: 'fancyKey',
          host: 'example.com',
          protocol: 'http',
          strictSSL: false,
          port: '',
          version: 'v1'
      });

      var sendSpy = sinon.spy(MockRequest, 'post');
      transmission.send({}, function(err, res) {
        expect(sendSpy.args[0][0].url).to.equal('http://example.com/api/v1/transmissions');
      });
      MockRequest.restore();
    });

    it('should return an error when the request fails', function() {
      MockRequest.error = 'test';
      transmission.send({}, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/test/);
      });
      MockRequest.restore();
    });

    it('should return an error if the status code is anything other than 200', function() {
      MockRequest.response.statusCode = 500;
      MockRequest.response.body.errors[0] = 'first error';
      transmission.send({}, function(err, res) {
        expect(err[0]).to.equal('first error');
        expect(res).to.be.undefined;
      });
      MockRequest.restore();
    });

    it('should return a body on a successful request', function() {
      transmission.send({}, function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });
  });
});
