'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function() {

	return gulp.src('./css/app.css')
		.pipe(plugins.autoprefixer('last 2 versions', 'Explorer > 9'))
		.pipe(gulp.dest('./dist/css'));

});