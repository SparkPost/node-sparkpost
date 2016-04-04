'use strict';

var chai = require('chai')
  , sinon = require('sinon')
  , sinonChai = require('sinon-chai')
  , toApiFormat = require('../../lib/toApiFormat')
  , expect = chai.expect
  , _ = require('lodash')
  ;

chai.use(sinonChai);

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
      , content: {
        email_rfc822: 'a message'
      }
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
      , content: {
        email_rfc822: 'a message'
      }
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

  it('should throw an error if it encounters one', function(done) {
    var stub = sinon.stub(_, 'snakeCase').throws();

    var testObj = {
      simpleString: "foo"
      , substitution_data: {
        key1: 'value1',
        key_2: 'value_2'
      }
      , sampleArray: [
        'oneTag',
        'two_tag',
        'substitution_data',
        'tags'
      ]
    };

    try {
      var out = toApiFormat(testObj);
    } catch(e) {
      expect(e).to.not.be.null;
    }

    stub.restore();
    done();
  });

  it('should ignore sub-properties of properties on exclude list', function(done) {
    var testObj = {
      simpleString: "foo"
      , substitution_data: {
        key1: 'value1',
        key_2: 'value_2'
      }
      , sampleArray: [
        {
          goodValue: 'hello',
          tags: [
            'oneTag',
            'two_tag',
            'substitution_data',
            'tags'
          ]
        }
      ]
    };

    var validationObj = {
      simple_string: "foo"
      , substitution_data: {
        key1: 'value1',
        key_2: 'value_2'
      }
      , sample_array: [
        {
          good_value: 'hello',
          tags: [
            'oneTag',
            'two_tag',
            'substitution_data',
            'tags'
          ]
        }
      ]
    };

    var out = toApiFormat(testObj);

    expect(out).to.deep.equal(validationObj);

    done();
  });
});
