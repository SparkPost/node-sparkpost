'use strict';

var chai = require('chai')
  , snaker = require('../../lib/toApiFormatter')
  , expect = chai.expect
  ;

describe('toApiFormatter', function() {
  it('convert keys of an object to snake_case', function(done) {
    var testObj = {
      foo: "foo"
      , fooBar: "fooBar"
      , fooBarBaz: "fooBarBaz"
    };

    var comparisonObj = {
      foo: "foo"
      , foo_bar: "fooBar"
      , foo_bar_baz: "fooBarBaz"
    };

    expect(testObj).to.deep.equal(comparisonObj);
    done();
  });
});
