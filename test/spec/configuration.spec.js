var chai = require('chai')
  , expect = chai.expect;

describe('Configuration library', function() {
  var configuration = require('../../lib/configuration');

  it('should throw an error if an API key is not provided', function() {
    expect(function() { configuration.setConfig({host: 'example.com'}); }).to.throw('You must provide an API key');
  });

  it('should throw an error if no configuration is provided', function() {
    expect(function() { configuration.setConfig(); }).to.throw('You must provide an API key');
  });

  it('should set default values if user does not provide values', function() {
    configuration.setConfig({key: '123'});
    expect(configuration.options.host).to.equal('app.cloudplaceholder.com');
    expect(configuration.options.port).to.equal('443');
    expect(configuration.options.schema).to.equal('https');
    expect(configuration.options.strictSSL).to.be.true;
    expect(configuration.options.key).to.equal('123');
    expect(configuration.options.version).to.equal('v1');
  });

  it('should override all defaults if a user provides all options', function() {
    configuration.setConfig({host: 'reddit.com', schema: 'http', port: '80', strictSSL: false, key: '123', version: 'v3'});
    expect(configuration.options.host).to.equal('reddit.com');
    expect(configuration.options.port).to.equal('80');
    expect(configuration.options.schema).to.equal('http');
    expect(configuration.options.strictSSL).to.be.false;
    expect(configuration.options.key).to.equal('123');
    expect(configuration.options.version).to.equal('v3');
  });
});
