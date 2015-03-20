'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('markup', ['styles'], function() {

	var manifest = require('../../dist/css/rev-manifest.json');

	return gulp.src('./src/index.html')
		.pipe(plugins.replace('app.css', manifest['app.css']))
		.pipe(plugins.htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			minifyJS: true
		}))
		.pipe(gulp.dest('./'));

});
