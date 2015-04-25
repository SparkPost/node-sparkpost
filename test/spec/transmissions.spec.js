var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , SparkPost = require('../../lib/index');

chai.use(sinonChai);

describe('Transmissions Library', function() {
  var client, transmission;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields()
    };

    transmission = require('../../lib/transmission')(client);
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

    describe('toApiFormat Helper Method', function() {
      it('should default the return path for sparkpost users', function(done) {
        transmission.send({}, function(err, res) {
          expect(client.post.firstCall.args[0].json.return_path).to.equal('default@sparkpostmail.com');
          done();
        });
      });

      it('should allow on prem users to override the return path', function(done) {
        transmission.send({returnPath: 'sketchy@weird-domain.com'}, function() {
          expect(client.post.firstCall.args[0].json.return_path).to.equal('sketchy@weird-domain.com');
          done();
        });
      });

      it('should default open and click tracking to be undefined', function(done) {
        transmission.send({}, function() {
          expect(client.post.firstCall.args[0].json.options.open_tracking).to.be.undefined;
          expect(client.post.firstCall.args[0].json.options.click_tracking).to.be.undefined;
          done();
        });
      });

      it('should allow a user to set open/click tracking', function(done) {
        transmission.send({trackOpens: false, trackClicks: false}, function() {
          expect(client.post.firstCall.args[0].json.options.open_tracking).to.be.false;
          expect(client.post.firstCall.args[0].json.options.click_tracking).to.be.false;
          done();
        });
      });

      it('should allow a user to override useSandbox ', function(done) {
        transmission.send({useSandbox: true}, function() {
          expect(client.post.firstCall.args[0].json.options.sandbox).to.be.true;
          done();
        });
      });

      it('should default using a published stored template', function(done) {
        transmission.send({}, function() {
          expect(client.post.firstCall.args[0].json.content.use_draft_template).to.be.false;
          done();
        });
      });

      it('should allow a user to override and use a draft stored template', function(done) {
        transmission.send({useDraftTemplate: true}, function() {
          expect(client.post.firstCall.args[0].json.content.use_draft_template).to.be.true;
          done();
        });
      });
    });
  });
});
