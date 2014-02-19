(global) => {
  'use strict';

  let Primitive = {
    extend (define) {
      let Child = Object.create(this);
      let properties;
      let property;
      let descriptor;

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

    new () {
      let instance = Object.create(this);

      instance.init.apply(instance, arguments);

      return instance;
    },

    isA (other) {
      try {
        if (other && other.isPrototypeOf) {
          return other.isPrototypeOf(this);
        }
      } catch (e) {
        console.warn('Recovering from failed typecheck (a potential performance problem).');
      }

      return false;
    },

    init () {}
  };

  global.Primitive = Primitive;
}(this);
