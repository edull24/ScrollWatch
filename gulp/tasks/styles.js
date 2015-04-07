'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', ['sass'], function() {

	// Now that sass has been compiled into app.css, process that file and
	// inline the remaining imported vendor files. Then we can do our normal
	// wizardry of sourcemaping, autoprefixing, etc.
	return gulp.src('./dist/css/app.css')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.header('/*! ScrollWatch - ' + (new Date().toString()) + ' */\n'))
		.pipe(plugins.minifyCss())
		// Autoprefixer must be after minifying, otherwise vendor prefixed
		// keyframe rules get removed. No idea why :(
		.pipe(plugins.autoprefixer('last 2 versions', 'Explorer > 8'))
		.pipe(plugins.rev())
		.pipe(plugins.sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(plugins.rev.manifest())
		.pipe(gulp.dest('./dist/css'));

	// del(['./dist/css/app.css'], cb);

});
