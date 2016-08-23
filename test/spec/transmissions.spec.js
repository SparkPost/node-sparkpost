var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , Promise = require('../../lib/Promise');

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
    it('should call client get method with the appropriate uri', function(done) {
      transmissions.all(function() {
        expect(client.get.firstCall.args[0].uri).to.equal('transmissions');
        done();
      });
    });

    it('should allow campaign_id to be set in options', function(done) {
      var options = {
        campaign_id: 'test-campaign'
      };

      transmissions.all(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({campaign_id: 'test-campaign'});
        done();
      });
    });

    it('should allow template_id to be set in options', function(done) {
      var options = {
        template_id: 'test-template'
      };

      transmissions.all(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({template_id: 'test-template'});
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      transmissions.find('test', function() {
        expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'transmissions/test'});
        done();
      });
    });

    it('should throw an error if id is null', function() {
      return expect(transmissions.find(null)).to.be.rejectedWith('id is required');
    });

    it('should throw an error if id is missing', function() {
      return expect(transmissions.find(function() {})).to.be.rejectedWith('id is required');
    });
  });

  describe('send Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        campaign_id: 'test-campaign'
      };

      transmissions.send(options, function() {
        expect(client.post.firstCall.args[0].uri).to.equal('transmissions');
        done();
      });
    });

    it('should throw an error if options object is missing', function() {
      return expect(transmissions.send(function() {})).to.be.rejectedWith('options object is required');
    });

    it('should allow num_rcpt_errors to be set in options', function(done) {
      var options = {
        campaign_id: 'test-campaign',
        num_rcpt_errors: 3
      };

      transmissions.send(options, function(err, data) {
        expect(client.post.firstCall.args[0].qs).to.deep.equal({num_rcpt_errors: 3});
        done();
      });
    });

    it('should leave email_rfc822 content keys intact', function(done) {
      var options = {
        content: {
          email_rfc822: 'Content-Type: text/plain\nFrom: From Envelope <from@example.com>\nSubject: Example Email\n\nHello World'
        }
      };

      transmissions.send(options, function(err, data) {
        expect(client.post.firstCall.args[0].json.content).to.have.property('email_rfc822');
        done();
      });
    });
  });
});
