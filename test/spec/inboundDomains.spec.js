'use strict';

var chai = require('chai')
  , expect = chai.expect
  , SparkPost = require('../../lib/sparkpost')
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Inbound Domains Library', function() {
  let client, inboundDomains, callback;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({}),
      reject: SparkPost.prototype.reject
    };

    callback = function() {};

    inboundDomains = require('../../lib/inboundDomains')(client);
  });

  describe('list Method', function() {
    it('should call client get method with the appropriate uri', function() {

      return inboundDomains.list(callback)
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'inbound-domains'});
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });
  });

  describe('get Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return inboundDomains.get('test', callback)
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'inbound-domains/test'});
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });


    it('should throw an error if domain is missing', function() {
      return expect(inboundDomains.get()).to.be.rejectedWith('domain is required');
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      let createOpts = {domain: 'test'};
      return inboundDomains.create(createOpts, callback)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('inbound-domains');
          expect(client.post.firstCall.args[0].json).to.deep.equal(createOpts);
          expect(client.post.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(inboundDomains.create()).to.be.rejectedWith('create options are required');
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function() {
      return inboundDomains.delete('test', callback)
        .then(function () {
          expect(client.delete.firstCall.args[0].uri).to.equal('inbound-domains/test');
          expect(client.delete.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(inboundDomains.delete()).to.be.rejectedWith('domain is required');
    });
  });
});
