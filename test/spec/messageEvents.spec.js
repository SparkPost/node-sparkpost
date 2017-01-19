'use strict';

var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Message Events Library', function() {
  let client, messageEvents, callback;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({})
    };

    callback = function() {};

    messageEvents = require('../../lib/messageEvents')(client);
  });

  describe('search Method', function() {
    it('should call client get method with the appropriate parameters', function() {
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
      return messageEvents.search(options, callback)
        .then(function() {
          Object.keys(options).forEach(function(key) {
            expect(client.get.firstCall.args[0].qs).to.have.property(key).and.equal(options[key]);
          });
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should accept arrays as parameters where appropriate', function() {
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
      return messageEvents.search(arroptions)
        .then(function() {
          Object.keys(arroptions).forEach(function(key) {
            var opt = arroptions[key]
              , firstCallQS = client.get.firstCall.args[0].qs;
            if (Array.isArray(opt)) {
              expect(firstCallQS).to.have.property(key).and.equal(opt.toString());
            }
          });
        });
    });
  });
});
