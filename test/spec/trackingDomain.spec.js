'use strict';

var _ = require('lodash')
  , chai = require('chai')
  , expect = chai.expect
  , SparkPost = require('../../lib/sparkpost')
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Tracking Domains Library', function() {
  var client, trackingDomains, callback;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({}),
      reject: SparkPost.prototype.reject
    };

    callback = function() {};

    trackingDomains = require('../../lib/trackingDomains')(client);
  });

  describe('list', function() {
    it('should call client get method with the appropriate uri', function() {
      return trackingDomains.list({}, callback)
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'tracking-domains', qs: {}});
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should call client get method with the default option', function() {
      return trackingDomains.list({ default: true }, callback)
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'tracking-domains', qs: { default: true }});
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should call client get method with subacounts options', function() {
      return trackingDomains.list({subaccounts: [ 1, 3]}, callback)
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'tracking-domains', qs: {subaccounts: [1, 3]}});
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });
  });

  describe('get', function() {
    it('should call client get method with the appropriate uri', function() {
      return trackingDomains.get('test', callback)
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'tracking-domains/test'});
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(trackingDomains.get()).to.be.rejectedWith('domain is required');
    });
  });

  describe('create', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var trackingDomain = {
        domain: 'test'
      };

      return trackingDomains.create(trackingDomain, callback).then(function() {
        expect(client.post.firstCall.args[0].uri).to.equal('tracking-domains');
        expect(client.post.firstCall.args[0].json).to.deep.equal(trackingDomain);
        expect(client.post.firstCall.args[1]).to.equal(callback);
      });
    });

    it('should throw an error if create options are missing', function() {
      return expect(trackingDomains.create()).to.be.rejectedWith('create options are required');
    });
  });

  describe('update', function() {
    it('should call client put method with the appropriate uri and payload', function() {
      var trackingDomain = {
        tracking_domain: 'click.example1.com'
      };

      return trackingDomains.update('test', trackingDomain, callback)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('tracking-domains/test');
          expect(client.put.firstCall.args[0].json).to.deep.equal(_.omit(trackingDomain, 'domain'));
          expect(client.put.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if update options are missing', function() {
      return expect(trackingDomains.update('test')).to.be.rejectedWith('update options are required');
    });

    it('should throw an error if domain is missing', function() {
      return expect(trackingDomains.update()).to.be.rejectedWith('domain is required');
    });
  });

  describe('delete', function() {
    it('should call client delete method with the appropriate uri', function() {
      return trackingDomains.delete('test', callback)
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('tracking-domains/test');
          expect(client.delete.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(trackingDomains.delete()).to.be.rejectedWith('domain is required');
    });
  });

  describe('verify', function() {
    it('should call client post method with the appropriate uri and payload', function() {

      return trackingDomains.verify('test', callback)
        .then(function() {

          expect(client.post.firstCall.args[0].uri).to.equal('tracking-domains/test/verify');
          expect(client.post.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(trackingDomains.verify()).to.be.rejectedWith('domain is required');
    });
  });

});
