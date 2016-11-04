'use strict';

var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Relay Webhooks Library', function() {
  let client, relayWebhooks;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    relayWebhooks = require('../../lib/relayWebhooks')(client);
  });

  describe('list Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return relayWebhooks.list()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('relay-webhooks');
        });
    });
  });

  describe('get Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return relayWebhooks.get('test')
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'relay-webhooks/test'});
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(relayWebhooks.get()).to.be.rejectedWith('id is required');
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      let webhook = {
        target: 'test',
        domain: 'inbound.example.com'
      };

      return relayWebhooks.create(webhook)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('relay-webhooks');
          expect(client.post.firstCall.args[0].json).to.deep.equal(webhook);
        });
    });

    it('should throw an error if webhook object is missing', function() {
      return expect(relayWebhooks.create()).to.be.rejectedWith('webhook object is required');
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri and payload', function() {
      let webhook = {
        name: 'New Replies Webhook'
      };

      return relayWebhooks.update('test', webhook)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('relay-webhooks/test');
          expect(client.put.firstCall.args[0].json).to.deep.equal(webhook);
        });
    });

    it('should throw an error if webhook.id is missing', function() {
      return expect(relayWebhooks.update()).to.be.rejectedWith('id is required');
    });

    it('should throw an error if webhook object is missing', function() {
      return expect(relayWebhooks.update('test')).to.be.rejectedWith('webhook object is required');
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function() {
      return relayWebhooks.delete('test')
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('relay-webhooks/test');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(relayWebhooks.delete()).to.be.rejectedWith('id is required');
    });
  });
});
