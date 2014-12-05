var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , MockTransmission = require('../../mocks/transmissions.js')
  , MockConfiguration = require('../../mocks/configuration.js')
  , proxyquire = require('proxyquire')
  , sendGridCombatibility = proxyquire('../../../lib/SendGridCompatibility', {
    '../transmission': MockTransmission,
    '../configuration': MockConfiguration
  });

chai.use(sinonChai);

describe('SendGrid Compatibility', function() {
  var sendgrid = new sendGridCombatibility('asdf', 'asdf')
    , payload = {
      to:       ['fake@email.org', 'real@notreally.net'],
      toname:   ['Fakey Fakerson', 'Realy Realerson'],
      from:     'a.sender@company.com',
      fromname: 'A. Sender',
      subject:  'Sale',
      text:     'Look at this sale!',
      html:     '<h1>Look </h1><h5>at this sale!</h5>',
      bcc:      ['bcc@bbc.co.uk', 'bcc@cbc.ca'],
      replyto:  'a.replyto@company.com',
      date:     new Date(),
      files: [
        {
          filename:     'name.txt',
          path:         '../../../../../../',
          url:          'www.google.com',
          content:      '?'
        }
      ],
      file_data:  {asdf: 'asdf'},
      headers: {asdfasdf: 'asdfasdf'},
      sub: {password: ['******'], num: ['one', 'two']},
      section: {something: 'something else'}
    },
    translatedPayload = {
      recipients: [
        {
          address: {
            email: 'fake@email.org',
            name: 'Fakey Fakerson'
          }
        },
        {
          address: {
            email: 'real@notreally.net',
            name: 'Realy Realerson'
          }
        }
      ],
      from: 'a.sender@company.com <A. Sender>',
      html: '<h1>Look </h1><h5>at this sale!</h5>',
      text: 'Look at this sale!',
      subject: 'Sale',
      replyTo:  'a.replyto@company.com',
      customHeaders: {asdfasdf: 'asdfasdf'},
      substitutionData: {
        password: [ '******' ],
        num: [ 'one', 'two' ],
        something: 'something else'
      }
    };

  describe('Instantiation', function() {
    var confSpy = sinon.spy(MockConfiguration, 'setConfig');
    afterEach(function() {
      confSpy.reset();
    });

    it('should expose a send function', function() {
      expect(sendgrid.send).to.be.a.function;
    });
    it('should handle additional options', function() {
      sendgrid = new sendGridCombatibility('as', 'df', {port: '443', host: 'api.sparkpost.com', protocol: 'https'});
      expect(confSpy.args[0][0]).to.deep.equal({key: 'df', port: '443', host: 'api.sparkpost.com', protocol: 'https'});
    });
    it('should drop incompatible options', function() {
      sendgrid = new sendGridCombatibility('as', 'df', {starboard: '557', guest: '443', other: 'other'});
      expect(confSpy.args[0][0]).to.deep.equal({key: 'df'});
    });
  });

  describe('send Method', function() {
    var sendSpy = sinon.spy(MockTransmission, 'send');
    afterEach(function() {
      sendSpy.reset();
    });

    it('should handle an absence of toname', function() {
      var toPayload = { to: 'asdf@qwerty.lg.jp'};
      sendgrid.send(toPayload);
      expect(sendSpy.args[0][0].recipients).to.deep.equal([{ address: { email: 'asdf@qwerty.lg.jp' }}]);
    });

    it('should translate only substitutions into substitutionData appropriately', function() {
      var subPayload = { sub: {password: ['******'], num: ['one', 'two']}};
      sendgrid.send(subPayload);
      expect(sendSpy.args[0][0].substitutionData).to.deep.equal({ password: [ '******' ], num: [ 'one', 'two' ]});
    });

    it('should translate only sections into substitutionData appropriately', function() {
      var sectionPayload = { section: {something: 'something else'}};
      sendgrid.send(sectionPayload);
      expect(sendSpy.args[0][0].substitutionData).to.deep.equal({ something: 'something else'});
    });

    it('should not form substitutionData without substitutions or sections', function() {
      var barePayload = {};
      sendgrid.send(barePayload);
      expect(sendSpy.args[0][0].substitutionData).to.equal(undefined);
    });

    it('should translate a full payload', function() {
      sendgrid.send(payload);
      expect(sendSpy.args[0][0]).to.deep.equal(translatedPayload);
    });

//-----------------------------------------------------------------------
    it('should respond when the test succeeds', function() {
      sendgrid.send({}, function(err, res) {
        expect(res).to.be.true;
        expect(err).to.equal(null);
      });
    });
//-----------------------------------------------------------------------
    it('should return an error when the request fails', function() {
      sendgrid.send({}, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.be.true;
      });
    });
//-----------------------------------------------------------------------

  });
});
