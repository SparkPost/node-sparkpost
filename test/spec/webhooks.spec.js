var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , SparkPost = require('../../lib/index');

chai.use(sinonChai);

describe('Webhooks Library', function() {
  var client, webhooks;

  before(function () {
    // setting up a client for all tests to use
    var key = '12345678901234567890';

    client = new SparkPost(key);
    webhooks = require('../../lib/webhooks')(client);
  });

  it('should expose a public all method', function () {
    expect(webhooks.all).to.be.a.function;
  });

  it('should expose a public describe method', function () {
    expect(webhooks.describe).to.be.a.function;
  });

  it('should expose a public create method', function () {
    expect(webhooks.create).to.be.a.function;
  });

  it('should expose a public update method', function () {
    expect(webhooks.update).to.be.a.function;
  });

  it('should expose a public delete method', function () {
    expect(webhooks['delete']).to.be.a.function;
  });

  it('should expose a public validate method', function () {
    expect(webhooks.validate).to.be.a.function;
  });

  it('should expose a public getBatchStatus method', function () {
    expect(webhooks.getBatchStatus).to.be.a.function;
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/webhooks')
        .reply(200, { ok: true });

      webhooks.all(function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });

    it('should allow timezone to be set in options', function(done) {
      var options = {
        timezone: 'America/New_York'
      };

      nock('https://api.sparkpost.com')
        .get('/api/v1/webhooks?timezone=America%2FNew_York')
        .reply(200, { ok: true });

      webhooks.all(options, function(err, data) {
        // making sure timezone was appended to the querystring
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks?timezone=America%2FNew_York');
        done();
      });
    });
  });

  describe('describe Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/webhooks/test')
        .reply(200, { ok: true });

      webhooks.describe('test', function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks/test');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });

    it('should allow timezone to be set in options', function(done) {
      var options = {
        timezone: 'America/New_York'
      };

      nock('https://api.sparkpost.com')
        .get('/api/v1/webhooks/test?timezone=America%2FNew_York')
        .reply(200, { ok: true });

      webhooks.describe('test', options, function(err, data) {
        // making sure timezone was appended to the querystring
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks/test?timezone=America%2FNew_York');
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'post');

      nock('https://api.sparkpost.com')
        .post('/api/v1/webhooks')
        .reply(200, { ok: true });

      webhooks.create({}, function(err, data) {
        // need to make sure we called post method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks');

        SparkPost.prototype.post.restore(); // restoring function
        done();
      });
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'put');

      nock('https://api.sparkpost.com')
        .put('/api/v1/webhooks/test')
        .reply(200, { ok: true });

      var webhook = {
        id: "test"
      };

      webhooks.update(webhook, function(err, data) {
        // need to make sure we called put method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks/test');

        SparkPost.prototype.put.restore(); // restoring function
        done();
      });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'delete');

      nock('https://api.sparkpost.com')
        .delete('/api/v1/webhooks/test')
        .reply(200);

      webhooks.delete('test', function(err, data) {
        // need to make sure we called put method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks/test');

        SparkPost.prototype['delete'].restore(); // restoring function
        done();
      });
    });
  });

  describe('validate Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'post');

      nock('https://api.sparkpost.com')
        .post('/api/v1/webhooks/test/validate')
        .reply(200, { ok: true });

      webhooks.validate('test', {}, function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks/test/validate');

        SparkPost.prototype.post.restore(); // restoring function
        done();
      });
    });
  });

  describe('getBatchStatus Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/webhooks/test/batch-status')
        .reply(200, { ok: true });

      webhooks.getBatchStatus('test', function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks/test/batch-status');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });

    it('should allow timezone to be set in options', function(done) {
      var options = {
        timezone: 'America/New_York'
      };

      nock('https://api.sparkpost.com')
        .get('/api/v1/webhooks/test/batch-status?timezone=America%2FNew_York')
        .reply(200, { ok: true });

      webhooks.getBatchStatus('test', options, function(err, data) {
        // making sure timezone was appended to the querystring
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/webhooks/test/batch-status?timezone=America%2FNew_York');
        done();
      });
    });
  });
});
