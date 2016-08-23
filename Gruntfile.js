var matchdep = require('matchdep')
  , gruntTimer = require('time-grunt')
  , path = require('path');

module.exports = function(grunt) {
  // Dynamically load any preexisting grunt tasks/modules
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Pretty timing on grunt commands
  gruntTimer(grunt);

  var config = {
    binPath: path.join('.', 'node_modules', '.bin'),
  };

  var reporter = grunt.option('reporter') || 'xunit-file';

  // Configure existing grunt tasks and create custom ones
  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),
    bump: {
      options: {
        files: [ 'package.json' ]
        , updateConfigs: [ 'pkg' ]
        , commit: true
        , commitMessage: 'Release %VERSION%'
        , commitFiles: [ 'package.json', 'CHANGELOG.md' ]
        , createTag: true
        , tagName: '%VERSION%'
        , tagMessage: '%VERSION%'
        , push: true
        , pushTo: 'upstream'
        , gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
      }
    },
    shell: {
      lint: {
        command: 'npm run lint'
      },
      coverage: {
        command: path.join(config.binPath, 'istanbul') + ' cover --report lcov --dir test/reports/ node_modules/mocha/bin/_mocha test/spec -- --reporter ' + reporter,
        options: {
          stdout: true,
          failOnError: true
        }
      },
      test: {
        command: path.join(config.binPath, '_mocha') + ' test/spec'
      }
    }
  });

  // grunt lint - leverages grunt-contrib-jshint command, lints our code
  grunt.registerTask('lint', [ 'shell:lint' ]);

  // grunt test - runs linting and then our unit tests
  grunt.registerTask('test', [
    'lint',
    'shell:test',
    'shell:coverage'
  ]);

  // register default grunt command as grunt test
  grunt.registerTask('default', [ 'test' ]);
};
