(global) => {
  'use strict';

  let Primitive = {
    extend (properties) {
      let Child = Object.create(this);
      let property;
      let descriptor;

      for (property in properties) {
        descriptor = Object.getOwnPropertyDescriptor(properties, property);
        Object.defineProperty(Child, property, descriptor);
      }

      return Child;
    },
    create () {
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
