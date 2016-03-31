var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Subaccounts Library', function () {
  var client, subaccounts;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields(),
      put: sinon.stub().yields()
    };

    subaccounts = require('../../lib/subaccounts')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      subaccounts.all(function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('subaccounts');
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var options = {
        id: 'test'
      };
      subaccounts.find(options, function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('subaccounts/test');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      subaccounts.find(null, function(err) {
        expect(err.message).to.equal('subaccount id is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        subaccount: {
          id: 'test'
        }
      };

      subaccounts.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('subaccounts');
        done();
      });
    });

    it('should throw an error if subaccount object is missing', function(done) {
      subaccounts.create(null, function(err) {
        expect(err.message).to.equal('subaccount object is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var options = {
        subaccount: {
          id: 'test'
        }
      };

      subaccounts.update(options, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('subaccounts/test');
        done();
      });
    });

    it('should throw an error if subaccount object is missing', function(done) {
      subaccounts.update(null, function(err) {
        expect(err.message).to.equal('subaccount object is required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });
  });
});
