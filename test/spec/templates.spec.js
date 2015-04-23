var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , SparkPost = require('../../lib/index');

chai.use(sinonChai);

describe('Templates Library', function() {
  var client, templates;

  before(function () {
    // setting up a client for all tests to use
    var key = '12345678901234567890';

    client = new SparkPost(key);
    templates = require('../../lib/templates')(client);
  });

  it('should expose a public all method', function () {
    expect(templates.all).to.be.a.function;
  });

  it('should expose a public find method', function () {
    expect(templates.find).to.be.a.function;
  });

  it('should expose a public create method', function () {
    expect(templates.create).to.be.a.function;
  });

  it('should expose a public update method', function () {
    expect(templates.update).to.be.a.function;
  });

  it('should expose a public delete method', function () {
    expect(templates['delete']).to.be.a.function;
  });

  it('should expose a public preview method', function () {
    expect(templates.preview).to.be.a.function;
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/templates')
        .reply(200, { ok: true });

      templates.all(function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/templates/test')
        .reply(200, { ok: true });

      templates.find('test', function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates/test');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });

    it('should allow draft to be set in options', function(done) {
      var options = {
        draft: true
      };

      nock('https://api.sparkpost.com')
        .get('/api/v1/templates/test?draft=true')
        .reply(200, { ok: true });

      templates.find('test', options, function(err, data) {
        // making sure show_recipients was appended to the querystring
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates/test?draft=true');
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'post');

      nock('https://api.sparkpost.com')
        .post('/api/v1/templates')
        .reply(200, { ok: true });

      templates.create({}, function(err, data) {
        // need to make sure we called post method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates');

        SparkPost.prototype.post.restore(); // restoring function
        done();
      });
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'put');

      nock('https://api.sparkpost.com')
        .put('/api/v1/templates/test')
        .reply(200, { ok: true });

      var template = {
        id: "test"
      };

      templates.update(template, function(err, data) {
        // need to make sure we called put method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates/test');

        SparkPost.prototype.put.restore(); // restoring function
        done();
      });
    });

    it('should allow update_published to be set in options', function(done) {
      var options = {
          update_published: true
        }
        ,template = {
          id: "test"
        };

      nock('https://api.sparkpost.com')
        .put('/api/v1/templates/test?update_published=true')
        .reply(200, { ok: true });

      templates.update(template, options, function(err, data) {

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates/test?update_published=true');
        done();
      });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'delete');

      nock('https://api.sparkpost.com')
        .delete('/api/v1/templates/test')
        .reply(200);

      templates.delete('test', function(err, data) {
        // need to make sure we called put method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates/test');

        SparkPost.prototype['delete'].restore(); // restoring function
        done();
      });
    });
  });

  describe('preview Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'post');

      nock('https://api.sparkpost.com')
        .post('/api/v1/templates/test/preview')
        .reply(200, { ok: true });

      templates.preview('test', {}, function(err, data) {
        // need to make sure we called post method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates/test/preview');

        SparkPost.prototype.post.restore(); // restoring function
        done();
      });
    });

    it('should allow draft to be set in options', function(done) {
      var options = {
        draft: true
      };

      nock('https://api.sparkpost.com')
        .post('/api/v1/templates/test/preview?draft=true')
        .reply(200, { ok: true });

      templates.preview('test', {}, options, function(err, data) {
        // making sure show_recipients was appended to the querystring
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/templates/test/preview?draft=true');
        done();
      });
    });
  });
});
