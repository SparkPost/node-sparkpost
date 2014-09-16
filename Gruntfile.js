var matchdep = require('matchdep')
  , gruntTimer = require('time-grunt');

module.exports = function(grunt) {
  // Dynamically load any preexisting grunt tasks/modules
  matchdep.filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Pretty timing on grunt commands
  gruntTimer(grunt);

  // Configure existing grunt tasks and create custom ones
  grunt.initConfig({
    jshint: {
      files: ['index.js', 'lib/{,*/}*.js', 'examples/{,*/}*.js'],
      options: {
        reporter: require('jshint-stylish'),
        node: true
      }
    }
  });

  // grunt lint - leverages grunt-contrib-jshint command, lints our code
  grunt.registerTask('lint', [ 'jshint' ]);

  // grunt test - runs linting and then our unit tests
  grunt.registerTask('test', [ 'lint' ])

  // register default grunt command as grunt test
  grunt.registerTask('default', [ 'test' ]);
}
