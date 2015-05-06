var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai');

chai.use(sinonChai);

describe('Templates Library', function() {
  var client, templates;

  beforeEach(function() {
    client = {
      get: sinon.stub().yields(),
      post: sinon.stub().yields(),
      put: sinon.stub().yields(),
      'delete': sinon.stub().yields()
    };

    templates = require('../../lib/templates')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      templates.all(function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('templates');
        done();
      });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function(done) {
      var options = {
        id: 'test'
      };
      templates.find(options, function(err, data) {
        expect(client.get.firstCall.args[0].uri).to.equal('templates/test');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      templates.find(null, function(err) {
        expect(err.message).to.equal('template id is required');
        expect(client.get).not.to.have.been.called;
        done();
      });
    });

    it('should allow draft to be set in options', function(done) {
      var options = {
        id: 'test',
        draft: true
      };

      templates.find(options, function(err, data) {
        expect(client.get.firstCall.args[0].qs).to.deep.equal({draft: true});
        done();
      });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        template: {
          id: "test"
        }
      };

      templates.create(options, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('templates');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      templates.create(null, function(err) {
        expect(err.message).to.equal('template object is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri', function(done) {
      var options = {
        template: {
          id: "test"
        }
      };

      templates.update(options, function(err, data) {
        expect(client.put.firstCall.args[0].uri).to.equal('templates/test');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      templates.update(null, function(err) {
        expect(err.message).to.equal('template object is required');
        expect(client.put).not.to.have.been.called;
        done();
      });
    });

    it('should allow update_published to be set in options', function(done) {
      var options = {
        template: {
          id: "test"
        },
        update_published: true
      };

      templates.update(options, function(err, data) {
        expect(client.put.firstCall.args[0].qs).to.deep.equal({update_published: true});
        done();
      });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function(done) {
      templates['delete']('test', function(err, data) {
        expect(client['delete'].firstCall.args[0].uri).to.equal('templates/test');
        done();
      });
    });

    it('should throw an error if id is null', function(done) {
      templates['delete'](null, function(err) {
        expect(err.message).to.equal('template id is required');
        expect(client['delete']).not.to.have.been.called;
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      templates['delete'](function(err) {
        expect(err.message).to.equal('template id is required');
        expect(client['delete']).not.to.have.been.called;
        done();
      });
    });
  });

  describe('preview Method', function() {
    it('should call client post method with the appropriate uri', function(done) {
      var options = {
        id: 'test'
      };
      templates.preview(options, function(err, data) {
        expect(client.post.firstCall.args[0].uri).to.equal('templates/test/preview');
        done();
      });
    });

    it('should throw an error if id is missing', function(done) {
      templates.preview(null, function(err) {
        expect(err.message).to.equal('template id is required');
        expect(client.post).not.to.have.been.called;
        done();
      });
    });

    it('should allow draft to be set in options', function(done) {
      var options = {
        id: 'test',
        draft: true
      };

      templates.preview(options, function(err, data) {
        expect(client.post.firstCall.args[0].qs).to.deep.equal({draft: true});
        done();
      });
    });
  });
});
