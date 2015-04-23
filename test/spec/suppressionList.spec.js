var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , SparkPost = require('../../lib/index');

chai.use(sinonChai);

describe('Suppression List Library', function() {
  var client, suppressionList;

  before(function () {
    // setting up a client for all tests to use
    var key = '12345678901234567890';

    client = new SparkPost(key);
    suppressionList = require('../../lib/suppressionList')(client);
  });

  it('should expose a public search method', function () {
    expect(suppressionList.search).to.be.a.function;
  });

  it('should expose a public checkStatus method', function () {
    expect(suppressionList.checkStatus).to.be.a.function;
  });

  it('should expose a public removeStatus method', function () {
    expect(suppressionList.removeStatus).to.be.a.function;
  });

  it('should expose a public upsert method', function () {
    expect(suppressionList.upsert).to.be.a.function;
  });

  describe('search Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/suppression-list?limit=5')
        .reply(200, { ok: true });

      suppressionList.search({limit: 5}, function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/suppression-list?limit=5');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });
  });

  describe('checkStatus Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/suppression-list/test@test.com')
        .reply(200, { ok: true });

      suppressionList.checkStatus('test@test.com', function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/suppression-list/test@test.com');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });
  });

  describe('removeStatus Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'delete');

      nock('https://api.sparkpost.com')
        .delete('/api/v1/suppression-list/test@test.com')
        .reply(200);

      suppressionList.removeStatus('test@test.com', function(err, data) {
        // need to make sure we called delete method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/suppression-list/test@test.com');

        SparkPost.prototype['delete'].restore(); // restoring function
        done();
      });
    });
  });

  describe('upsert Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'put');

      nock('https://api.sparkpost.com')
        .put('/api/v1/suppression-list/test@test.com')
        .reply(200, { ok: true });

      suppressionList.upsert({email: 'test@test.com'}, function(err, data) {
        // need to make sure we called put method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/suppression-list/test@test.com');

        SparkPost.prototype.put.restore(); // restoring function
        done();
      });
    });

    it('should accept an array of recipients for bulk upsert', function(done) {
      var recipients = [
        {email: 'test1@test.com'}
        , {email: 'test2@test.com'}
      ];
      nock('https://api.sparkpost.com')
        .put('/api/v1/suppression-list')
        .reply(200, { ok: true });

      suppressionList.upsert(recipients, function(err, data) {
        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/suppression-list');
        done();
      });
    });
  });
});
