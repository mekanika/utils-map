
/**
 * Test dependencies
 */

var map = require('..')
  , expect = require('expect.js');


/**
 * Basic module test
 */

describe('Map module', function() {

  it('exports the map function', function() {
    expect( map ).to.be.a( Function );
    expect( map.name ).to.be( 'map' );
  });

});


/**
 * Mutator function for map (squares a value)
 *
 * @param value
 *
 * @returns {Number} Square of the value passed
 */

var squareFn = function( value ) {
  return value * value;
};


/**
 * Tests when passed both map parameters
 */

describe('.map( fn, collection )', function() {

  it('returns a mutated array when passed Array', function() {
    var res = map( squareFn, [1,2,3] );
    expect( res ).to.be.an( Array );
    expect( res ).to.contain( 1, 4, 9 );
  });

  it('returns a mutated object when passed Object', function() {
    var res = map( squareFn, {a:2, b:3, c:4} );
    expect( res ).to.be.an( Object );
    expect( res ).to.only.have.keys( 'a','b','c' );
    expect( res ).to.have.property( 'a', 4 );
    expect( res ).to.have.property( 'b', 9 );
    expect( res ).to.have.property( 'c', 16 );
  });

  it('passes (val, key, col) to iterator method', function(done) {
    var oc = [5];

    function iter( v, k, col ) {
      expect( v ).to.be( 5 );
      expect( k ).to.be( '0' );
      expect( col ).to.be( oc );
      expect( col[ k ] ).to.be( 5 );
      done();
    }

    map( iter, oc );
  });

  it('fails if not passed Array or Object collection', function() {
    var res = map( squareFn, 'woo' );
    expect( res ).to.be.a( TypeError );
    res = map( squareFn, true );
    expect( res ).to.be.a( TypeError );
    res = map( squareFn, 42 );
    expect( res ).to.be.a( TypeError );
  });

});


/**
 * Tests for partial application
 */

describe('.map( fn )', function() {

  it('returns a function if only `fn` parameter passed', function() {
    expect( map( squareFn ) ).to.be.a( Function );
  });

  it('applies the function partial when called with a collection', function() {
    var square = map( squareFn );
    expect( square( [1,2,3] ) ).to.contain( 1, 4, 9 );
  });

});
