var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Relay Webhooks Library', function() {
  var client, relayWebhooks;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields(),
      put: sinon.stub().yields(),
      delete: sinon.stub().yields()
    };

    relayWebhooks = require('../../lib/relayWebhooks')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      relayWebhooks.all(function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('relay-webhooks');
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      relayWebhooks.find('test', function() {
        expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'relay-webhooks/test'});
        done();
      });
    });

    it('should throw an error if relayWebhookId is null', function(done) {
      relayWebhooks.find(null, function(err) {
        expect(err.message).to.equal('relayWebhookId is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if relayWebhookId is missing', function(done) {
      relayWebhooks.find(function(err) {
        expect(err.message).to.equal('relayWebhookId is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        target: 'test',
        domain: 'inbound.example.com'
      };

      relayWebhooks.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('relay-webhooks');
        done();
      });
    });

    it('should throw an error if options is null', function(done) {
      relayWebhooks.create(null, function(err) {
        expect(err.message).to.equal('options are required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if options is missing', function(done) {
      relayWebhooks.create(function(err) {
        expect(err.message).to.equal('options are required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if target is missing from options', function(done) {
      relayWebhooks.create({domain: 'inbound.example.com'}, function(err) {
        expect(err.message).to.equal('target is required in options');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if domain is missing from options', function(done) {
      relayWebhooks.create({target: 'test'}, function(err) {
        expect(err.message).to.equal('domain is required in options');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var options = {
        relayWebhookId: "test"
      };

      relayWebhooks.update(options, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('relay-webhooks/test');
        done();
      });
    });

    it('should throw an error if options is null', function(done) {
      relayWebhooks.update(null, function(err) {
        expect(err.message).to.equal('options are required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if options is missing', function(done) {
      relayWebhooks.update(function(err) {
        expect(err.message).to.equal('options are required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if relayWebhookId is missing from options', function(done) {
      relayWebhooks.update({}, function(err) {
        expect(err.message).to.equal('relayWebhookId is required in options');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      relayWebhooks.delete('test', function(err, data) {
        expect(client.delete.firstCall.args[0].uri).to.equal('relay-webhooks/test');
        done();
      });
    });

    it('should throw an error if relayWebhookId is null', function(done) {
      relayWebhooks.delete(null, function(err) {
        expect(err.message).to.equal('relayWebhookId is required');
        expect(client.delete).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if relayWebhookId is missing', function(done) {
      relayWebhooks.delete(function(err) {
        expect(err.message).to.equal('relayWebhookId is required');
        expect(client.delete).not.to.have.been.called;
        done();
      });
    });
  });
});
