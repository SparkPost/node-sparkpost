var chai = require('chai')
  , expect = chai.expect
  , proxyquire = require('proxyquire')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , configuration = require('../../../lib/configuration')
  , MockRequest = require('../../mocks/request.js');

chai.use(sinonChai);

describe('SendGrid Compatibility', function() {
  var sendgrid;

  beforeEach(function() {
    sendgrid = proxyquire('../../../lib/SendGridCompatibility', {
      'request': MockRequest
    });
 });

  describe('Instantiation', function() {
    it('should expose a send function', function() {
      expect(transmission.send).to.be.a.function;
    });
  });

  describe('translatePayload Helper Method', function() {
    var sendSpy;

    beforeEach(function() {
      sendSpy = sinon.spy(MockRequest, 'post');
    });

    afterEach(function() {
      sendSpy.restore();
    });

    it('should default the return path for sparkpost users', function() {
      sparkpost.send({}, function(err, res) {
        expect(sendSpy.args[0][0].json.return_path).to.equal('default@sparkpostmail.com');
      });
    });

    it('should allow on prem users to override the return path', function() {
      transmission.send({returnPath: 'sketchy@weird-domain.com'}, function(err, res) {
        expect(sendSpy.args[0][0].json.return_path).to.equal('sketchy@weird-domain.com');
      });
    });
  });
});
