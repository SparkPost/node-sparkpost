'use strict';

var _ = require('lodash')
  , chai = require('chai')
  , expect = chai.expect
  , SparkPost = require('../../lib/sparkpost')
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Recipient Validation Library', function() {
  var client, recipientValidation, callback;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({}),
      reject: SparkPost.prototype.reject
    };

    callback = function() {};

    recipientValidation = require('../../lib/recipientValidation')(client);
  });

  describe('get', function() {
    it('should call client get method with the appropriate uri', function() {
      return recipientValidation.get('sparkpost@yopmail.com', callback)
        .then(function() {
          expect(client.get.firstCall.args[0]).to.deep.equal({uri: 'recipient-validation/single/sparkpost@yopmail.com'});
          expect(client.get.firstCall.args[1]).to.equal(callback);
        });
    });

    it('should throw an error if domain is missing', function() {
      return expect(recipientValidation.get()).to.be.rejectedWith('Email Address is required');
    });
  });

});
