'use strict';

var chai = require('chai')
  , toApiFormatter = require('../../lib/toApiFormatter')
  , expect = chai.expect
  ;

describe('toApiFormatter', function() {
  it('convert keys of an object to snake_case', function(done) {
    var testObj = {
      foo: "foo"
      , fooBar: "fooBar"
      , fooBarBaz: "fooBarBaz"
    };

    var validationObj = {
      foo: "foo"
      , foo_bar: "fooBar"
      , foo_bar_baz: "fooBarBaz"
    };

    toApiFormatter( testObj, function( err, data ) {
      if( err ) {
        console.error( err );
      } else {
        expect(data).to.deep.equal(validationObj);
        done();
      }
    });
  });
});
