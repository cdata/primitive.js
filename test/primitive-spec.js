(function (expect, describe, it, Primitive) {
  'use strict';

  describe('Primitive', function () {
    it('is defined', function () {
      expect(Primitive).to.be.ok();
      expect(Primitive).to.be.an('object');
    });

    describe('#new', function () {
      it('is defined', function () {
        expect(Primitive.new).to.be.a('function');
      });

      describe('when called', function () {
        it('instantiates a copy of Primitive', function () {
          var instance = Primitive.new();

          expect(instance).to.be.an('object');
          expect(instance.isA(Primitive)).to.be(true);
        });
      });
    });

    describe('#extend', function () {
      it('is defined', function () {
        expect(Primitive.extend).to.be.a('function');
      });

      describe('when called', function () {
        describe('with no arguments', function () {
          it('instantiates a copy of Primitive', function () {
            var instance = Primitive.extend();

            expect(instance).to.be.an('object');
            expect(instance.isA(Primitive)).to.be(true);
          });
        });

        describe('with a function argument', function () {
          it('calls the function with the Primitive as the first argument', function () {
            Primitive.extend(function (Super) {
              expect(Super).to.be(Primitive);
            });
          });

          it('sets the function context to to-be-defined "class"', function () {
            var Context;
            var Child = Primitive.extend(function () {
              Context = this;
            });

            expect(Context).to.be(Child);
          });

          it('facilitates calls to "super" methods', function () {
            var Child = Primitive.extend(function (Super) {
              return {
                method: function () {
                  expect(Super).to.be(Primitive);
                  return 1;
                }
              };
            });

            var GrandChild = Child.extend(function (Super) {
              return {
                method: function () {
                  expect(Super).to.be(Child);
                  return 2 + Super.method.call(this);
                }
              };
            });

            var GreatGrandChild = GrandChild.extend(function (Super) {
              return {
                method: function () {
                  expect(Super).to.be(GrandChild);
                  return 3 + Super.method.call(this);
                }
              };
            });

            expect(GreatGrandChild.new().method()).to.be(6);
          });

          describe('that returns an object', function () {
            it('instantiates an extended copy of Primitive', function () {
              var Extended = Primitive.extend(function () {
                return {
                  method: function () {
                    return true;
                  }
                };
              });

              expect(Extended.method).to.be.a('function');
            });
          });
        });

        describe('with an object argument', function () {
          it('instantiates an extended copy of Primitive', function () {
            var Extended = Primitive.extend({
              method: function () {
                return true;
              }
            });

            expect(Extended).to.be.an('object');
            expect(Extended.method).to.be.a('function');
          });

          describe('that has a non-trivial prototype chain', function () {
            it('only extends with "own" properties of the object', function () {
              function Clazz () {
                'clazz constructor';
              }

              function SubClazz () {
                'subclazz constructor';
              }

              Clazz.prototype.method = function() {
                'clazz method';
              };

              SubClazz.prototype = Object.create(Clazz.prototype);
              SubClazz.prototype.constructor = SubClazz;

              SubClazz.prototype.otherMethod = function() {
                'subclazz method';
              };

              var Extended = Primitive.extend(SubClazz.prototype);

              expect(Extended.otherMethod).to.be.a('function');
              expect(Extended.method).to.be(undefined);
            });
          });
        });
      });
    });

    describe('#isA', function () {
      it('is defined', function () {
        expect(Primitive.isA).to.be.a('function');
      });

      describe('when called', function () {
        describe('with no arguments', function () {
          it('returns false', function () {
            expect(Primitive.isA()).to.be(false);
          });
        });

        describe('with an object argument', function () {
          describe('that is an ancestor of the context', function () {
            it('returns true', function () {
              var instance = Primitive.new();

              expect(instance.isA(Primitive)).to.be(true);
            });
          });
        });
      });
    });
  });

})(this.expect, this.describe, this.it, this.Primitive);
