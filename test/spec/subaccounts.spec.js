'use strict';

var _ = require('lodash')
  , chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Subaccounts Library', function() {
  var client, subaccounts;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({})
    };

    subaccounts = require('../../lib/subaccounts')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return subaccounts.all()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('subaccounts');
        });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return subaccounts.find('test')
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('subaccounts/test');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(subaccounts.find()).to.be.rejectedWith('id is required');
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function() {
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
    it('should call client put method with the appropriate uri', function() {
      var subaccount = {
        id: 'test',
        name: 'Hey Joe! Garage and Parts',
        status: 'suspended',
        ip_pool: ''
      };

      return subaccounts.update(subaccount)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('subaccounts/test');
          expect(client.put.firstCall.args[0].json).to.deep.equal(_.omit(subaccount, 'id'));
        });
    });

    it('should throw an error if subaccount object is missing', function() {
      return expect(subaccounts.update()).to.be.rejectedWith('subaccount object is required');
    });

    it('should throw an error if subaccountId is missing from options', function() {
      return expect(subaccounts.update({})).to.be.rejectedWith('subaccount.id is required');
    });
  });
});
