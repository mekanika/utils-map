
# mekanika-utils-map

  Functional style map iterator `map( fn, collection [, this] )`

#### Overview

A standard map iterator for Objects and Arrays:

- Steps through each element in `collection`
- Applies the transform function `fn( value )`
- Returns the mutated collection

Main difference is that it flips traditional `map` parameters around to
support currying, for partial application of mutator functions for mapping:

```js
var square = map( function(v) { return v*v; } );
// -> {Function} (partially applied map)
square( [1,2,3] );
// -> [1,4,9]
```


## Installation

  Install with npm:

    $ npm install mekanika-utils-map

  Install with [component(1)](http://component.io):

    $ component install mekanika/utils-map


## API

```js
map( mutatorFn, collection [, thisBinding] );
```

### Requires

- [mekanika-utils-each](https://github.com/mekanika/utils-each)

### Params

- `mutatorFn` _{Function}_ Called for each element of collection. Passed:

  - `value` _{Mixed}_ The value of the current iterator element
  - `index` _{Number|String} The element index (Number for array, String for Object)
  - `collection` _{Object|Array}_

- `collection` _{Object|Array}_ The collection of elements to iterate

- `thisBinding` _(*)_ Optional `this` binding for the mutatorFn callback

### Returns

- `modifiedCollection` _{Object|Array}_ The mutated collection of elements


## Usage

For node:

```js
var map = require('mekanika-utils-map');
```

For use in a browser, first build the file:

    $ make component

Then include

```html
<script src="build/mekanika-utils-map.js">
```

### Examples

Arrays and objects:

```js
map( function(v) { return v*v; }, [1,2,3] );
// -> [1,4,9]

map( function(v) { return v+5 }, {a:1, b:2, c:3} );
// -> [6,7,8]
```

Functional programming partial application:

```js
var square = map( function(v) { return v*v; } );
// -> {Function} (partially applied map)
square( [1,2,3] );
// -> [1,4,9]
```


## License

  MIT
