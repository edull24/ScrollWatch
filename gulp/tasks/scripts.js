'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('scripts', ['clean-scripts'], function() {

	return gulp.src([
			'./src/js/vendor/classList.js',
			'./src/js/vendor/prism.js',
			'./node_modules/scrollwatch/dist/ScrollWatch-1.1.0.min.js',
			'./src/js/app.js'
		])
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('app.js'))
		.pipe(plugins.header('/*! ScrollWatch - ' + (new Date().toString()) + ' */\n'))
		.pipe(plugins.uglify({
			preserveComments: 'some'
		}))
		.pipe(plugins.rev())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(plugins.rev.manifest())
		.pipe(gulp.dest('./dist/js'));

});
