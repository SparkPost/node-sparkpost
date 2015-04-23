var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , SparkPost = require('../../lib/index');

chai.use(sinonChai);

describe('Recipient Lists Library', function() {
  var client, recipientLists;

  before(function () {
    // setting up a client for all tests to use
    var key = '12345678901234567890';

    client = new SparkPost(key);
    recipientLists = require('../../lib/recipientLists')(client);
  });

  it('should expose a public all method', function () {
    expect(recipientLists.all).to.be.a.function;
  });

  it('should expose a public find method', function () {
    expect(recipientLists.find).to.be.a.function;
  });

  it('should expose a public create method', function () {
    expect(recipientLists.create).to.be.a.function;
  });

  it('should expose a public delete method', function () {
    expect(recipientLists['delete']).to.be.a.function;
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/recipient-lists/test')
        .reply(200, { ok: true });

      recipientLists.find('test', function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/recipient-lists/test');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });

    it('should allow show_recipients to be set in options', function(done) {
      var options = {
        show_recipients: true
      };

      nock('https://api.sparkpost.com')
        .get('/api/v1/recipient-lists/test?show_recipients=true')
        .reply(200, { ok: true });

      recipientLists.find('test', options, function(err, data) {
        // making sure show_recipients was appended to the querystring
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/recipient-lists/test?show_recipients=true');
        done();
      });
    });
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'get');

      nock('https://api.sparkpost.com')
        .get('/api/v1/recipient-lists')
        .reply(200, { ok: true });

      recipientLists.all(function(err, data) {
        // need to make sure we called get method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/recipient-lists');

        SparkPost.prototype.get.restore(); // restoring function
        done();
      });
    });
  });

  describe('create Method', function() {
    beforeEach(function() {
      nock('https://api.sparkpost.com')
        .post('/api/v1/recipient-lists')
        .reply(200, {ok: true});
    });

    it('should call client post method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'post')
        , list = [];


      nock('https://api.sparkpost.com')
        .post('/api/v1/recipient-lists')
        .reply(200, {ok: true});

      recipientLists.create(list, function(err, data) {
        // need to make sure we called post method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/recipient-lists');

        SparkPost.prototype.post.restore(); // restoring function
        done();
      });
    });

    it('should allow num_rcpt_errors to be set in options', function(done) {
      var list = []
        , options = {
          num_rcpt_errors: 3
        };

      nock('https://api.sparkpost.com')
        .post('/api/v1/recipient-lists?num_rcpt_errors=3')
        .reply(200, {ok: true});

      recipientLists.create(list, options, function(err, data) {
        // making sure num_rcpt_errors was appended to the querystring
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/recipient-lists?num_rcpt_errors=3');

        done();
      });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy(SparkPost.prototype, 'delete');

      nock('https://api.sparkpost.com')
        .delete('/api/v1/recipient-lists/test')
        .reply(200);

      recipientLists.delete('test', function(err, data) {
        // need to make sure we called post method
        expect(requestSpy.calledOnce).to.be.true;

        // making sure the correct uri was constructed
        expect(data.res.request.uri.href).to.equal('https://api.sparkpost.com:443/api/v1/recipient-lists/test');

        SparkPost.prototype['delete'].restore(); // restoring function
        done();
      });
    });
  });

});
