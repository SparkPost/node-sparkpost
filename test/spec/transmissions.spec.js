var chai = require('chai')
  , expect = chai.expect
  , proxyquire = require('proxyquire')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , MockRequest = require('../mocks/request.js');

chai.use(sinonChai);

describe('Transmissions Library', function() {
  var TransmissionLib = require('../../lib/transmission');

  describe('Instantiation', function() {
    it('should allow for setting values on construction', function() {
      var transmission = new TransmissionLib({ campaign: 'camp'});
      expect(transmission.model.campaign_id).to.equal('camp');
    });

    it('should instantiate model props to undefined', function() {
      var transmission = new TransmissionLib();
      expect(transmission.model.campaign_id).to.be.undefined;
      expect(transmission.model.metadata).to.be.undefined;
      expect(transmission.model.substitution_data).to.be.undefined;
      expect(transmission.model.description).to.be.undefined;
      expect(transmission.model.return_path).to.be.undefined;
      expect(transmission.model.content.reply_to).to.be.undefined;
      expect(transmission.model.content.subject).to.be.undefined;
      expect(transmission.model.content.from).to.be.undefined;
      expect(transmission.model.content.html).to.be.undefined;
      expect(transmission.model.content.text).to.be.undefined;
      expect(transmission.model.content.email_rfc822).to.be.undefined;
      expect(transmission.model.content.headers).to.be.undefined;
      expect(transmission.model.recipients).to.be.an('array');
      expect(transmission.model.content.template_id).to.be.undefined;
    });

    it('should set defaults for global transmission options', function() {
      var transmission = new TransmissionLib();
      expect(transmission.model.options.open_tracking).to.be.true;
      expect(transmission.model.options.click_tracking).to.be.true;
      expect(transmission.model.content.use_draft_template).to.be.false;
    });

    it('should allow overriding defaults', function() {
      var transmission = new TransmissionLib({
        openTracking: false,
        clickTracking: false,
        useDraftTemplate: true,
        recipients: [
          {test: 'test'}
        ]
      });

      expect(transmission.model.options.open_tracking).to.be.false;
      expect(transmission.model.options.click_tracking).to.be.false;
      expect(transmission.model.content.use_draft_template).to.be.true;
      expect(transmission.model.recipients).to.deep.equal([{test: 'test'}]);
    });

    it('should set recipients to object if you pass in recipientList', function() {
      var transmission = new TransmissionLib({ recipientList: 'foo'});
      expect(transmission.model.recipients).to.deep.equal({list_name: 'foo'});
    });

  });

  describe('Convenience Methods', function() {
    it('should allow to set campaign by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setCampaign('camp');
      expect(transmission.model.campaign_id).to.equal('camp');
    });

    it('should allow to set metadata by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setMetadata('meta');
      expect(transmission.model.metadata).to.equal('meta');
    });

    it('should allow to set substitution data by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setSubstitutionData('meta');
      expect(transmission.model.substitution_data).to.equal('meta');
    });

    it('should allow to set description by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setDescription('desc');
      expect(transmission.model.description).to.equal('desc');
    });

    it('should allow to set return path by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setReturnPath('return_path');
      expect(transmission.model.return_path).to.equal('return_path');
    });

    it('should allow to set reply to by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setReplyTo('reply_to');
      expect(transmission.model.content.reply_to).to.equal('reply_to');
    });

    it('should allow to set subject by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setSubject('subj');
      expect(transmission.model.content.subject).to.equal('subj');
    });

    it('should allow to set from by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setFrom('from');
      expect(transmission.model.content.from).to.equal('from');
    });

    it('should allow to set html part by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setHTMLContent('<p>html</p>');
      expect(transmission.model.content.html).to.equal('<p>html</p>');
    });

    it('should allow to set text part by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.setTextContent('text part');
      expect(transmission.model.content.text).to.equal('text part');
    });

    it('should allow to set recipient by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.addRecipient('recipients').addRecipient('test');
      expect(transmission.model.recipients).to.deep.equal(['recipients', 'test']);
    });

    it('should allow you to set recipients after a list was passed in', function() {
      var transmission = new TransmissionLib({ recipientList: 'foo'});
      transmission.addRecipient('test');
      expect(transmission.model.recipients).to.deep.equal(['test']);
    });

    it('should allow you to set recipients after a list was set', function() {
      var transmission = new TransmissionLib();
      transmission.useRecipientList('listname').addRecipient('test');
      expect(transmission.model.recipients).to.deep.equal(['test']);
    });

    it('should allow to set recipient list by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.useRecipientList('recipient list');
      expect(transmission.model.recipients.list_name).to.equal('recipient list');
    });

    it('should allow you to set multiple recipients at one time by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.addRecipients([{foo: 'bar'}, {bat: 'baz'}]);
      expect(transmission.model.recipients).to.deep.equal([{foo: 'bar'}, {bat: 'baz'}]);
    });

    it('should allow you to set multiple recipients after a list was set', function() {
      var transmission = new TransmissionLib();
      transmission.useRecipientList('my-list');
      transmission.addRecipients([{foo: 'bar'}, {bat: 'baz'}]);
      expect(transmission.model.recipients).to.deep.equal([{foo: 'bar'}, {bat: 'baz'}]);
    });

    it('should allow you to set a recipient list after adding multiple recipients', function() {
      var transmission = new TransmissionLib();
      transmission.addRecipients([{foo: 'bar'}, {bat: 'baz'}]);
      transmission.useRecipientList('my-list');
      expect(transmission.model.recipients).to.be.an.object;
      expect(transmission.model.recipients.list_name).to.equal('my-list');
    });

    it('should allow to set stored template by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.useStoredTemplate('template ID');
      expect(transmission.model.content.template_id).to.equal('template ID');
    });

    it('should allow for chaining of convenience methods', function() {
      var transmission = new TransmissionLib();
      transmission.setCampaign('camp').setContentHeaders('foo').setRfc822Content('bar');
      expect(transmission.model.campaign_id).to.equal('camp');
      expect(transmission.model.content.email_rfc822).to.equal('bar');
      expect(transmission.model.content.headers).to.equal('foo');
    });

    it('should allow enabling open tracking by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.enableOpenTracking();
      expect(transmission.model.options.open_tracking).to.be.true;
    });

    it('should allow disabling open tracking by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.disableOpenTracking();
      expect(transmission.model.options.open_tracking).to.be.false;
    });

    it('should allow enabling click tracking by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.enableClickTracking();
      expect(transmission.model.options.click_tracking).to.be.true;
    });

    it('should allow disabling click tracking by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.disableClickTracking();
      expect(transmission.model.options.click_tracking).to.be.false;
    });

    it('should allow using a draft version of a stored template by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.useDraftTemplate();
      expect(transmission.model.content.use_draft_template).to.be.true;
    });

    it('should allow using a published version of a stored template by convenience method', function() {
      var transmission = new TransmissionLib();
      transmission.usePublishedTemplate();
      expect(transmission.model.content.use_draft_template).to.be.false;
    });
  });

  describe('API Interaction', function() {
    var TransmissionLib
    , transmission;

    beforeEach(function() {
      TransmissionLib = proxyquire('../../lib/transmission', {
        'request': MockRequest
      });
      transmission = new TransmissionLib();
    });

    describe('Fetch', function() {
      it('should handle being wrapped by find appropriately', function() {
        transmission.all(function(err, res) {
          expect(err).to.be.null;
          expect(res.results).to.match(/success/);
        });
        MockRequest.restore();
      });

      it('should handle being wrapped by all appropriately', function() {
        transmission.find(10, function(err, res) {
          expect(err).to.be.null;
          expect(res.results).to.match(/success/);
        });
        MockRequest.restore();
      });

      it('should return an error', function(done) {
        MockRequest.error = 'test';
        transmission.find(10, function(err, res) {
          expect(err).to.match(/Unable to contact Transmissions API: test/);
          expect(res).to.be.undefined;
          done();
        });
        MockRequest.restore();
      });

      it('should return an error if the status code is 404', function(done) {
        MockRequest.response.statusCode = 404;
        transmission.find(10, function(err, res) {
          expect(err).to.match(/The specified Transmission ID does not exist/);
          expect(res).to.be.undefined;
          done();
        });
        MockRequest.restore();
      });

      it('should return an error if the status code is anything other than 200', function(done) {
        MockRequest.response.statusCode = 500;
        transmission.find(10, function(err, res) {
          expect(err).to.match(/Received bad response from Transmission API: 500/);
          expect(res).to.be.undefined;
          done();
        });
        MockRequest.restore();
      });

      it('should return a body on success', function(done) {
        transmission.find(10, function(err, res) {
          expect(err).to.be.null;
          expect(res.results).to.match(/success/);
          done();
        });
      });

      it('should construct a URL appropriately based on global configuration', function(done) {
        var fetchSpy = sinon.spy(MockRequest, 'get');
        transmission.options = {key: '123', host: 'example.com', protocol: 'http', baseUrl: '/api/v1/transmission'};
        transmission.all(function(err, res) {
          expect(fetchSpy.args[0][0].url).to.equal('http://example.com/api/v1/transmission');
          done();
        });
      });
    });

    describe('Send', function() {

      it('should construct a URL appropriately based on global configuration', function(done) {
        var sendSpy = sinon.spy(MockRequest, 'post');
        transmission.options = {key: '123', host: 'example.com', protocol: 'http', baseUrl: '/api/v1/transmission'};
        transmission.send(function(err, res) {
          expect(sendSpy.args[0][0].url).to.equal('http://example.com/api/v1/transmission');
          done();
        });
      });

      it('should return an error', function(done) {
        MockRequest.error = 'test';
        transmission.send(function(err, res) {
          expect(err).to.match(/test/);
          expect(res).to.be.undefined;
          done();
        });
        MockRequest.restore();
      });

      it('should return an error if the status code is anything other than 200', function(done) {
        MockRequest.response.statusCode = 500;
        MockRequest.response.body.errors[0] = 'first error';
        transmission.send(function(err, res) {
          expect(err[0]).to.equal('first error');
          expect(res).to.be.undefined;
          done();
        });
        MockRequest.restore();
      });

      it('should return a body on success', function(done) {
        transmission.send(function(err, res) {
          expect(err).to.be.null;
          expect(res.results).to.match(/success/);
          done();
        });
      });
    });
  });
});
