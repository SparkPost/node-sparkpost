'use strict';

var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Transmissions Library', function() {
  var client, transmissions;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({})
    };

    transmissions = require('../../lib/transmissions')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return transmissions.list()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('transmissions');
        });
    });

    it('should call client get method with the appropriate uri using callback', function(done) {
      transmissions.list(function() {
        expect(client.get.firstCall.args[0].uri).to.equal('transmissions');
        done();
      });
    });

    it('should allow campaign_id to be set in options', function() {
      var options = {
        campaign_id: 'test-campaign'
      };

      return transmissions.list(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({campaign_id: 'test-campaign'});
        });
    });

    it('should allow template_id to be set in options', function() {
      var options = {
        template_id: 'test-template'
      };

      return transmissions.list(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({template_id: 'test-template'});
        });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return transmissions.get('test')
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'transmissions/test'});
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(transmissions.get()).to.be.rejectedWith('id is required');
    });
  });

  describe('send Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var transmission = {
        campaign_id: 'test-campaign'
      };

      return transmissions.send(transmission)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('transmissions');
          expect(client.post.firstCall.args[0].json).to.deep.equal(transmission);
        });
    });

    it('should throw an error if transmission object is missing', function() {
      return expect(transmissions.send(function() {})).to.be.rejectedWith('transmission object is required');
    });

    it('should allow num_rcpt_errors to be set in options', function() {
      var transmission = {
          campaign_id: 'test-campaign'
        }
        , options = {
          num_rcpt_errors: 3
        };

      return transmissions.send(transmission, options)
        .then(function() {
          expect(client.post.firstCall.args[0].qs).to.deep.equal({num_rcpt_errors: 3});
        });
    });

    it('should not throw an error if optional 2nd argument is a function (callback)', function() {
      let cb = sinon.stub()
        , transmission = {
          campaign_id: 'test-campaign'
        };
      return transmissions.send(transmission, cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should leave email_rfc822 content keys intact', function() {
      var options = {
        content: {
          email_rfc822: 'Content-Type: text/plain\nFrom: From Envelope <from@example.com>\nSubject: Example Email\n\nHello World'
        }
      };

      return transmissions.send(options)
        .then(function() {
          expect(client.post.firstCall.args[0].json.content).to.have.property('email_rfc822');
        });
    });
  });
});
