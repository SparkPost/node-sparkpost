var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Inbound Domains Library', function() {
  var client, inboundDomains;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields(),
      delete: sinon.stub().yields()

    };

    inboundDomains = require('../../lib/inboundDomains')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      inboundDomains.all(function() {
        expect(client.get.firstCall.args[0]).to.deep.equal({uri:'inbound-domains'});
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      inboundDomains.find('test', function() {
        expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'inbound-domains/test'});
        done();
      });
    });

    it('should throw an error if domain is null', function(done) {
      inboundDomains.find(null, function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domain is missing', function(done) {
      inboundDomains.find(function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      inboundDomains.create("test", function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('inbound-domains');
        done();
      });
    });

    it('should throw an error if domain is null', function(done) {
      inboundDomains.create(null, function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domain is missing', function(done) {
      inboundDomains.create(function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      inboundDomains.delete('test', function(err, data) {
        expect(client.delete.firstCall.args[0].uri).to.equal('inbound-domains/test');
        done();
      });
    });

    it('should throw an error if domain is null', function(done) {
      inboundDomains.delete(null, function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.delete).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domain is missing', function(done) {
      inboundDomains.delete(function(err) {
        expect(err.message).to.equal('domain is required');
        expect(client.delete).not.to.have.been.called;
        done();
      });
    });
  });
});
