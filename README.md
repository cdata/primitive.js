# Primitive.js ![Build status for master branch][5]

Primitive is an implementation of an Object-based inheritance pattern,
inspired in parts by patterns in [Backbone.js][1] and [this excellent treatise
on JavaScript inheritance][2] by Kyle Simpson. This library aims to stand as a
light, workable alternative to [the proposed ``class`` syntax][3] coming in
ES6.

## Object-based Inheritance

Primitive adopts Kyle's 'objects all the way down' philosophy, dropping
classical prototype-based inheritance hierarchies in favor of a purely
Object-based approach.

New classes are defined with ``#extend``. Use a traditional syntax:

```javascript
var MyClass = Primitive.extend({
  init: function (name) {
    // will be called upon creation..
    this.name = name;
  },
  someMethod: function () {
    return true;
  }
});
```

Or a more functional one:

```javascript
var MySubClass = MyClass.extend(function (Super) {
  var privateMemberName;

  return {
    init: function (name) {
      privateMemberName = name;
    },
    someMethod: function () {
      // Super is a reference to MyClass
      return Super.someMethod.call(this);
    }
  };
});
```

Use ``#create`` to instantiate. Arguments are forwarded to ``#init``:

```javascript
var anInstance = MyClass.create('foo');
```

Reflection is available with ``#isA``:

```javascript
anInstance.isA(MyClass); // true
```

## Contributing

The file ``lib/primitive.es6.js`` is the only file that you should edit.
``lib/primitive.es5.js`` is generated by traceur-compiler.

Primitive aims to be as performant as possible while also taking advantage of
the latest ES5 features. Please consider and contribute to [this JSPerf
test][4] when proposing modifications to Primitive's internal strategies.

### Requirements

```sh
npm install -g grunt-cli
npm install
```

### Build and Test

Modifications to ``lib/primitive.es6.js`` and ``test/primitive-spec.js`` will be
tracked when you run:

```sh
grunt watch
```

[1]: http://backbonejs.org/docs/backbone.html#section-189
[2]: http://davidwalsh.name/javascript-objects
[3]: http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes
[4]: http://jsperf.com/inheritance-pattern-sandbox
[5]: https://circleci.com/gh/cdata/primitive.js.png?circle-token=cdd6dd33c695fe17a41086e9ed94710d538f8ff3
