var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , sendGridCompatibility = require('../../../lib/SendGridCompatibility');

chai.use(sinonChai);

describe('SendGrid Compatibility', function() {
  var sendgrid = new sendGridCompatibility('asdf', 'asdf')
    , transmission = sendgrid.client.transmission
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
    /*var confSpy = sinon.spy(MockConfiguration, 'setConfig');
    afterEach(function() {
      confSpy.reset();
    });*/

    it('should expose a send function', function() {
      expect(sendgrid.send).to.be.a.function;
    });
    /*it('should handle additional options', function() {
      sendgrid = new sendGridCompatibility('as', 'df', {port: '443', host: 'api.sparkpost.com', protocol: 'https'});
      expect(confSpy.args[0][0]).to.deep.equal({key: 'df', port: '443', host: 'api.sparkpost.com', protocol: 'https'});
    });
    it('should drop incompatible options', function() {
      sendgrid = new sendGridCompatibility('as', 'df', {starboard: '557', guest: '443', other: 'other'});
      expect(confSpy.args[0][0]).to.deep.equal({key: 'df'});
    });*/
  });

  describe('send Method', function() {
    var sendSpy, scope;

    beforeEach(function() {
      sendSpy = sinon.spy(transmission, 'send');
      scope = nock('https://api.sparkpost.com')
        .post('/api/v1/transmissions')
        .reply(200, { ok: true });
    });

    afterEach(function() {
      transmission.send.restore(); // restoring function
    });

    it('should handle an absence of toname', function(done) {
      var toPayload = { to: 'asdf@qwerty.lg.jp'};
      sendgrid.send(toPayload, function() {
        expect(sendSpy.args[0][0].recipients).to.deep.equal([{ address: { email: 'asdf@qwerty.lg.jp' }}]);
        done();
      });
    });

    it('should translate only substitutions into substitutionData appropriately', function(done) {
      var subPayload = { sub: {password: ['******'], num: ['one', 'two']}};
      sendgrid.send(subPayload, function() {
        expect(sendSpy.args[0][0].substitutionData).to.deep.equal({ password: [ '******' ], num: [ 'one', 'two' ]});
        done();
      });
    });

    it('should translate only sections into substitutionData appropriately', function(done) {
      var sectionPayload = { section: {something: 'something else'}};
      sendgrid.send(sectionPayload, function() {
        expect(sendSpy.args[0][0].substitutionData).to.deep.equal({ something: 'something else'});
        done();
      });
    });

    it('should not form substitutionData without substitutions or sections', function(done) {
      var barePayload = {};
      sendgrid.send(barePayload, function() {
        expect(sendSpy.args[0][0].substitutionData).to.equal(undefined);
        done();
      });
    });

    it('should translate a full payload', function(done) {
      sendgrid.send(payload, function() {
        expect(sendSpy.args[0][0]).to.deep.equal(translatedPayload);
        done();
      });
    });

    it('should respond when the test succeeds', function(done) {
      sendgrid.send({}, function(err, res) {
        expect(res.body.ok).to.be.true;
        expect(err).to.equal(null);
        done();
      });
    });

    /*it('should return an error when the request fails', function(done) {
      nock.cleanAll();
      var scope2 = nock('https://api.sparkpost.com')
        .log(console.log)
        .post('/api/v1/transmissions')
        .replyWithError('something awful happened');

      /*sendgrid.send({}, function(err, res) {
        expect(res).to.be.undefined;
        expect(err).to.be.defined;
        done();
      });
    });*/
  });
});
