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
          banner: '/* minified by your mom with love */'
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
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:dev'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'index.js',
        options: {
          cwd: __dirname + '/src/'
        }
      }
    }
  });

  // Loading the plugins
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // Default task(s).
  grunt.registerTask('default', []);
  grunt.registerTask('run', ['concurrent:dev']);
  grunt.registerTask('build', ['mkdir', 'cssmin', 'copy']);
};
