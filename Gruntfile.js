module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jones: {
      foo: [1, 2, 3],
      bar: 'hello world',
      gar: false
    }
  });

  // Default task(s).
  grunt.registerTask('default', []);

  grunt.registerMultiTask('jones', 'Log stuff', function () {
    grunt.log.writeln(this.target + ': ' + this.data);
  });

};
