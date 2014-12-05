var chai = require('chai')
  , expect = chai.expect
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , email = require('../../../lib/SendGridCompatibility/Email');

chai.use(sinonChai);

describe('SendGrid Email Object', function() {
  var tmpEmail
    , payload = {
      to:       ['fake@email.org', 'real@notreally.net'],
      toname:   ['Fakey Fakerson', 'Realy Realerson'],
      from:     'a.sender@company.com',
      fromname: 'A. Sender',
      subject:  'Sale',
      text:     'Look at this sale!',
      html:     '<h1>Look </h1><h5>at this sale!</h5>',
      bcc:      ['bcc@bbc.co.uk', 'bcc@cbc.ca'],
      replyto:  'a.replyto@company.com',
      date:     new Date(),
      files: [
        {
          filename:     'name.txt',
          path:         '../../../../../../',
          url:          'www.google.com',
          content:      '?'
        }
      ],
      file_data:  {asdf: 'asdf'},
      headers: {asdfasdf: 'asdfasdf'}
    };

  describe('instantiation', function() {
    it('should handle empty input', function() {
      tmpEmail = new email();
      expect(Object.keys(tmpEmail).length).to.equal(0);
    });
    it('should handle a payload', function() {
      tmpEmail = new email(payload);
      for (var index in tmpEmail) {
        if(typeof tmpEmail[index] !== 'function'){
          expect(tmpEmail[index]).to.deep.equal(payload[index]);
        }
      }
    });
  });

  describe('compatibility functions: ', function() {
    beforeEach(function() {
      tmpEmail = new email(payload);
    });
    it('addTo', function() {
      tmpEmail.to = undefined;
      tmpEmail.addTo('fake@email.org');
      tmpEmail.addTo('real@notreally.net');
      tmpEmail.addTo('asdf@asdf.com');
      expect(tmpEmail.to).to.deep.equal(['fake@email.org','real@notreally.net','asdf@asdf.com']);
    });
    it('setFrom', function(){
      tmpEmail.setFrom('email@email.edu');
      expect(tmpEmail.from).to.equal('email@email.edu');
    });
    it('setSubject', function(){
      tmpEmail.setSubject('new subject');
      expect(tmpEmail.subject).to.equal('new subject');
    });
    it('setText', function(){
      tmpEmail.setText('new text');
      expect(tmpEmail.text).to.equal('new text');
    });
    it('setHtml', function(){
      tmpEmail.setHtml('<p>new html</p>');
      expect(tmpEmail.html).to.equal('<p>new html</p>');
    });
    it('addHeader', function(){
      tmpEmail.headers = undefined;
      tmpEmail.addHeader('abcd', 'efgh');
      tmpEmail.addHeader('1234', '5678');
      expect(tmpEmail.headers).to.deep.equal({abcd: 'efgh', 1234: '5678'});
    });
    it('setHeaders', function(){
      tmpEmail.setHeaders({oldish: 'new'});
      expect(tmpEmail.headers).to.deep.equal({oldish: 'new'});
    });
    it('addSubstitution', function(){
      tmpEmail.addSubstitution('key', 'value');
      tmpEmail.addSubstitution('attributeName', ['attribute1', 'attribute2']);
      expect(tmpEmail.sub).to.deep.equal({key: ['value'], attributeName: ['attribute1', 'attribute2']});
    });
    it('setSubstitutions', function(){
      tmpEmail.setSubstitutions({index: ['element']});
      expect(tmpEmail.sub).to.deep.equal({index: ['element']});
    });
    it('addSection', function(){
      tmpEmail.addSection('key', 'value');
      tmpEmail.addSection('attributeName', 'attribute1');
      expect(tmpEmail.section).to.deep.equal({key: 'value', attributeName: 'attribute1'});
    });
    it('setSections', function(){
      tmpEmail.setSections({index: 'element'});
      expect(tmpEmail.section).to.deep.equal({index: 'element'});
    });
    it('addUniqueArg', function(){
      try {
        tmpEmail.addUniqueArg();
      } catch (err) {
        expect(err).to.deep.equal(new Error('Unique Argument compatibility is not supported.'));
      }
    });
    it('setUniqueArgs', function(){
      try {
        tmpEmail.setUniqueArgs();
      } catch (err) {
        expect(err).to.deep.equal(new Error('Unique Argument compatibility is not supported.'));
      }
    });
    it('addCategory', function(){
      try {
        tmpEmail.addCategory();
      } catch (err) {
        expect(err).to.deep.equal(new Error('Category compatibility is not supported.'));
      }
    });
    it('setCategories', function(){
      try {
        tmpEmail.setCategories();
      } catch (err) {
        expect(err).to.deep.equal(new Error('Category compatibility is not supported.'));
      }
    });
    it('addFilter', function(){
      try {
        tmpEmail.addFilter();
      } catch (err) {
        expect(err).to.deep.equal(new Error('Filter compatibility is not supported.'));
      }
    });
    it('setFilters', function(){
      try {
        tmpEmail.setFilters();
      } catch (err) {
        expect(err).to.deep.equal(new Error('Filter compatibility is not supported.'));
      }
    });
    it('addFile', function(){
      try {
        tmpEmail.addFile();
      } catch (err) {
        expect(err).to.deep.equal(new Error('File compatibility is not supported.'));
      }
    });
  });
});
