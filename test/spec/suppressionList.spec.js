var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , Promise = require('../../lib/Promise');

chai.use(sinonChai);

describe('Suppression List Library', function() {
  var client, suppressionList;

  beforeEach(function() {
    client = {
      get: sinon.stub().returns(Promise.resolve({})),
      post: sinon.stub().returns(Promise.resolve({})),
      put: sinon.stub().returns(Promise.resolve({})),
      delete: sinon.stub().returns(Promise.resolve({}))
    };

    suppressionList = require('../../lib/suppressionList')(client);
  });

  describe('search Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      suppressionList.search({limit: 5}, function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('suppression-list');
        done();
      });
    });
  });

  describe('checkStatus Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      suppressionList.checkStatus('test@test.com', function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('suppression-list/test@test.com');
        done();
      });
    });

    it('should throw an error if email is null', function(done) {
      suppressionList.checkStatus(null, function(err) {
        expect(err.message).to.equal('email is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if email is missing', function(done) {
      suppressionList.checkStatus(function(err) {
        expect(err.message).to.equal('email is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });
  });

  describe('removeStatus Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      suppressionList.removeStatus('test@test.com', function(err, data) {
        expect(client['delete'].firstCall.args[0].uri).to.equal('suppression-list/test@test.com');
        done();
      });
    });

    it('should throw an error if email is null', function(done) {
      suppressionList.removeStatus(null, function(err) {
        expect(err.message).to.equal('email is required');
        expect(client['delete']).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if email is missing', function(done) {
      suppressionList.removeStatus(function(err) {
        expect(err.message).to.equal('email is required');
        expect(client['delete']).not.to.have.been.called;
        done();
      });
    });
  });

  describe('upsert Method', function() {
    it('should accept an array of recipients', function(done) {
      var recipients = [
        { email: 'test1@test.com' },
        { email: 'test2@test.com' }
      ];

      suppressionList.upsert(recipients, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('suppression-list');
        expect(client.put.firstCall.args[0].json.recipients).to.deep.equal(recipients);
        done();
      });
    });

    it('should throw an error if recipient is null', function(done) {
      suppressionList.upsert(null, function(err) {
        expect(err.message).to.equal('recipient is required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if recipient is missing', function(done) {
      suppressionList.upsert(function(err) {
        expect(err.message).to.equal('recipient is required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should upsert a single recipient as an array', function(done) {
      var recipient = { email: 'test1@test.com' };
      suppressionList.upsert(recipient, function(err, data) {
        expect(client.put.firstCall.args[0].json.recipients).to.deep.equal([recipient]);
        done();
      });
    });
  });
});
