'use strict';

var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Subaccounts Library', function() {
  let client, subaccounts;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({})
    };

    subaccounts = require('../../lib/subaccounts')(client);
  });

  describe('list Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return subaccounts.list()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('subaccounts');
        });
    });
  });

  describe('get Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return subaccounts.get('test')
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('subaccounts/test');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(subaccounts.get()).to.be.rejectedWith('id is required');
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var subaccount = {
        name: 'test',
        key_label: 'test',
        key_grants: []
      };

      return subaccounts.create(subaccount)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('subaccounts');
          expect(client.post.firstCall.args[0].json).to.deep.equal(subaccount);
        });
    });

    it('should throw an error if subaccount object is missing', function() {
      return expect(subaccounts.create()).to.be.rejectedWith('subaccount object is required');
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri and payload', function() {
      var subaccount = {
        name: 'Hey Joe! Garage and Parts',
        status: 'suspended',
        ip_pool: ''
      };

      return subaccounts.update('test', subaccount)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('subaccounts/test');
          expect(client.put.firstCall.args[0].json).to.deep.equal(subaccount);
        });
    });

    it('should throw an error if subaccount id is missing from options', function() {
      return expect(subaccounts.update()).to.be.rejectedWith('id is required');
    });

    it('should throw an error if subaccount object is missing', function() {
      return expect(subaccounts.update('test')).to.be.rejectedWith('subaccount object is required');
    });
  });
});
