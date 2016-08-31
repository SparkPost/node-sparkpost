'use strict';

var chai = require('chai')
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
      subaccounts.all()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('subaccounts');
        });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function() {
      subaccounts.find('test')
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

      subaccounts.create(subaccount)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('subaccounts');
        });
    });

    it('should throw an error if subaccount object is missing', function() {
      return expect(subaccounts.create()).to.be.rejectedWith('subaccount object is required');
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function() {
      var subaccount = {
        id: 'test'
      };

      subaccounts.update(subaccount)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('subaccounts/test');
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
