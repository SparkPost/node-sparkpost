var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Transmissions Library', function() {
  var client, transmission;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields()
    };

    transmission = require('../../lib/transmissions')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      transmission.all(function() {
        expect(client.get.firstCall.args[0]).to.deep.equal({uri:'transmissions'});
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      transmission.find('test', function() {
        expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'transmissions/test'});
        done();
      });
    });

    it('should throw an error if transmissionID is null', function(done) {
      transmission.find(null, function(err) {
        expect(err.message).to.equal('transmissionID is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if transmissionID is missing', function(done) {
      transmission.find(function(err) {
        expect(err.message).to.equal('transmissionID is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });
  });

  describe('send Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var transmissionBody = {};

      transmission.send(transmissionBody, function() {
        expect(client.post.firstCall.args[0].uri).to.equal('transmissions');
        done();
      });
    });

    it('should throw an error if transmissionBody is null', function(done) {
      transmission.send(null, function(err) {
        expect(err.message).to.equal('transmissionBody is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if transmissionBody is missing', function(done) {
      transmission.send(function(err) {
        expect(err.message).to.equal('transmissionBody is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

  });
});
