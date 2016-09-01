'use strict';

var _ = require('lodash')
  , chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon');

require('sinon-as-promised');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

describe('Templates Library', function() {
  var client, templates;

  beforeEach(function() {
    client = {
      get: sinon.stub().resolves({}),
      post: sinon.stub().resolves({}),
      put: sinon.stub().resolves({}),
      delete: sinon.stub().resolves({})
    };

    templates = require('../../lib/templates')(client);
  });

  describe('all Method', function() {
    it('should call client get method with the appropriate uri', function() {
      return templates.all()
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('templates');
        });
    });
  });

  describe('find Method', function() {
    it('should call client get method with the appropriate uri', function() {
      var options = {
        id: 'test'
      };
      return templates.find(options)
        .then(function() {
          expect(client.get.firstCall.args[0].uri).to.equal('templates/test');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(templates.find()).to.be.rejectedWith('template id is required');
    });

    it('should allow draft to be set in options', function() {
      var options = {
        id: 'test',
        draft: true
      };

      return templates.find(options)
        .then(function() {
          expect(client.get.firstCall.args[0].qs).to.deep.equal({draft: true});
        });
    });
  });

  describe('create Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var template = {
        id: 'test'
      };

      return templates.create(template)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('templates');
          expect(client.post.firstCall.args[0].json).to.deep.equal(template);
        });
    });

    it('should throw an error if template object is missing', function() {
      return expect(templates.create()).to.be.rejectedWith('template object is required');
    });
  });

  describe('update Method', function() {
    it('should call client put method with the appropriate uri and payload', function() {
      var template = {
        id: 'test',
        name: 'A new name!'
      };

      return templates.update(template)
        .then(function() {
          expect(client.put.firstCall.args[0].uri).to.equal('templates/test')
          expect(client.put.firstCall.args[0].json).to.deep.equal(_.omit(template, 'id'));
        });
    });

    it('should throw an error if template object is missing', function() {
      return expect(templates.update()).to.be.rejectedWith('template object is required');
    });

    it('should throw an error if template id is missing', function() {
      return expect(templates.update({})).to.be.rejectedWith('template id is required');
    });

    it('should allow update_published to be set in options', function() {
      var template = {
        id: 'test',
        update_published: true
      };

      return templates.update(template)
        .then(function() {
          expect(client.put.firstCall.args[0].qs).to.deep.equal({update_published: true});
        });
    });
  });

  describe('delete Method', function() {
    it('should call client delete method with the appropriate uri', function() {
      return templates.delete('test')
        .then(function() {
          expect(client.delete.firstCall.args[0].uri).to.equal('templates/test');
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(templates.delete()).to.be.rejectedWith('template id is required');
    });
  });

  describe('preview Method', function() {
    it('should call client post method with the appropriate uri and payload', function() {
      var options = {
        id: 'test',
        substitution_data: {
          'name': 'Natalie',
          'age': 35,
          'member': true
        }
      };
      return templates.preview(options)
        .then(function() {
          expect(client.post.firstCall.args[0].uri).to.equal('templates/test/preview');
          expect(client.post.firstCall.args[0].json).to.deep.equal(_.omit(options, 'id'));
        });
    });

    it('should throw an error if id is missing', function() {
      return expect(templates.preview()).to.be.rejectedWith('template id is required');
    });

    it('should allow draft to be set in options', function() {
      var options = {
        id: 'test',
        draft: true
      };

      return templates.preview(options)
        .then(function() {
          expect(client.post.firstCall.args[0].qs).to.deep.equal({draft: true});
        });
    });
  });
});
