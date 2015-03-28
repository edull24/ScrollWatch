'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var fs = require('fs');

gulp.task('markup', ['styles'], function() {

	var manifest = JSON.parse(fs.readFileSync('./dist/css/rev-manifest.json', {encoding: 'utf-8'}));

	return gulp.src('./src/index.html')
		.pipe(plugins.replace('app.css', manifest['app.css']))
		.pipe(plugins.htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			minifyJS: true
		}))
		.pipe(gulp.dest('./'));

});
