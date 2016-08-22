'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    assemble: {
	      options: {
	        layout: "web/layouts/default.html",
	        flatten: true,
	        data: 'web/data/**/*.{json,yml}',
	        assets: 'dist',
	        partials: ['web/includes/**/*.html' ]
	      },
	      pages: {
	        files: {
	          'dist/': ['web/pages/*.html']
	        }
	      }
	    },
	    sass: {
	        options: {
	            outputStyle: 'expanded',
				line_comments: 'true'
	        },
	        dist: {
	            files: {
	                'dist/css/custom.css': 'assets/sass/common.scss'
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
			    	'dist/css/custom.min.css': ['dist/css/custom.css']
			    }
			}
		},
	    copy:{
	      main: {
	        files: [
	          {
	            expand: true,
	            cwd : 'assets/' ,
	            src: ['{images,fonts}/**/*'],
	            dest: 'dist/'
	          }
	        ],
	      }
	    },
	    clean: {
		    html: ['dist/*.html'],
		    css: ['dist/css/*.css'],
		    js: ['dist/js'],
	      	images: ['dist/images']
		},
	    watch:{
	      assemble:{
	        files:[
	        	'web/includes/**/*.html', 
	          	'web/layouts/*.html', 
	          	'web/pages/**/*.html',
	          	'web/data/**/*.{json,yml}'
	        ],
	        tasks:['assemble']
	      },
	      sass:{
	      	files:['assets/sass/**/*.{scss,sass}'],
	      	tasks:['buildCSS']
	      }
	    }
	});

  
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');


	grunt.registerTask('cssConsole','building css', function () {
		grunt.log.writeln('Building CSS Framework');
		grunt.log.writeln('---------------------------');
	});

	grunt.registerTask('buildCSS', ['clean:css', 'cssConsole', 'sass', 'cssmin']);
	grunt.registerTask('buildJS', ['clean:js', 'buildLibrary', 'copy:js']);
 	grunt.registerTask('default', ['buildCSS', 'assemble', 'watch']);
};