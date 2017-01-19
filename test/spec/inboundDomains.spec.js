'use strict';

var chai = require('chai')
  , expect = chai.expect
  , SparkPost = require('../../lib/sparkpost')
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Inbound Domains Library', function() {
  let client, inboundDomains;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({}),
      reject: SparkPost.prototype.reject
    };

    inboundDomains = require('../../lib/inboundDomains')(client);
  });

  describe('list Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return inboundDomains.list()
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'inbound-domains'});
        });
    });

    it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return inboundDomains.list(cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });


    });
  });

  describe('get Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return inboundDomains.get('test')
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'inbound-domains/test'});
        });
    });

    it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return inboundDomains.get('test', cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if domain is missing', function() {
      return expect(inboundDomains.get()).to.be.rejectedWith('domain is required');
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      let createOpts = {domain: 'test'};
      return inboundDomains.create(createOpts)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('inbound-domains');
          expect(client.post.firstCall.args[0].json).to.deep.equal(createOpts);
        });
    });

    it('should call the callback once', function() {
      let createOpts = {domain: 'test'};
      client.post.yields();
      let cb = sinon.stub();

      return inboundDomains.create(createOpts, cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if domain is missing', function() {
      return expect(inboundDomains.create()).to.be.rejectedWith('create options are required');
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function() {
      return inboundDomains.delete('test')
        .then(function () {
          expect(client.delete.firstCall.args[0].uri).to.equal('inbound-domains/test');
        });
    });

    it('should call the callback once', function() {
      client.delete.yields();
      let cb = sinon.stub();

      return inboundDomains.delete('test', cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if domain is missing', function() {
      return expect(inboundDomains.delete()).to.be.rejectedWith('domain is required');
    });
  });
});
