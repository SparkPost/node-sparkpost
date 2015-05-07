var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Webhooks Library', function() {
  var client, webhooks;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields(),
      put: sinon.stub().yields(),
      'delete': sinon.stub().yields()
    };

    webhooks = require('../../lib/webhooks')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      webhooks.all(function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('webhooks');
        done();
      });
    });

    it('should allow timezone to be set in options', function(done) {
      var options = {
        timezone: 'America/New_York'
      };

      webhooks.all(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({timezone: 'America/New_York'});
        done();
      });
    });
  });

  describe('describe Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var options = {
        id: 'test'
      };

      webhooks.describe(options, function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('webhooks/test');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      webhooks.describe(null, function(err) {
        expect(err.message).to.equal('id is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should allow timezone to be set in options', function(done) {
      var options = {
        id: 'test',
        timezone: 'America/New_York'
      };

      webhooks.describe(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({timezone: 'America/New_York'});
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      webhooks.create({}, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('webhooks');
        done();
      });
    });

    it('should throw an error if webhook is null', function(done) {
      webhooks.create(null, function(err) {
        expect(err.message).to.equal('webhook object is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if webhook is missing', function(done) {
      webhooks.create(function(err) {
        expect(err.message).to.equal('webhook object is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var webhook = {
        id: "test"
      };

      webhooks.update(webhook, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('webhooks/test');
        done();
      });
    });

    it('should throw an error if webhook is null', function(done) {
      webhooks.update(null, function(err) {
        expect(err.message).to.equal('webhook object is required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if webhook is missing', function(done) {
      webhooks.update(function(err) {
        expect(err.message).to.equal('webhook object is required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      webhooks['delete']('test', function(err, data) {
        expect(client['delete'].firstCall.args[0].uri).to.equal('webhooks/test');
        done();
      });
    });

    it('should throw an error if id is null', function(done) {
      webhooks['delete'](null, function(err) {
        expect(err.message).to.equal('id is required');
        expect(client['delete']).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      webhooks['delete'](function(err) {
        expect(err.message).to.equal('id is required');
        expect(client['delete']).not.to.have.been.called;
        done();
      });
    });
  });

  describe('validate Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        id: 'test',
        message: {
          msys: {}
        }
      };

      webhooks.validate(options, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('webhooks/test/validate');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      webhooks.validate(null, function (err) {
        expect(err.message).to.equal('id is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if message is missing', function(done) {
      var options = {
        id: 'test'
      };

      webhooks.validate(options, function (err) {
        expect(err.message).to.equal('message is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });
  });

  describe('getBatchStatus Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var options = {
        id: 'test'
      };

      webhooks.getBatchStatus(options, function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('webhooks/test/batch-status');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      webhooks.getBatchStatus(null, function (err) {
        expect(err.message).to.equal('id is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should allow limit to be set in options', function(done) {
      var options = {
        id: 'test',
        limit: 1000
      };

      webhooks.getBatchStatus(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({limit: 1000});
        done();
      });
    });
  });
});
