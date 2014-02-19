(function(global) {
  'use strict';
  var Primitive = {
    extend: function(define) {
      var Child = Object.create(this);
      var properties;
      var property;
      var descriptor;
      if (define && define instanceof Function) {
        properties = define.call(Child, this);
      } else {
        properties = define;
      }
      if (properties) {
        for (property in properties) {
          if (properties.hasOwnProperty(property)) {
            descriptor = Object.getOwnPropertyDescriptor(properties, property);
            Object.defineProperty(Child, property, descriptor);
          }
        }
      }
      return Child;
    },
    new: function() {
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
