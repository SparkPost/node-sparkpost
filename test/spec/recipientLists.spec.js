'use strict';

var _ = require('lodash')
  , chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Recipient Lists Library', function() {
  var client, recipientLists;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    recipientLists = require('../../lib/recipientLists')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return recipientLists.all()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('recipient-lists');
        });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function() {
      var options = {
        id: 'test'
      };
      return recipientLists.find(options)
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('recipient-lists/test');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(recipientLists.find(null)).to.be.rejectedWith('id is required');
    });

    it('should allow show_recipients to be set in options', function() {
      var options = {
        id: 'test',
        show_recipients: true
      };

      return recipientLists.find(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({show_recipients: true});
        });
    });
  });

  describe('create Method', function() {

    it('should call client post method with the appropriate uri and payload', function() {
      var testList = {
        id: 'test_list',
        recipients: [
          {
            address: {
              email: 'test@test.com',
              name: 'test'
            }
          }
        ]
      };

      return recipientLists.create(testList)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('recipient-lists');
          expect(client.post.firstCall.args[0].json).to.deep.equal(testList);
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(recipientLists.create(null)).to.be.rejectedWith('recipient list is required');
    });

    it('should allow num_rcpt_errors to be set in options', function() {
      var testList = {
        id: 'test_list',
        recipients: [
          {
            address: {
              email: 'test@test.com',
              name: 'test'
            }
          }
        ],
        num_rcpt_errors: 3
      };

      return recipientLists.create(testList)
        .then(function() {
          expect(client.post.firstCall.args[0].qs).to.deep.equal({num_rcpt_errors: 3});
        });
    });
  });

  describe('update Method', function() {

    it('should call client put method with the appropriate uri and payload', function() {
      var testList = {
        id: 'test_list',
        recipients: [
          {
            address: {
              email: 'test@test.com',
              name: 'test'
            }
          }
        ]
      };

      return recipientLists.update(testList)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('recipient-lists/' + testList.id);
          expect(client.put.firstCall.args[0].json).to.deep.equal(_.omit(testList, 'id'));
        });
    });

    it('should throw an error if recipient list is missing', function() {
      return expect(recipientLists.update(null)).to.be.rejectedWith('recipient list is required');
    });

    it('should throw an error if id is missing', function() {
      return expect(recipientLists.update({})).to.be.rejectedWith('recipient list id is required');
    });

    it('should allow num_rcpt_errors to be set in options', function() {
      var testList = {
        id: 'test_list',
        recipient: [
          {
            address: {
              email: 'test@test.com',
              name: 'test'
            }
          }
        ],
        num_rcpt_errors: 3
      };

      return recipientLists.update(testList)
        .then(function() {
          expect(client.put.firstCall.args[0].qs).to.deep.equal({num_rcpt_errors: 3});
        });
    });

  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function() {
      return recipientLists.delete('test')
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('recipient-lists/test');
        });
    });

    it('should throw an error if id is null', function() {
      return expect(recipientLists.delete(null)).to.be.rejectedWith('id is required');
    });

    it('should throw an error if id is missing', function() {
      return expect(recipientLists.delete()).to.be.rejectedWith('id is required');
    });
  });
});
