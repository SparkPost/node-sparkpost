'use strict';

var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Webhooks Library', function() {
  var client, webhooks;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    webhooks = require('../../lib/webhooks')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function() {
      webhooks.all()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks');
        });
    });

    it('should allow timezone to be set in options', function() {
      var options = {
        timezone: 'America/New_York'
      };

      webhooks.all(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({timezone: 'America/New_York'});
        });
    });
  });

  describe('describe Method', function() {
    it('should call client get method with the appropriate uri', function() {
      var options = {
        id: 'test'
      };

      webhooks.describe(options)
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks/test');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.describe()).to.be.rejectedWith('id is required');
    });

    it('should allow timezone to be set in options', function() {
      var options = {
        id: 'test',
        timezone: 'America/New_York'
      };

      webhooks.describe(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({timezone: 'America/New_York'});
        });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function() {
      webhooks.create({})
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('webhooks');
        });
    });

    it('should throw an error if webhook is missing', function() {
      return expect(webhooks.create()).to.be.rejectedWith('webhook object is required');
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function() {
      var webhook = {
        id: 'test'
      };

      webhooks.update(webhook)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('webhooks/test');
        });
    });

    it('should throw an error if webhook is missing', function() {
      return expect(webhooks.update()).to.be.rejectedWith('webhook object is required');
    });

    it('should throw an error if webhook.id is missing', function() {
      return expect(webhooks.update({})).to.be.rejectedWith('webhook.id is required');
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function() {
      webhooks.delete('test')
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('webhooks/test');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.delete()).to.be.rejectedWith('id is required');
    });
  });

  describe('validate Method', function() {
    it('should call client post method with the appropriate uri', function() {
      var options = {
        id: 'test',
        message: {
          msys: {}
        }
      };

      webhooks.validate(options)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('webhooks/test/validate');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.validate()).to.be.rejectedWith('id is required');
    });

    it('should throw an error if message is missing', function() {
      var options = {
        id: 'test'
      };

      return expect(webhooks.validate(options)).to.be.rejectedWith('message is required');
    });
  });

  describe('getBatchStatus Method', function() {
    it('should call client get method with the appropriate uri', function() {
      var options = {
        id: 'test'
      };

      webhooks.getBatchStatus(options)
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks/test/batch-status');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.getBatchStatus()).to.be.rejectedWith('id is required');
    });

    it('should allow limit to be set in options', function() {
      var options = {
        id: 'test',
        limit: 1000
      };

      webhooks.getBatchStatus(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({limit: 1000});
        });
    });
  });

  describe('getDocumentation Method', function() {
    it('should call client get method with the appropriate uri', function() {
      webhooks.getDocumentation()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks/events/documentation');
        });
    });
  });

  describe('getSamples Method', function() {
    it('should call client get method with the appropriate uri', function() {
      webhooks.getSamples()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks/events/samples');
        });
    });

    it('should allow events to be set in options', function() {
      var options = {
        events: 'bounces'
      };

      webhooks.getSamples(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({events: 'bounces'});
        });
    });
  });
});
