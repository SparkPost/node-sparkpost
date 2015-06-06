var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Sending Domains Library', function() {
  var client, sendingDomains;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields(),
      put: sinon.stub().yields()
    };

    sendingDomains = require('../../lib/sendingDomains')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      sendingDomains.all(function() {
        expect(client.get.firstCall.args[0]).to.deep.equal({uri:'sending-domains'});
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      sendingDomains.find('test', function() {
        expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'sending-domains/test'});
        done();
      });
    });

    it('should throw an error if domain is null', function(done) {
      sendingDomains.find(null, function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domain is missing', function(done) {
      sendingDomains.find(function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var domainBody = {
        domain: "test"
      };

      sendingDomains.create(domainBody, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('sending-domains');
        done();
      });
    });

    it('should throw an error if domainBody is null', function(done) {
      sendingDomains.create(null, function(err) {
        expect(err.message).to.equal('domainBody is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domainBody is missing', function(done) {
      sendingDomains.create(function(err) {
        expect(err.message).to.equal('domainBody is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domain is missing from domainBody', function(done) {
      sendingDomains.create({}, function(err){
        expect(err.message).to.equal('domain is required in the domainBody');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var domainBody = {
        domain: "test"
      };

      sendingDomains.update(domainBody, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('sending-domains/test');
        done();
      });
    });

    it('should throw an error if domainBody is null', function(done) {
      sendingDomains.update(null, function(err) {
        expect(err.message).to.equal('domainBody is required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domainBody is missing', function(done) {
      sendingDomains.update(function(err) {
        expect(err.message).to.equal('domainBody is required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domain is missing from domainBody', function(done) {
      sendingDomains.update({}, function(err){
        expect(err.message).to.equal('domain is required in the domainBody');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });
  });

  describe('verify Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        domain: 'test'
      };

      sendingDomains.verify(options, function() {
        expect(client.post.firstCall.args[0].uri).to.equal('sending-domains/test/verify');
        done();
      });
    });

    it('should throw an error if domain is missing', function(done) {
      sendingDomains.verify(null, function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should default verifyDKIM and verifySPF to be true', function(done) {
      var options = {
        domain: 'test'
      };

      sendingDomains.verify(options, function() {
        expect(client.post.firstCall.args[0].json.dkim_verify).to.be.true;
        expect(client.post.firstCall.args[0].json.spf_verify).to.be.true;
        done();
      });
    });

    it('should allow a user to set verifyDKIM and verifySPF', function(done){
      var options = {
        domain: 'test',
        verifyDKIM: false,
        verifySPF: false
      };

      sendingDomains.verify(options, function() {
        expect(client.post.firstCall.args[0].json.dkim_verify).to.be.false;
        expect(client.post.firstCall.args[0].json.spf_verify).to.be.false;
        done();
      });
    });
  });
});
