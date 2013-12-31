module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    watch: {
      build: {
        files: ['lib/primitive.es6.js'],
        tasks: ['traceur']
      },
      test: {
        files: ['lib/*.es5.js', 'test/*-spec.js'],
        tasks: ['karma']
      }
    },
    karma: {
      primitive: {
        configFile: 'karma.conf.js'
      }
    },
    traceur: {
      options: {
        // traceur options here
        arrowFunctions: true,
        blockBinding: true
      },
      primitive: {
        files: {
          'lib/primitive.es5.js': ['lib/primitive.es6.js']
        }
      }
    }
  });
};
