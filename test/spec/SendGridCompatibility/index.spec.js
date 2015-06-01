var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , nock = require('nock')
  , sendGridCompatibility = require('../../../lib/SendGridCompatibility');

chai.use(sinonChai);

describe('SendGrid Compatibility', function() {
  var sendgrid = new sendGridCompatibility('asdf', 'asdf')
    , transmissions = sendgrid.client.transmissions
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
    it('should expose a send function', function() {
      expect(sendgrid.send).to.be.a.function;
    });

    it('should handle building an endpoint from options', function() {
      var sendgrid = new sendGridCompatibility('as', 'df', {port: '5000', host: 'test.sparkpost.com', protocol: 'http'});
      expect(sendgrid.client.origin).to.equal('http://test.sparkpost.com:5000');
    });
  });

  describe('send Method', function() {
    var sendSpy, scope;

    beforeEach(function() {
      sendSpy = sinon.spy(transmissions, 'send');
      scope = nock('https://api.sparkpost.com')
        .post('/api/v1/transmissions')
        .reply(200, { ok: true });
    });

    afterEach(function() {
      transmissions.send.restore(); // restoring function
    });

    it('should handle an absence of toname', function(done) {
      var toPayload =  {to: 'asdf@qwerty.lg.jp'};
      sendgrid.send(toPayload, function() {
        expect(sendSpy.args[0][0].transmissionBody.recipients).to.deep.equal([{ address: { email: 'asdf@qwerty.lg.jp' }}]);
        done();
      });
    });

    it('should translate only substitutions into substitutionData appropriately', function(done) {
      var subPayload = { sub: {password: ['******'], num: ['one', 'two']}};
      sendgrid.send(subPayload, function() {
        expect(sendSpy.args[0][0].transmissionBody.substitutionData).to.deep.equal({ password: [ '******' ], num: [ 'one', 'two' ]});
        done();
      });
    });

    it('should translate only sections into substitutionData appropriately', function(done) {
      var sectionPayload = { section: {something: 'something else'}};
      sendgrid.send(sectionPayload, function() {
        expect(sendSpy.args[0][0].transmissionBody.substitutionData).to.deep.equal({ something: 'something else'});
        done();
      });
    });

    it('should not form substitutionData without substitutions or sections', function(done) {
      var barePayload = {};
      sendgrid.send(barePayload, function() {
        expect(sendSpy.args[0][0].transmissionBody.substitutionData).to.equal(undefined);
        done();
      });
    });

    it('should translate a full payload', function(done) {
      sendgrid.send(payload, function() {
        expect(sendSpy.args[0][0].transmissionBody).to.deep.equal(translatedPayload);
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
  });
});
