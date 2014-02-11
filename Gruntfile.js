module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // makes the build direcories
    // so we can store minified stuff
    mkdir: {
      all: {
        options: {
          create: ['build/css', 'build/js', 'build/img']
        }
      }
    },
    // mify css
    cssmin: {
      add_banner: {
        options: {
          banner: '/* minified by your mom */'
        },
        files: {
          'build/css/style.css': ['src/css/style.css']
        }
      }
    },
    // copy images over to dist directory
    copy: {
      main: {
        files: [ { expand: true, cwd: 'src/img', src: ['**'], dest: 'build/img/' }]
      }
    }
  });

  // Loading the plugins
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('build', ['mkdir', 'cssmin', 'copy']);
};
