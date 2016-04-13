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
      var subaccountId = 'test';

      subaccounts.find(subaccountId, function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('subaccounts/test');
        done();
      });
    });

    it('should throw an error if subaccountId is null', function(done) {
      subaccounts.find(null, function(err) {
        expect(err.message).to.equal('subaccountId is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if subaccountId is missing', function(done) {
      subaccounts.find(function(err) {
        expect(err.message).to.equal('subaccountId is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        name: 'test',
        keyLabel: 'test',
        keyGrants: []
      };

      subaccounts.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('subaccounts');
        done();
      });
    });

    it('should throw an error if options is null', function(done) {
      subaccounts.create(null, function(err) {
        expect(err.message).to.equal('options are required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if options is missing', function(done) {
      subaccounts.create(function(err) {
        expect(err.message).to.equal('options are required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if name is missing from options', function(done) {
      var options = {
        keyLabel: 'test',
        keyGrants: []
      };

      subaccounts.create(options, function(err) {
        expect(err.message).to.equal('name is required in options');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if keyLabel is missing from options', function(done) {
      var options = {
        name: 'test',
        keyGrants: []
      };

      subaccounts.create(options, function(err) {
        expect(err.message).to.equal('keyLabel is required in options');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if keyGrants is missing from options', function(done) {
      var options = {
        name: 'test',
        keyLabel: 'test'
      };

      subaccounts.create(options, function(err) {
        expect(err.message).to.equal('keyGrants is required in options');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should not set key_valid_ips in request if keyValidIps is missing from options', function(done) {
      var options = {
        name: 'test',
        keyLabel: 'test',
        keyGrants: []
      };

      subaccounts.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].json.key_valid_ips).to.be.undefined;
        done();
      })
    });

    it('should not set key_valid_ips in request if keyValidIps is empty array', function(done) {
      var options = {
        name: 'test',
        keyLabel: 'test',
        keyGrants: [],
        keyValidIps: []
      };

      subaccounts.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].json.key_valid_ips).to.be.undefined;
        done();
      })
    });

    it('should set key_valid_ips in request if keyValidIps is in options and is a non-empty array', function(done) {
      var options = {
        name: 'test',
        keyLabel: 'test',
        keyGrants: [],
        keyValidIps: ['127.0.0.1']
      };

      subaccounts.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].json.key_valid_ips).to.eql(['127.0.0.1']);
        done();
      })
    });

    it('should set key_valid_ips in request if keyValidIps is in options and is not an array', function(done) {
      var options = {
        name: 'test',
        keyLabel: 'test',
        keyGrants: [],
        keyValidIps: '127.0.0.1'
      };

      subaccounts.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].json.key_valid_ips).to.eql(['127.0.0.1']);
        done();
      })
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var options = {
        subaccountId: 'test'
      };

      subaccounts.update(options, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('subaccounts/test');
        done();
      });
    });

    it('should throw an error if options is null', function(done) {
      subaccounts.update(null, function(err) {
        expect(err.message).to.equal('options are required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if options is missing', function(done) {
      subaccounts.update(function(err) {
        expect(err.message).to.equal('options are required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if subaccountId is missing from options', function(done) {
      var options = {};

      subaccounts.update(options, function(err, data) {
        expect(err.message).to.equal('subaccountId is required in options');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });
  });
});
