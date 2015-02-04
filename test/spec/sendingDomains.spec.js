var chai = require('chai')
  , expect = chai.expect
  , proxyquire = require('proxyquire')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , configuration = require('../../lib/configuration')
  , MockRequest = require('../mocks/request.js');

chai.use(sinonChai);

describe('Sending Domains Library', function() {
  var sendingDomains;

  beforeEach(function() {
    sendingDomains = proxyquire('../../lib/sendingDomains', {
      'request': MockRequest
    });
  });

  describe('Instantiation', function() {
    it('should expose five public methods for use', function() {
      expect(sendingDomains.create).to.be.a.function;
      expect(sendingDomains.update).to.be.a.function;
      expect(sendingDomains.verify).to.be.a.function;
      expect(sendingDomains.find).to.be.a.function;
      expect(sendingDomains.all).to.be.a.function;
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
      sendingDomains.all(function(err, res) {
        expect(fetchSpy.args[0][0].url).to.equal('http://example.com:123/api/v1/sending-domains');
      });
      MockRequest.restore();
    });

    it('should handle being wrapped by all appropriately', function() {
      sendingDomains.all(function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });

    it('should handle being wrapped by find appropriately', function() {
      sendingDomains.find("Sample Domain", function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });

    it('should return the appropriate error when the request fails', function() {
      MockRequest.error = 'test';
      sendingDomains.find("Sample Domain", function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/Unable to contact Sending Domains API: test/);
      });
      MockRequest.restore();
    });

    it('should return the appropriate error when the request 404s', function() {
      MockRequest.response.statusCode = 404;
      sendingDomains.find("Sample Domain", function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/The specified Domain Name does not exist/);
      });
      MockRequest.restore();
    });

    it('should return the appropriate error when the request does not 200', function() {
      MockRequest.response.statusCode = 500;
      sendingDomains.find("Sample Domain", function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/Received bad response from Sending Domains API: 500/);
      });
      MockRequest.restore();
    });
  });

  describe('create Method', function() {
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
      sendingDomains.create({}, function(err, res) {
        expect(sendSpy.args[0][0].url).to.equal('http://example.com/api/v1/sending-domains');
      });
      MockRequest.restore();
    });

    it('should return an error when the request fails', function() {
      MockRequest.error = 'test';
      sendingDomains.create({}, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/test/);
      });
      MockRequest.restore();
    });

    it('should return an error if the status code is anything other than 200', function() {
      MockRequest.response.statusCode = 500;
      MockRequest.response.body.errors[0] = 'first error';
      sendingDomains.create({}, function(err, res) {
        expect(err[0]).to.equal('first error');
        expect(res).to.be.undefined;
      });
      MockRequest.restore();
    });

    it('should return a body on a successful request', function() {
      sendingDomains.create({}, function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });
  });

  describe('update Method', function() {
    it('should construct a URL based on global config', function() {
      configuration.setConfig({
          key: 'fancyKey',
          host: 'example.com',
          protocol: 'http',
          strictSSL: false,
          port: '',
          version: 'v1'
      });

      var sendSpy = sinon.spy(MockRequest, 'put');
      sendingDomains.update({}, function(err, res) {
        expect(sendSpy.args[0][0].url).to.equal('http://example.com/api/v1/sending-domains');
      });
      MockRequest.restore();
    });

    it('should return an error when the request fails', function() {
      MockRequest.error = 'test';
      sendingDomains.update({}, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/test/);
      });
      MockRequest.restore();
    });

    it('should return an error if the status code is anything other than 200', function() {
      MockRequest.response.statusCode = 500;
      MockRequest.response.body.errors[0] = 'first error';
      sendingDomains.update({}, function(err, res) {
        expect(err[0]).to.equal('first error');
        expect(res).to.be.undefined;
      });
      MockRequest.restore();
    });

    it('should return a body on a successful request', function() {
      sendingDomains.update({}, function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });
  });

  describe('verify Method', function() {

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
      sendingDomains.verify("Sample Domain", {}, function(err, res) {
        expect(sendSpy.args[0][0].url).to.equal('http://example.com/api/v1/sending-domains');
      });
      MockRequest.restore();
    });

    it('should return an error when the request fails', function() {
      MockRequest.error = 'test';
      sendingDomains.verify("Sample Domain", {}, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.match(/test/);
      });
      MockRequest.restore();
    });

    it('should return an error if the status code is anything other than 200', function() {
      MockRequest.response.statusCode = 500;
      MockRequest.response.body.errors[0] = 'first error';
      sendingDomains.verify("Sample Domain", {}, function(err, res) {
        expect(err[0]).to.equal('first error');
        expect(res).to.be.undefined;
      });
      MockRequest.restore();
    });

    it('should return a body on a successful request', function() {
      sendingDomains.verify("Sample Domain", {}, function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });

    it('should handle no options passed appropriately', function() {
      sendingDomains.verify("Sample Domain", function(err, res) {
        expect(err).to.be.null;
        expect(res.results).to.match(/success/);
      });
      MockRequest.restore();
    });

    it('should default verifying DKIM and SPF', function() {
      var sendSpy = sinon.spy(MockRequest, 'post');
      sendingDomains.verify("Sample Domain", {}, function(err, res) {
        console.log(sendSpy.args[0][0].json);
        expect(sendSpy.args[0][0].json.dkim_verify).to.be.true;
        expect(sendSpy.args[0][0].json.spf_verify).to.be.true;
      });
      MockRequest.restore();
    });

    it('should allow a user to override verifying DKIM and SPF', function() {
      var sendSpy = sinon.spy(MockRequest, 'post');
      sendingDomains.verify("Sample Domain", {verifyDKIM: false, verifySPF: false}, function(err, res) {
        expect(sendSpy.args[0][0].json.dkim_verify).to.be.false;
        expect(sendSpy.args[0][0].json.spf_verify).to.be.false;
      });
      MockRequest.restore();
    });
  });
});
