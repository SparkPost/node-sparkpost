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

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return sendingDomains.all()
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'sending-domains'});
        });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return sendingDomains.find('test')
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'sending-domains/test'});
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(sendingDomains.find()).to.be.rejectedWith('domain is required');
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var sendingDomain = {
        domain: 'test'
      };

      return sendingDomains.create(sendingDomain).then(function() {
        expect(client.post.firstCall.args[0].uri).to.equal('sending-domains');
        expect(client.post.firstCall.args[0].json).to.deep.equal(sendingDomain);
      });
    });

    it('should throw an error if sendingDomain is missing', function() {
      return expect(sendingDomains.create()).to.be.rejectedWith('sending domain is required');
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri and payload', function() {
      var sendingDomain = {
        domain: 'test',
        tracking_domain: 'click.example1.com'
      };

      return sendingDomains.update(sendingDomain)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('sending-domains/test');
          expect(client.put.firstCall.args[0].json).to.deep.equal(_.omit(sendingDomain, 'domain'));
        });
    });

    it('should throw an error if sendingDomain is missing', function() {
      return expect(sendingDomains.update()).to.be.rejectedWith('sending domain is required');
    });

    it('should throw an error if domain is missing from sendingDomain', function() {
      return expect(sendingDomains.update({})).to.be.rejectedWith('sendingDomain.domain is required');
    });
  });

  describe('delete Method', function() {
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

  describe('verify Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var options = {
        domain: 'test',
        dkim_verify: true,
        spf_verify: true
      };

      return sendingDomains.verify(options)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('sending-domains/test/verify');
          expect(client.post.firstCall.args[0].json).to.deep.equal(_.omit(options, 'domain'));
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(sendingDomains.verify({})).to.be.rejectedWith('domain is required');
    });
  });
});
