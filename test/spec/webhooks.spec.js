'use strict';

var _ = require('lodash')
  , chai = require('chai')
  , expect = chai.expect
  , SparkPost = require('../../lib/sparkpost')
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
      delete: sinon.stub().resolves({}),
      reject: SparkPost.prototype.reject
    };

    webhooks = require('../../lib/webhooks')(client);
  });

  describe('list Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return webhooks.list()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks');
        });
    });

    it('should allow timezone to be set in options', function() {
      var options = {
        timezone: 'America/New_York'
      };

      return webhooks.list(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({timezone: 'America/New_York'});
        });
    });

    it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return webhooks.list(cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });
  });

  describe('get Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return webhooks.get('test')
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks/test');
        });
    });

    it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return webhooks.get('test', cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.get()).to.be.rejectedWith('id is required');
    });

    it('should allow timezone to be set in options', function() {
      var options = {
        timezone: 'America/New_York'
      };

      return webhooks.get('test', options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({timezone: 'America/New_York'});
        });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var webhook = {
        name: 'Example webhook',
        target: 'http://client.example.com/example-webhook',
        events: ['delivery', 'injection', 'open', 'click']
      };

      return webhooks.create(webhook)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('webhooks');
          expect(client.post.firstCall.args[0].json).to.deep.equal(webhook);
        });
    });

    it('should call the callback once', function() {
      client.post.yields();
      let cb = sinon.stub();

      return webhooks.create({}, cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if webhook is missing', function() {
      return expect(webhooks.create()).to.be.rejectedWith('webhook object is required');
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function() {
      var webhook = {
        name: 'Renamed webhook',
        events: ['rejection', 'delay'],
        auth_type: 'none'
      };

      return webhooks.update('test', webhook)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('webhooks/test');
          expect(client.put.firstCall.args[0].json).to.deep.equal(webhook);
        });
    });

    it('should call the callback once', function() {
      client.put.yields();
      let cb = sinon.stub();

      return webhooks.update('id', {}, cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.update()).to.be.rejectedWith('id is required');
    });

    it('should throw an error if webhook is missing', function() {
      return expect(webhooks.update('test')).to.be.rejectedWith('webhook object is required');
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function() {
      return webhooks.delete('test')
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('webhooks/test');
        });
    });

    it('should call the callback once', function() {
      client.delete.yields();
      let cb = sinon.stub();

      return webhooks.delete('id', cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.delete()).to.be.rejectedWith('id is required');
    });
  });

  describe('validate Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var options = {
        message: {
          msys: {}
        }
      };

      return webhooks.validate('test', options)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('webhooks/test/validate');
          expect(client.post.firstCall.args[0].json).to.deep.equal(options);
        });
    });

    it('should call the callback once', function() {
      client.post.yields();
      let cb = sinon.stub();

      return webhooks.validate('id', { message: {} }, cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.validate()).to.be.rejectedWith('id is required');
    });

    it('should throw an error if message is missing', function() {
      return expect(webhooks.validate('test')).to.be.rejectedWith('message is required');
    });
  });

  describe('getBatchStatus Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return webhooks.getBatchStatus('test')
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks/test/batch-status');
        });
    });

    it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return webhooks.getBatchStatus('test', cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if id is missing', function() {
      return expect(webhooks.getBatchStatus()).to.be.rejectedWith('id is required');
    });

    it('should allow limit to be set in options', function() {
      var options = {
        limit: 1000
      };

      return webhooks.getBatchStatus('test', options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({limit: 1000});
        });
    });
  });

  describe('getDocumentation Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return webhooks.getDocumentation()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks/events/documentation');
        });
    });

     it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return webhooks.getDocumentation(cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });
  });

  describe('getSamples Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return webhooks.getSamples()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('webhooks/events/samples');
        });
    });

    it('should allow events to be set in options', function() {
      var options = {
        events: 'bounces'
      };

      return webhooks.getSamples(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({events: 'bounces'});
        });
    });

    it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return webhooks.getSamples(cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });
  });
});
