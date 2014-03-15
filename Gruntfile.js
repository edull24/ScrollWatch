module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({

		srcPath: 'src/',
		distPath: 'dist/',

		pkg: grunt.file.readJSON('package.json'),

		copy: {
			all: {
				files: [
					{
						expand: true,
						cwd: '<%= srcPath %>',
						src: ['<%= pkg.name %>.js'],
						dest: '<%= distPath %>'

					}
				]
			}
		},

		uglify: {
			all: {
				options: {
					banner: '/*! <%= pkg.name %> v<%= pkg.version %> | ' +
							'(c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> | ' +
							'License: <%= pkg.license %> | ' +
							'<%= pkg.repository.url %> */',
					report: 'gzip',
					sourceMap: true,
					preserveComments: false,
					compress: {
						drop_console: true
					}
				},
				files: {
					'<%= distPath %><%= pkg.name %>.min.js': ['<%= distPath %><%= pkg.name %>.js']
				}
			}
		}

	});

	// Load grunt tasks from NPM packages.
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('build', [
		'copy',
		'uglify'
	]);

	grunt.registerTask('default', ['build']);

};
