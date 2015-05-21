'use strict';

var chai = require('chai')
  , snaker = require('../../lib/snaker')
  , expect = chai.expect
  ;

/*
naturalTest:  fooBar
spaceHyphenTest:  -
Ftest:  f
CapCaseTest:  foobar
camelCaseTest:  camelCase
FOO:  foo
Foo:  foo
allCapsTest:  fooBar
mixedCapsTest:  fooBarBaz
hyphenOnly:  -
hyphenSeparated:  fooBar
hyphenPreMidPostFix:  fooBar
*/
describe('Snaker', function() {
  it('should not munge existing snake_case', function(done) {
    expect(snaker('foo_bar')).to.equal('foo_bar');
    done();
  });

  it('should lowercase single letters', function(done) {
    expect(snaker('F')).to.equal('f'); // Doesn't munge
    done();
  });

  it('should convert CapitalCase to snake_case', function(done) {
    expect(snaker('FooBar')).to.equal('foo_bar');
    done();
  });

  it('should convert camelCase to snake_case', function(done) {
    expect(snaker('fooBar')).to.equal('foo_bar');
    done();
  });

  it('should handle hyphens appropriately', function(done) {
    expect(snaker('foo-bar')).to.equal('foo_bar');
    expect(snaker('-foo-bar-')).to.equal('foo_bar');
    done();
  });
});
