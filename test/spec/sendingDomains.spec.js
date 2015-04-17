var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , SparkPost = require('../../lib/index');

chai.use(sinonChai);

describe('Sending Domains Library', function() {
  var client, sendingDomains;

  before( function() {
    // setting up a client for all tests to use
    var key = '12345678901234567890';

    client = new SparkPost( key );
    sendingDomains = require('../../lib/sendingDomains')(client);
  });

  it('should expose a public all method', function() {
    expect(sendingDomains.all).to.be.a.function;
  });

  it('should expose a public find method', function() {
    expect(sendingDomains.find).to.be.a.function;
  });

  it('should expose a public create method', function() {
    expect(sendingDomains.create).to.be.a.function;
  });

  it('should expose a public update method', function() {
    expect(sendingDomains.update).to.be.a.function;
  });

  it('should expose a public verify method', function() {
    expect(sendingDomains.verify).to.be.a.function;
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy( SparkPost.prototype, 'get' );

      var scope = nock('https://api.sparkpost.com')
        .get('/api/v1/sending-domains/test')
        .reply(200, { ok: true });

      sendingDomains.find('test', function(err, data) {
        // need to make sure we called get method
        expect( requestSpy.calledOnce ).to.be.true;

        // making sure the correct uri was constructed
        expect( data.request.uri.href ).to.equal( 'https://api.sparkpost.com:443/api/v1/sending-domains/test' );

        SparkPost.prototype.get.restore(); // restoring function
        scope.done();
        done();
      });
    });
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy( SparkPost.prototype, 'get' );

      var scope = nock('https://api.sparkpost.com')
        .get('/api/v1/sending-domains')
        .reply(200, { ok: true });

      sendingDomains.all(function(err, data) {
        // need to make sure we called get method
        expect( requestSpy.calledOnce ).to.be.true;

        // making sure the correct uri was constructed
        expect( data.request.uri.href ).to.equal( 'https://api.sparkpost.com:443/api/v1/sending-domains' );

        SparkPost.prototype.get.restore(); // restoring function
        scope.done();
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy( SparkPost.prototype, 'post' );

      var scope = nock('https://api.sparkpost.com')
        .post('/api/v1/sending-domains')
        .reply(200, { ok: true });

      var domainBody = {
        domainName: "SampleDomain"
      };

      sendingDomains.create(domainBody, function(err, data) {
        // need to make sure we called post method
        expect( requestSpy.calledOnce ).to.be.true;

        // making sure the correct uri was constructed
        expect( data.request.uri.href ).to.equal( 'https://api.sparkpost.com:443/api/v1/sending-domains' );

        SparkPost.prototype.post.restore(); // restoring function
        scope.done();
        done();
      });
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var requestSpy = sinon.spy( SparkPost.prototype, 'put' );

      var scope = nock('https://api.sparkpost.com')
        .put('/api/v1/sending-domains/SampleDomain')
        .reply(200, { ok: true });

      var domainBody = {
        domainName: "SampleDomain"
      };

      sendingDomains.update(domainBody, function(err, data) {
        // need to make sure we called put method
        expect( requestSpy.calledOnce ).to.be.true;

        // making sure the correct uri was constructed
        expect( data.request.uri.href ).to.equal( 'https://api.sparkpost.com:443/api/v1/sending-domains/SampleDomain' );

        SparkPost.prototype.put.restore(); // restoring function
        scope.done();
        done();
      });
    });
  });

  describe('verify Method', function() {
    var requestSpy, scope;

    beforeEach(function() {
      requestSpy = sinon.spy( SparkPost.prototype, 'post' );
      scope = nock('https://api.sparkpost.com')
        .post('/api/v1/sending-domains/SampleDomain/verify')
        .reply(200, { ok: true });
    });

    afterEach(function() {
      SparkPost.prototype.post.restore(); // restoring function
      scope.done();
    });

    it('should call client post method with the appropriate uri', function(done) {

      sendingDomains.verify('SampleDomain', function(err, data) {
        // need to make sure we called get method
        expect( requestSpy.calledOnce ).to.be.true;

        // making sure the correct uri was constructed
        expect( data.request.uri.href ).to.equal( 'https://api.sparkpost.com:443/api/v1/sending-domains/SampleDomain/verify' );
        done();
      });
    });

    it('should allow dkim_verify to be overridden', function(done) {
      var options = {
        dkim_verify: false
      };

      sendingDomains.verify('SampleDomain', options, function(err, data) {
        // need to make sure we called get method
        expect( requestSpy.calledOnce ).to.be.true;

        // making sure the correct uri was constructed
        expect( data.request.uri.href ).to.equal( 'https://api.sparkpost.com:443/api/v1/sending-domains/SampleDomain/verify' );
        done();
      });
    });

    it('should allow spf_verify to be overridden', function(done) {
      var options = {
        spf_verify: false
      };

      sendingDomains.verify('SampleDomain', options, function(err, data) {
        // need to make sure we called get method
        expect( requestSpy.calledOnce ).to.be.true;

        // making sure the correct uri was constructed
        expect( data.request.uri.href ).to.equal( 'https://api.sparkpost.com:443/api/v1/sending-domains/SampleDomain/verify' );
        done();
      });
    });
  });
});
