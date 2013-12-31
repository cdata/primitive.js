(function (expect, describe, it, Primitive) {
  'use strict';

  describe('Primitive', function () {
    it('is defined', function () {
      expect(Primitive).to.be.ok();
      expect(Primitive).to.be.an('object');
    });

    describe('#create', function () {
      it('is defined', function () {
        expect(Primitive.create).to.be.a('function');
      });

      describe('when called', function () {
        it('instantiates a copy of Primitive', function () {
          var instance = Primitive.create();

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
              var instance = Primitive.create();

              expect(instance.isA(Primitive)).to.be(true);
            });
          });
        });
      });
    });
  });

})(this.expect, this.describe, this.it, this.Primitive);
