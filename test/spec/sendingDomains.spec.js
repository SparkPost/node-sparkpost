'use strict';

var _ = require('lodash')
  , chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Sending Domains Library', function() {
  var client, sendingDomains;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    sendingDomains = require('../../lib/sendingDomains')(client);
  });

  describe('list', function() {
    it('should call client get method with the appropriate uri', function() {
      return sendingDomains.list()
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'sending-domains'});
        });
    });
  });

  describe('get', function() {
    it('should call client get method with the appropriate uri', function() {
      return sendingDomains.get('test')
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'sending-domains/test'});
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(sendingDomains.get()).to.be.rejectedWith('domain is required');
    });
  });

  describe('create', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var sendingDomain = {
        domain: 'test'
      };

      return sendingDomains.create(sendingDomain).then(function() {
        expect(client.post.firstCall.args[0].uri).to.equal('sending-domains');
        expect(client.post.firstCall.args[0].json).to.deep.equal(sendingDomain);
      });
    });

    it('should throw an error if create options are missing', function() {
      return expect(sendingDomains.create()).to.be.rejectedWith('create options are required');
    });
  });

  describe('update', function() {
    it('should call client put method with the appropriate uri and payload', function() {
      var sendingDomain = {
        tracking_domain: 'click.example1.com'
      };

      return sendingDomains.update('test', sendingDomain)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('sending-domains/test');
          expect(client.put.firstCall.args[0].json).to.deep.equal(_.omit(sendingDomain, 'domain'));
        });
    });

    it('should throw an error if update options are missing', function() {
      return expect(sendingDomains.update('test')).to.be.rejectedWith('update options are required');
    });

    it('should throw an error if domain is missing', function() {
      return expect(sendingDomains.update()).to.be.rejectedWith('domain is required');
    });
  });

  describe('delete', function() {
    it('should call client delete method with the appropriate uri', function() {
      return sendingDomains.delete('test')
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('sending-domains/test');
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(sendingDomains.delete()).to.be.rejectedWith('domain is required');
    });
  });

  describe('verify', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var options = {
        dkim_verify: true,
        spf_verify: true
      };

      return sendingDomains.verify('test', options)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('sending-domains/test/verify');
          expect(client.post.firstCall.args[0].json).to.deep.equal(_.omit(options, 'domain'));
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(sendingDomains.verify()).to.be.rejectedWith('domain is required');
    });

    it('should throw an error if verification options are missing', function() {
      return expect(sendingDomains.verify('test')).to.be.rejectedWith('verification options are required');
    });
  });
  
});
