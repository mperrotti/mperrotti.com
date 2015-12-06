module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

             sass: {
              dist: {
                files: {
                  'style/styles.css' : 'style/scss/styles.scss'
                }
              }
            },

            uglify: {

              options : {
                sourceMap : true
              },

              target : {
                files: {
                  'js/scripts.min.js' : [ 'js/build/*.js' ]
                }
              }

            },

            cssmin: {
              options: {
                shorthandCompacting: false,
                roundingPrecision: -1
              },
              target: {
                files: {
                  'style/styles.min.css' : ['style/styles.css']
                }
              }
            },

            watch: {

              scripts: {
                files: ['js/*.js', 'js/**/*.js'],
                tasks: ['uglify'],
                options: {
                  spawn: false,
                }
              },

              css: {
                files: ['style/scss/**/*.scss', 'style/scss/*.scss', 'style/styles.css'],
                tasks: ['sass'],
                options: {
                  spawn: false
                }
              },

              html: {
                files: ['*.html']
              },

              options: {
                livereload: true
              }

            }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    require('load-grunt-tasks')(grunt);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['uglify', 'sass', 'cssmin']);

};
