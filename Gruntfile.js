'use strict'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt)

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {})

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    standard: {
      options: {
        format: true
      },
      all: {
        src: [
          'lib/**/*.js',
          'server.js',
          'test/**/*.js'
        ]
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          noFail: false // Optionally set to not fail on failed tests (will still fail on other errors)
        },
        src: ['test/**/*.js']
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'standard:all',
    'mochaTest'
  ])

}
