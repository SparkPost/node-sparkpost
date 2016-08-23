var path = require('path');

module.exports = function(grunt) {
  var config = {
    binPath: path.join('.', 'node_modules', '.bin')
  };

  grunt.loadNpmTasks('grunt-bump');

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
    }
  });

  // register default grunt command
  grunt.registerTask('default', []);
};
