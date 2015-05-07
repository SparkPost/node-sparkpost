var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Recipient Lists Library', function() {
  var client, recipientLists;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields(),
      put: sinon.stub().yields(),
      'delete': sinon.stub().yields()
    };

    recipientLists = require('../../lib/recipientLists')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      recipientLists.all(function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('recipient-lists');
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var options = {
        id: 'test'
      };
      recipientLists.find(options, function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('recipient-lists/test');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      recipientLists.find(null, function(err) {
        expect(err.message).to.equal('id is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should allow show_recipients to be set in options', function(done) {
      var options = {
        id: 'test',
        show_recipients: true
      };

      recipientLists.find(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({show_recipients: true});
        done();
      });
    });
  });

  describe('create Method', function() {
    var test_list = [
      {
        address: {
          email: 'test@test.com',
          name: 'test'
        }
      }
    ];

    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        recipients: test_list
      };

      recipientLists.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('recipient-lists');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      recipientLists.create(null, function(err) {
        expect(err.message).to.equal('recipients list is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should allow num_rcpt_errors to be set in options', function(done) {
      var options = {
        recipients: test_list,
        num_rcpt_errors: 3
      };

      recipientLists.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].qs).to.deep.equal({num_rcpt_errors: 3});
        done();
      });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      recipientLists.delete('test', function(err, data) {
        expect(client['delete'].firstCall.args[0].uri).to.equal('recipient-lists/test');
        done();
      });
    });

    it('should throw an error if id is null', function(done) {
      recipientLists['delete'](null, function(err) {
        expect(err.message).to.equal('id is required');
        expect(client['delete']).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      recipientLists['delete'](function(err) {
        expect(err.message).to.equal('id is required');
        expect(client['delete']).not.to.have.been.called;
        done();
      });
    });
  });
});
