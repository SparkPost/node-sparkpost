var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Message Events Library', function() {
  var client, templates;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields()
    };

    messageEvents = require('../../lib/messageEvents')(client);
  });

  describe('search Method', function() {
    it('should call client get method with the appropriate parameters', function(done) {
      var options = {
        bounce_classes: '10,50',
        campaign_ids: 'test_campaign',
        events: 'bounce',
        friendly_froms: 'bob@example.com',
        from: '2015-11-14T16:15',
        message_ids: '0e0d94b7-9085-4e3c-ab30-e3f2cd9c273e',
        page: 1,
        per_page: 5,
        reason: '%5.2.0%',
        recipients: 'jim@example.com',
        template_ids: 'newsletter_template',
        timezone: 'America/New_York',
        to: '2016-11-14T16:15',
        transmission_ids: '65832150921904138'
      };
      messageEvents.search(options, function(err, data) {
        Object.keys(options).forEach(function(key) {
          expect(client.get.firstCall.args[0].qs).to.have.property(key).and.equal(options[key]);
        });
        done();
      });
    });

    it('should accept arrays as parameters where appropriate', function(done) {
      var arroptions = {
        bounce_classes: [10,50],
        campaign_ids: ['campaign1', 'campaignTwo'],
        events: ['bounce', 'out_of_band'],
        friendly_froms: ['bob@example.com', 'jim@example.com'],
        message_ids: ['0e0d94b7-9085-4e3c-ab30-e3f2cd9c273e', '338ac622-4321-5678-0123456789'],
        recipients: ['jim@example.com', 'bob@example.com'],
        template_ids: ['newsletter_template', 'newsflash_template'],
        transmission_ids: ['65832150921904138', '54673829032039839'],
        page: 1,
        per_page: 5,
        timezone: 'America/New_York'
      };
      messageEvents.search(arroptions, function(err, data) {
        Object.keys(arroptions).forEach(function(key) {
          var opt = arroptions[key]
            , firstCallQS = client.get.firstCall.args[0].qs;
          if (Array.isArray(opt)) {
            expect(firstCallQS).to.have.property(key).and.equal(opt.toString());
          }
        });
        done();
      });
    });
  });
});
