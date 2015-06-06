'use strict';

var chai = require('chai')
  , toApiFormat = require('../../lib/toApiFormat')
  , expect = chai.expect
  ;

describe('toApiFormat', function() {
  it('should recursively convert complex object keys to snake_case', function(done) {
    var testObj = {
      simpleString: "foo"
      , boolVal: true 
      , numBers: 201
      , bangObj: {
        strTwo: "bar"
        , string_three: "skip"
      }
      , recipients: [
        {name: 'John Doe', address: 'j.doe@sparkpost.com'}
        , {name: 'Sam Jones', address: 's.jones@sparkpost.com'}
      ]
      , fizzArr: [
        {
          buzzInga: "buzz"
          , bang: {
            bellHop: "bell"
          }
        }
        , {
          bilBo: "baggins"
          , alias: {
            misTer: "underhill"
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
      , recipients: [
        {name: 'John Doe', address: 'j.doe@sparkpost.com'}
        , {name: 'Sam Jones', address: 's.jones@sparkpost.com'}
      ]
      , fizz_arr: [
        {
          buzz_inga: "buzz"
          , bang: {
            bell_hop: "bell"
          }
        }
        , {
          bil_bo: "baggins"
          , alias: {
            mis_ter: "underhill"
          }
        }
      ]
      , good_name: null
    };

    var out = toApiFormat(testObj);

    expect(out).to.deep.equal(validationObj);

    done();
  });
});
