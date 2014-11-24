# Code Style Guide for SparkPost Node SDK

Please make sure that your editor is properly reading from the .editorconfig file located at the base of the repository. 

Please take a few minutes and review our style guide: 

The following provide a reasonable style and formatting guide for all Javascript produced at Message Systems. The most important take-away from this guide is: be consistent.
A lot of effort has been made to keep this guide focused on style and formatting. However, conventions and techniques are inevitably part of things as well. These have been minimized as much as possible, as other documents are better suited to handle them.

## Naming Conventions
Avoid single letter names outside of loops. Offer descriptive names.
```
  // Bad
  function q() {...}

  // Good
  function query() {...}
  for (var i = 0; i < 10; i++) {
    ...
  }
```
Use camelCase when naming objects, functions, and instances.
```
  // Bad
  var MYObject = {};
  var my_string_variable = '';
  var my-object-variable = {};


  // Good
  var myObject = {};
  var myStringVariable = '';
  var myObjectVariable = {};
```
Use PascalCase for class names.
```
  // Bad
  var superHero = function (options) {
    this.name = options.name;
  };
  var reed = new superHero({ name:'Reed Richards' });


  // Good
  var SuperHero = function (options) {
    this.name = options.name;
  };
  var reed = new SuperHero({ name:'Reed Richards' });
```
Do not treat "private" object properties as special with something like an underscore. If you need private properties, obtain them by closing over them in the constructor.
```
  // Bad
  this._ccNumber = '4111111111111111';

  // Good
  function AccountInfo(cardNumber) {
    var cardNumber = cardNumber;

    // initialization, &c.

    return this;
  }

  var acct = new AccountInfo('4111111111111111');
```
If you are making a reference to this, use self (assuming a bind() function isn't used).
```
  // Bad
  function () {
    var that = this;
    return function () { console.log(that); };
  }

  // Good
  function () {
    var self = this;
    return function () { console.log(self); };
  }
```
You're not a minifier. Save yourself the headache of trying to be one.
```
  // Bad
  var q = function q(s) {
    return document.querySelectorAll(s);
  };
  var i,a=[],els=q('#test');
  for(i=0;i<els.length;i++){a.push(els[i]);}
```
## Variables
Always use var to declare variables. Not doing so will result in global variables. Unintentional global variables lead to unexpected program behavior. Even if a new variable is meant to be global, you should still use var.
```
  // Bad
  food = 'pickle';
  ! function () {
    food = 'hot dogs';
  }();
  // food = 'hot dogs'

  // Good
  var food = 'pickle';
  ! function () {
    var food = 'hot dogs';
  }();
  // food = 'pickle'
```
When declaring multiple variables, use a single var declaration in the comma-first style. Improve readability by using line comments to break out groups of related variables.
```
  // Bad
  var buffer = [];
  var counter = 0;
  var ref;
  var canRotate = true;
  var hasResults = false;
  var isMutable = false;

  // Bad
  var buffer = [],
      counter = 0,
      ref,
      canRotate = true,
      hasResults = false,
      isMutable = false;

  // Good
  var buffer = []
    , counter = 0
    , ref
  // Flags
    , canRotate = true
    , hasResults = false
    , isMutable = false;
```
Declare unassigned variables last. (If you're splitting out groups of variables with line comments, declare unassigned variables at the end of whichever group they're in.)
```
  // Bad
  var ref, len,
  items = getItems();

  // Good
  var items = getItems()
    , len
    , ref;
```
Initialize each variable as you declare it, if its value is available at declaration time and either is of primitive type, or can be expressed in a single (ideally short) line of code. If a variable needs to be initialized with the result of an expression spanning multiple lines, declare the variable without a definition and assign its value afterward.
```
  // Bad
  var ref
    , len;
  ref = things[0];
  len = ref.length;

  // Good
  var ref = things[0]
    , len = ref.length;

  // Bad
  var ref = things[0]
      .map(function(item){ 
        return item * 2; 
      })
      .filter(function(item){ 
        return (item % 2 === 0); 
      })    
    , len = ref.length;

  // Good
  var ref
    , len;
  ref = things[0]
      .map(function(item){ 
        return item * 2; 
      })
      .filter(function(item){ 
        return (item % 2 === 0); 
      });
  len = ref.length;
```
Avoid variable hoisting: Declare variables at the top of their scope.
```
  // Bad
  var InsertRecord = function (data) {
    validate();
    notify.info('Inserting record');

    var name = data.name;


    if (name === 'test') {
      return false;
    } else {
      return name;
    }
  };

  // Good
  var InsertRecord = function (data) {
    var name = data.name;

    validate();
    notify.info('Inserting record');

    

    if (name === 'test') {
      return false;
    } else {
      return name;
    }
  };
```
## Hoisting
Variable declarations get hoisted to the top of a scope by the Javascript interpreter. Assignments do not. This can lead to unexpected situations. More information about this can be found at Adequately Good (http://www.adequatelygood.com/2010/2/JavaScript-Scoping-and-Hoisting); below is an example from that article.
The takeaway is: Declare your variables early. If you are in the habit of putting them at the top of their scope, you can avoid the problem.
```
  function test() {
    foo();  // TypeError "foo is not a function"
    bar();  // "This will run!"

    // Function expression assigned to local variable 'foo'
    var foo = function () {
      alert("This won't run!");
    }

    // Function declaration, given the name 'bar'
    function bar() {
      alert("This will run!");
    }
  }
  test();
```
## Types
There are two categories of data types:

* Primitives: string, number, boolean, null, undefined
* Complex: object, array (really an object), function (also an object)

Primitive types are assigned and passed by value; complex types, by reference.

### Strings
Use only single-quoted strings. (If you slip up and wrap a string in double quotes, never fear – JSHint will remind you.)
Strings longer than 80 characters should be written across multiple lines using string concatenation.
When building strings programmatically, use Array.join() instead of string concatenation.
Don't build strings of HTML. Instead, just manipulate the DOM directly.

### Arrays
```
Use the literal syntax for array creation.
  // Bad
  var items = new Array();

  // Good
  var items = [];
```
Use Array.push() to add elements to the end of an array whose length you don't know.
```
  // Bad
  stack[stack.length] = 'element';

  // Good
  stack.push('element');
```
Clone arrays with Array.slice().
```
  // Bad
  var src = [1,2,3],
      dst = src;
  src[1] = 'string';
  // dst = [1, 'string', 2]

  // Bad
  var src = [1,2,3],
      dst = [];
  for (var i, len = src.length; i < len; i++) {
    dst[i] = src[i];
  }

  // Good
  var src = [1,2,3]
    , dst = src.slice();
```
Don't use "associative" Arrays. Use an Object, or hashes/maps.
```
  // Bad
  var items = [];
  items['animal'] = 'dog';
  items['mineral'] = 'shale';
  // items.length == 0

  // Good
  var items = {};
  items.animal = 'dog';
  items.mineral = 'shale';
```
### Objects
Use the literal syntax for object creation.
```
  // Bad
  var obj = new Object();

  // Good
  var obj = {};
```
Don't use reserved words as keys, even if you quote them.
```
  // Bad
  var Fig = {
    class: 'food',
    default: { flavor: 'strawberry' },
    'private': true
  };

  // Good
  var Newton = {
    type: 'food',
    defaults: { flavor: 'strawberry' },
    hidden: true
  };
```
It's completely acceptable to modify native object prototypes as long as the following rule is observed: Don't be stupid. Browsers with older versions of Javascript interpreters can often be augmented (in limited ways) to be compatible with newer flavors of the language through native object modification. Great care must be exercised however not to break or overwrite current or future functionality.
Future functionality? Yes: Object.create().
An easy way not to break native objects is to add functionality conditionally:
```
  if (typeof Object.create == 'undefined') {
    Object.create = function (...) {
      // Implementation...
    }
  }
```
## Properties
When accessing object properties by literal name, use the dot notation. Reserve the bracket notation for when the property you're accessing is named by a variable's value.
```
  var carrot = {
    category: 'plant',
    color: 'orange'
  }

  // Bad
  var color = carrot['color'];

  // Good
  var color = carrot.color;

  // Good
  var propName = 'color';
  var color = carrot[propName];

  // Good
  var carrot.getProp = function (prop) {
    return this[prop];
  }
```
## Comments
```
Use /* ... */ for multiline comments.
  // Bad

  // No updates can be made to the resource during this operation as the
  // bookkeepping for it will NOT be performed because of possible race
  // conditions.  All updates during this period will be ignored, so be
  // sure to reflect this in the UX.
  model.lock();

  // Good

  /* 
   * No updates can be made to the resource during this operation as the
   * bookkeepping for it will NOT be performed because of possible race
   * conditions.  All updates during this period will be ignored, so be
   * sure to reflect this in the UX.
   */
  model.lock();
```
Use JSDoc to document functions, methods, &c.
```
// Good

/*
 * Return an array whose (numeric) values are inverse of those in its argument.
 */
function invert(list) {
  return list.map(function(i) { return i - (2 * i); });
};

// Better

/**
 * Return an array whose (numeric) values are inverse of those in its argument.
 * @param {number[]} list - An array of numeric values.
 * @returns {number[]} An array of inverted values.
 */
function invert(list) {
  return list.map(function(i) { return i - (2 * i); });
};

```
Use // for single line comments. Place them on a newline above the subject of the comment with a blank line above that. The blank line may be omitted when the comment directly follows a control structure. Capitalize the first letter of a comment.
```
  // Bad
  try {
    options = argsParser[parseType](argv);
    // get the module to execute and its partner output module
    exe = options && require('./main-' + options.main);
    out = options && require('./output/main-' + options.main + '-output').create(sysUtil, options.debug, options.quiet);
    if (exe && out) {   // only execute with a proper pairing
      exe.exec(options, out, complete.bind(null, out, callback));
    }
  } catch (ex) {  // create a generic/base 'out' module which can do the error printing
    out = Output.create(sysUtil, argv.indexOf('--debug') != -1);
    complete(out, callback, ex);
  }

  // Good
  try {
    options = argsParser[parseType](argv);

    // Get the module to execute and its partner output module
    exe = options && require('./main-' + options.main);
    out = options && require('./output/main-' + options.main + '-output').create(sysUtil, options.debug, options.quiet);
    
    // Only execute with a proper pairing
    if (exe && out) {
      exe.exec(options, out, complete.bind(null, out, callback))
    }
  } catch (ex) {
    // Create a generic/base 'out' module which can do the error printing
    out = Output.create(sysUtil, argv.indexOf('--debug') != -1)
    complete(out, callback, ex)
  }
```
End line comments should only be used when documenting long lists of variables or simple object properties.
```
  // Good
  var lock = false,     // Mandatory lock indicator
    , data = []         // Primary storage
    , buffer = []       // Used for swaps or copies
    , last = null       // Points to last element of structure
    , current = null;   // Used for iterators

  // Good
  var struct = {
    lock: false,     // Mandatory lock indicator
    data: [],        // Primary storage
    buffer: [],      // Used for swaps or copies
    last: null,      // Points to last element of structure
    current: null    // Used for iterators
  };
```
## Whitespace
Use soft tabs set to 2 spaces (illustrated with dots, below).
```
  // Bad
  var fn = () {
  ....console.log('test');
  };

  // Good
  var fn = () {
  ..console.log('test');
  };
```
Place one space before the leading brace.
```
  // Bad
  var fn = (){
    console.log('test');
  };

  // Good
  var fn = () {
    console.log('test');
  };

  // Bad
  lookup.populate('Mr. Charles',{
    age: 32,
    job: JOB_SECURITY
  });

  // Good
  lookup.populate('Mr. Charles', {
    age: 32,
    job: JOB_SECURITY
  });
```
## Semicolons
Javascript's semantics include optional automatic semicolon insertion. In theory, this allows less experienced programmers to more quickly get to grips with the language. In practice, this allows programmers of all experience levels the opportunity to discover the joy of seeing their code misbehave in various fashions both subtle and bizarre.
When in doubt, insert a semicolon; if one doesn't belong there, JSHint will let you know.
```
  // Bad
  (function () {
    var name = 'Ricky Bobby'
    return name
  })()

  // Good
  (function () {
    var name = 'Ricky Bobby';
    return name;
  })();
```
## Blocks
Use braces with multi-line blocks. Ensure leading brace is on the same line.
```
  // Bad
  if (test)
    return false;

  // Good
  if (test) {
    return false;
  }

  // Bad
  var fn = function() { return false; };

  // Good
  var fn = function() {
    return false;
  }; 
```
In a statement with multiple clauses (e.g. if/else if/else or try/catch/finally), introduce clauses following the first on the same line as the prior clause's closing brace.
```
// Bad
if (test) {
  return thing.doThing();
}
else {
  return undefined;
}

try {
  thing.doThing();
}
catch (e) {
  console.log('Thing couldn\'t do thing: ' + e);
}

// Good
if (test) {
  return thing.doThing();
} else {
  return undefined;
}

try {
  thing.doThing();
} catch (e) {
  console.log('Thing couldn\'t do thing: ' + e);
}
```
## Functions
Use these expressions when declaring functions. The "!" of an immediately invoked function ensures that if a semicolon wasn't included on the previous statement, no execution error will occur.
```
  // Anonymous function expression
  var anonymous = function () {
    return true;
  }

  // Named function expression
  var fn = function named() {
    return true;
  }

  // Immediately invoked function expressions

  // Bad
  (function() {
    console.log('Page initialized');
  })();

  // Good
  ! function() {
    console.log('Page Initialized');
  }();
```
Never declare a function in a non-function block (if, while, etc). Instead, assign a function to a variable.
```
  // Bad
  if (enabled) {
    function test() {
      console.log('No');
    }
  }

  // Good
  if (enabled) {
    var fn = function test() {
      console.log('Yes!');
    };
  }
```
Never name a parameter arguments, as it will take precedence of the arguments object that is implicitly declared in every function scope.
```
  // Bad
  var fn = function nope(name, opts, arguments) { ... };

  // Good
  var fn = function yep(name, opts, args) { ... };
```

## Conditions and Equality
Favor explicit equality checks over normal ones. That means using === and !== over == and !=.
When comparing a return value against a constant, place the constant on the right-hand side of the comparison operator.
```
// Bad: implicit "falsy" comparison
if (! thing.doThing()) {
  // ...
}

// Bad: constant on left-hand side
if (false === thing.doThing()) {
  // ...
}

// Good
if (thing.doThing() === false) {
  // ...
}
```
Boolean evaluation of variables follows these rules:

* Objects evaluate to true.
* Undefined evaluates to false.
* Null evaluates to false.
* Booleans evaluate to the value of the boolean.
* Numbers evaluate to false if +/-0 or NaN, otherwise to true.
* Strings evaluate to false when empty (''), otherwise to true.

Use conditional evaluation shortcuts.
```
// Bad
if (name !== '') {
  // ...
}

// Good
if (name) {
  // ...
}
```

## Libraries
Used in moderation, libraries make our lives easier. Used profligately, they complicate life for everyone. Here follow some rules of thumb to help guide your judgment on the matter.
Some things, such as checking types, testing whether an array is empty, or foreaching across an object's keys, can be trivially accomplished in native Javascript. Don't pull in a library just to do these things.
```
// Bad
var _ = require('lodash')
  , items = []
  , hasItems;

hasItems = (_.isEmpty(thing.doThing()) === false);

_.forEach(thing.things, function(value, key) {
  items.push(value);
});

// Good
var items = []
  , hasItems;

hasItems = (thing.doThing().length !== 0);

Object.keys(thing.things).forEach(function(key) {
  var value = thing.things[key];
  items.push(value);
});
```

On the other hand, don't be afraid to pull in a library to do complex things, such as deep-cloning an object, or testing emptiness of a variable whose value might be an object, an array, or undefined – ideally, of course, avoid proliferating such special cases by writing your code so that you can rely on value types; but, in cases where that's not possible, or where you're dealing with a value coming from code outside your control, bring in Lo-dash or another library, rather than spending your precious time reinventing the wheel.
When you think about using a method from a library already present for other reasons, consider whether native Javascript can perform the same task without undue extra effort. If so, prefer the native Javascript method over that provided by the library; this promotes better modularity and, where possible to do so, helps avoid tight coupling with a given library. This makes it easier to replace that library later, if and when it becomes necessary to do so, and also reduces cognitive overhead for other developers working with your code.
```
var _ require('lodash')
  , anArray = [1, 2, 3, 4, 5]
  , anObject = {'foo': 1, 'bar': 2}
  , anotherObject;

// No question of removing Lo-dash entirely:
anotherObject = _.cloneDeep(anObject);

// [...]

// Bad: gratuitous use of Lo-dash
_.forEach(anArray, function(val) {
  console.log(val);
});

_.map(anObject, function(val, key) {
  console.log(key + ' = ' + val);
});

// Good: native methods avoiding dependency
anArray.forEach(function(val) {
  console.log(val);
});

Object.keys(anObject).map(function(key) {
  var val = anObject[key];
  console.log(key + ' = ' + val);
});
```

## Composition
In general, avoid jQuery-style method chaining for readability reasons. Instead, use temporary variables to store intermediate results.
```
// Bad
anArray
  .map(function(item) {
    // ...
  })
  .filter(function(item) {
    // ...
  })

// Good

var mapping
  , result;

mapping = anArray.map(function(item) {
  // ...
});

result = mapping.filter(function(item) {
  // ...
});
```
