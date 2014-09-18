var chai = require('chai')
  , expect = chai.expect
  , proxyquire = require('proxyquire');

describe('This is a test', function() {
  var transmission = require('../../lib/transmission');

  it('should allow for setting values on construction', function() {
    var sdk = new transmission({ campaign: 'camp'});
    expect(sdk.model.campaign_id).to.equal('camp');
  });

  it('should instantiate model props to undef', function() {
    var sdk = new transmission();
    expect(sdk.model.campaign_id).to.be.undefined;
    expect(sdk.model.metadata).to.be.undefined;
    expect(sdk.model.substitution_data).to.be.undefined;
    expect(sdk.model.description).to.be.undefined;
    expect(sdk.model.return_path).to.be.undefined;
    expect(sdk.model.content.reply_to).to.be.undefined;
    expect(sdk.model.content.subject).to.be.undefined;
    expect(sdk.model.content.from).to.be.undefined;
    expect(sdk.model.content.html).to.be.undefined;
    expect(sdk.model.content.text).to.be.undefined;
    expect(sdk.model.content.email_rfc822).to.be.undefined;
    expect(sdk.model.content.headers).to.be.undefined;
    expect(sdk.model.recipients).to.be.undefined;
    expect(sdk.model.list_name).to.be.undefined;
    expect(sdk.model.content.template_id).to.be.undefined;
  });

  it('should allow to set campaign by convenience method', function() {
    var sdk = new transmission();
    sdk.setCampaign('camp');
    expect(sdk.model.campaign_id).to.equal('camp');
  });

  it('should allow to set metadata by convenience method', function() {
    var sdk = new transmission();
    sdk.setMetadata('meta');
    expect(sdk.model.metadata).to.equal('meta');
  });

  it('should allow to set substitution data by convenience method', function() {
    var sdk = new transmission();
    sdk.setSubstitutionData('meta');
    expect(sdk.model.substitution_data).to.equal('meta');
  });

  it('should allow to set description by convenience method', function() {
    var sdk = new transmission();
    sdk.setDescription('desc');
    expect(sdk.model.description).to.equal('desc');
  });

  it('should allow to set return path by convenience method', function() {
    var sdk = new transmission();
    sdk.setReturnPath('return_path');
    expect(sdk.model.return_path).to.equal('return_path');
  });

  it('should allow to set reply to by convenience method', function() {
    var sdk = new transmission();
    sdk.setReplyTo('reply_to');
    expect(sdk.model.content.reply_to).to.equal('reply_to');
  });

  it('should allow to set subject by convenience method', function() {
    var sdk = new transmission();
    sdk.setSubject('subj');
    expect(sdk.model.content.subject).to.equal('subj');
  });

  it('should allow to set from by convenience method', function() {
    var sdk = new transmission();
    sdk.setFrom('from');
    expect(sdk.model.content.from).to.equal('from');
  });

  it('should allow to set html part by convenience method', function() {
    var sdk = new transmission();
    sdk.setHTMLContent('<p>html</p>');
    expect(sdk.model.content.html).to.equal('<p>html</p>');
  });

  it('should allow to set text part by convenience method', function() {
    var sdk = new transmission();
    sdk.setTextContent('text part');
    expect(sdk.model.content.text).to.equal('text part');
  });

  it('should allow to set recipients by convenience method', function() {
    var sdk = new transmission();
    sdk.setRecipients('recipients');
    expect(sdk.model.recipients).to.equal('recipients');
  });

  it('should allow to set recipient list by convenience method', function() {
    var sdk = new transmission();
    sdk.useRecipientList('recipient list');
    expect(sdk.model.list_name).to.equal('recipient list');
  });

  it('should allow to set stored template by convenience method', function() {
    var sdk = new transmission();
    sdk.useStoredTemplate('template ID');
    expect(sdk.model.content.template_id).to.equal('template ID');
  });

  it('should allow for chaining of convenience methods', function() {
    var sdk = new transmission();
    sdk.setCampaign('camp').setContentHeaders('foo').setRfc822Content('bar');
    expect(sdk.model.campaign_id).to.equal('camp');
    expect(sdk.model.content.email_rfc822).to.equal('bar');
    expect(sdk.model.content.headers).to.equal('foo');
  });
});

describe('#fetch', function() {
  it('should return error', function(done) {
    var reqMock = {
      get: function(url, callbackFunction) {
        var response = {error: 'test'};
        callbackFunction(response.error, {statusCode: response.status}, response.body);
       }
    }

    var transmission = proxyquire('../../lib/transmission', {
      'request': reqMock
    });

    var sdk = new transmission();
    sdk.fetch(10, function(resp) {
      expect(resp).to.match(/Unable to contact Transmissions API: test/);
      done();
    });
  });

  it('should return an error if the status code is 404', function(done) {
    var reqMock = {
      get: function(url, callbackFunction) {
        var response = {error: null, status: 404};
        callbackFunction(response.error, {statusCode: response.status}, response.body);
       }
    }

    var transmission = proxyquire('../../lib/transmission', {
      'request': reqMock
    });

    var sdk = new transmission();
    sdk.fetch(10, function(resp) {
      expect(resp).to.match(/The specified Transmission ID does not exist/);
      done();
    });
  });

  it('should return an error if the response status code is anything other than 200', function(done) {
    var reqMock = {
      get: function(url, callbackFunction) {
        var response = {error: null, status: 500};
        callbackFunction(response.error, {statusCode: response.status}, response.body);
       }
    }

    var transmission = proxyquire('../../lib/transmission', {
      'request': reqMock
    });

    var sdk = new transmission();
    sdk.fetch(10, function(resp) {
      expect(resp).to.match(/Received bad response from Transmission API: 500/);
      done();
    });
  });

  it('should return a body', function(done) {
    var reqMock = {
      get: function(url, callbackFunction) {
        var response = {error: null, status: 200, body: 'response body'};
        callbackFunction(response.error, {statusCode: response.status}, response.body);
       }
    }

    var transmission = proxyquire('../../lib/transmission', {
      'request': reqMock
    });

    var sdk = new transmission();
    sdk.fetch(10, function(err, body) {
      expect(err).to.be.null;
      expect(body).to.match(/response body/);
      done();
    });
  });
});
