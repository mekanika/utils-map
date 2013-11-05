
/**
 * Module dependencies
 */

var each = require('mekanika-utils-each');

/**
 * Expose module
 */

module.exports = map;

/**
 * Maps a transform function across elements in a collection (Objects + Arrays)
 *
 * Functional style map iterator, supports currying of map iterators (ie.
 * partial application of method parameters)
 *
 * @example
 * map( function(v) { return v*v }, [1,2,3]);
 * // -> [1,4,9]
 * map( function(v) { return v+5 }, {a:1, b:2, c:3} );
 * // -> [6,7,8]
 *
 * @example <caption>Currying</caption>
 * var square = map( function(v) { return v*v } );
 * square( [1,2,3] );
 * // -> [1,4,9]
 *
 * @param {Function} fn The transform method, passed `fn( val, index, collection)`
 * @param {Object|Array} col A collection of properties (either Array or Object)
 * @param {this} [self] Optional `this` context for fn callback
 *
 * @returns {Object|Array|Function} Returns the collection, or a curried function
 */

//+ map :: Function -> Object|Array -> Object|Array

function map( fn, col, self ) {

  // Curried method requiring `col` parameter

  var _map = function( col ) {

    // Initialise the returned collection
    var ret = col instanceof Array
      ? []
      : {};

    // Apply the transform `fn` and add result to collection
    var res = each( function(val, key) {

      col instanceof Array
        ? ret.push( fn.call( self, val, key, col ) )
        : ret[ key ] = fn.call( self, val, key, col )

    }, col );

    return res instanceof TypeError ? res : ret;
  }

  // Return a curried `map(fn)` or the transformed collection
  return col === undefined
    ? _map
    : _map( col );
}
