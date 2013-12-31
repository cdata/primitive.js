(function(global) {
  'use strict';
  var Primitive = {
    extend: function(properties) {
      var Child = Object.create(this);
      var property;
      var descriptor;
      for (property in properties) {
        descriptor = Object.getOwnPropertyDescriptor(properties, property);
        Object.defineProperty(Child, property, descriptor);
      }
      return Child;
    },
    create: function() {
      var instance = Object.create(this);
      instance.init.apply(instance, arguments);
      return instance;
    },
    isA: function(other) {
      try {
        if (other && other.isPrototypeOf) {
          return other.isPrototypeOf(this);
        }
      } catch (e) {
        console.warn('Recovering from failed typecheck (a potential performance problem).');
      }
      return false;
    },
    init: function() {}
  };
  global.Primitive = Primitive;
})(this);
