'use strict';

var chai = require('chai')
  , expect = chai.expect
  , SparkPost = require('../../lib/sparkpost')
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Suppression List Library', function() {
  let client, suppressionList;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({}),
      reject: SparkPost.prototype.reject
    };

    suppressionList = require('../../lib/suppressionList')(client);
  });

  describe('list', function() {
    it('should call client get method with the appropriate uri', function() {
      return suppressionList.list({limit: 5})
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('suppression-list');
        });
    });

    it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return suppressionList.list({}, cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });
  });

  describe('get', function() {
    it('should call client get method with the appropriate uri', function() {
      return suppressionList.get('test@test.com')
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('suppression-list/test@test.com');
        });
    });

    it('should call the callback once', function() {
      client.get.yields();
      let cb = sinon.stub();

      return suppressionList.get('test@test.com', cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if email is missing', function() {
      return expect(suppressionList.get()).to.be.rejectedWith('email is required');
    });
  });

  describe('upsert', function() {
    it('should accept a single list entry', function() {
      var listEntry = { email: 'test@test.com' };

      return suppressionList.upsert(listEntry)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('suppression-list');
          expect(client.put.firstCall.args[0].json.recipients).to.deep.equal([listEntry]);
        });
    });

    it('should call the callback once', function() {
      client.put.yields();
      let cb = sinon.stub();

      return suppressionList.upsert({ email: 'test@test.com' }, cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should accept an array of list entries', function() {
      var listEntries = [
        { email: 'test1@test.com' },
        { email: 'test2@test.com' }
      ];

      return suppressionList.upsert(listEntries)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('suppression-list');
          expect(client.put.firstCall.args[0].json.recipients).to.deep.equal(listEntries);
        });
    });

    it('should throw an error if recipient is missing', function() {
      return expect(suppressionList.upsert()).to.be.rejectedWith('list entries is required');
    });
  });

  describe('delete', function() {
    it('should call client delete method with the appropriate uri', function() {
      return suppressionList.delete('test@test.com')
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('suppression-list/test@test.com');
        });
    });

    it('should call the callback once', function() {
      client.delete.yields();
      let cb = sinon.stub();

      return suppressionList.delete('test@test.com', cb).then(function() {
        expect(cb.callCount).to.equal(1);
      });
    });

    it('should throw an error if email deleteEntry missing', function() {
      return expect(suppressionList.delete()).to.be.rejectedWith('email is required');
    });
  });

});
