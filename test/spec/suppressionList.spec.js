var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Suppression List Library', function() {
  var client, suppressionList;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields(),
      put: sinon.stub().yields(),
      'delete': sinon.stub().yields()
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
    it('should call client put method with the appropriate uri', function(done) {
      suppressionList.upsert({email: 'test@test.com'}, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('suppression-list/test@test.com');
        done();
      });
    });

    it('should accept an array of recipients for bulk upsert', function(done) {
      var recipients = [
        {email: 'test1@test.com'}
        , {email: 'test2@test.com'}
      ];

      suppressionList.upsert(recipients, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('suppression-list');
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

    it('should throw an error if email is missing on recipient object', function(done) {
      suppressionList.upsert({name: 'test'}, function(err, data) {
        expect(err.message).to.equal('email is required in the recipient object');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });
  });
});
