'use strict';

var chai = require('chai')
  , toApiFormatter = require('../../lib/toApiFormatter')
  , expect = chai.expect
  ;

describe('toApiFormatter', function() {
  it('should convert keys of an object to snake_case', function(done) {
    var testObj = {
      foo: "foo"
      , fooBar: "fooBar"
      , fizz: {
          buzz: "buzz",
          fizzBuzz: "fizzBuzz"
      }
      , fooBarBaz: "fooBarBaz"
    };

    var validationObj = {
      foo: "foo"
      , foo_bar: "fooBar"
      , fizz: {
          buzz: "buzz",
          fizz_buzz: "fizzBuzz"
      }
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

  it('should convert array element object\'s keys to snake_case', function(done) {
    var testObj = {
      foo: "foo"
      , fooBar: "fooBar"
      , fooBarBaz: "fooBarBaz"
      , fizz: [
        {
          buzzInga: "buzz",
          bang: {
            bellHop: "bell"
          }
        }
      ]
    };

    var validationObj = {
      foo: "foo"
      , foo_bar: "fooBar"
      , foo_bar_baz: "fooBarBaz"
      , fizz: [
        {
          buzz_inga: "buzz",
          bang: {
            bell_hop: "bell"
          }
        }
      ]
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
