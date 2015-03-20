'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('sass', ['clean-styles'], function() {

	// Compile sass into app.css.
	return gulp.src('./src/css/app.scss')
		.pipe(plugins.sass({
			errLogToConsole: true,
			sourceComments: true
		}))
		.pipe(gulp.dest('./dist/css'));

});
