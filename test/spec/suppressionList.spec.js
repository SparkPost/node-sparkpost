'use strict';

var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Suppression List Library', function() {
  var client, suppressionList;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    suppressionList = require('../../lib/suppressionList')(client);
  });

  describe('search Method', function() {
    it('should call client get method with the appropriate uri', function() {
      suppressionList.search({limit: 5})
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('suppression-list');
        });
    });
  });

  describe('getEntry Method', function() {
    it('should call client get method with the appropriate uri', function() {
      suppressionList.getEntry('test@test.com')
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('suppression-list/test@test.com');
        });
    });

    it('should throw an error if email is missing', function() {
      return expect(suppressionList.getEntry()).to.be.rejectedWith('email is required');
    });
  });

  describe('deleteEntry Method', function() {
    it('should call client delete method with the appropriate uri', function() {
      suppressionList.deleteEntry('test@test.com')
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('suppression-list/test@test.com');
        });
    });

    it('should throw an error if email deleteEntry missing', function() {
      return expect(suppressionList.deleteEntry()).to.be.rejectedWith('email is required');
    });
  });

  describe('upsert Method', function() {
    it('should accept a single list entry', function() {
      var listEntry = { email: 'test@test.com' };

      suppressionList.upsert(listEntry)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('suppression-list');
          expect(client.put.firstCall.args[0].json.recipients).to.deep.equal([listEntry]);
        });
    });

    it('should accept an array of list entries', function() {
      var listEntries = [
        { email: 'test1@test.com' },
        { email: 'test2@test.com' }
      ];

      suppressionList.upsert(listEntries)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('suppression-list');
          expect(client.put.firstCall.args[0].json.recipients).to.deep.equal(listEntries);
        });
    });

    it('should throw an error if recipient is missing', function() {
      return expect(suppressionList.upsert()).to.be.rejectedWith('list entries is required');
    });
  });
});
