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
        expect(client.get.firstCall.args[0].uri).to.equal('transmissions');
        done();
      });
    });

    it('should allow campaign_id to be set in options', function(done) {
      var options = {
        campaign_id: 'test-campaign'
      };

      transmission.all(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({campaign_id: 'test-campaign'});
        done();
      });
    });

    it('should allow template_id to be set in options', function(done) {
      var options = {
        template_id: 'test-template'
      };

      transmission.all(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({template_id: 'test-template'});
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
      var options = {
        transmissionBody: {
          campaign: 'test-campaign'
        }
      };

      transmission.send(options, function() {
        expect(client.post.firstCall.args[0].uri).to.equal('transmissions');
        done();
      });
    });

    it('should throw an error if transmissionBody is missing', function(done) {
      transmission.send(null, function(err) {
        expect(err.message).to.equal('transmissionBody is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should allow num_rcpt_errors to be set in options', function(done) {
      var options = {
        transmissionBody: {
          campaign: 'test-campaign'
        },
        num_rcpt_errors: 3
      };

      transmission.send(options, function(err, data) {
        expect(client.post.firstCall.args[0].qs).to.deep.equal({num_rcpt_errors: 3});
        done();
      });
    });
  });
});
