'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function() {

	return gulp.src('./src/css/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}))
		.pipe(plugins.autoprefixer('last 2 versions', 'Explorer > 8'))
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/css'));

});
