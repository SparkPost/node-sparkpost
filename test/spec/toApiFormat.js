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

    var out = toApiFormatter(testObj);

    expect(out).to.deep.equal(validationObj);
    done();
  });

  it('should recursively convert complex object\'s keys to snake_case', function(done) {
    var testObj = {
      simpleString: "foo"
      , boolVal: true 
      , numBers: 201
      , bangObj: {
        strTwo: "bar"
        , string_three: "skip"
      }
      , fizzArr: [
        {
          buzzInga: "buzz"
          , bang: {
            bellHop: "bell"
          }
        }
      ]
      , good_name: null
    };

    var validationObj = {
      simple_string: "foo"
      , bool_val: true 
      , num_bers: 201
      , bang_obj: {
        str_two: "bar"
        , string_three: "skip"
      }
      , fizz_arr: [
        {
          buzz_inga: "buzz"
          , bang: {
            bell_hop: "bell"
          }
        }
      ]
      , good_name: null
    };

    var out = toApiFormatter(testObj);

    expect(out).to.deep.equal(validationObj);
    done();
  });
});
