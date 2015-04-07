'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var fs = require('fs');

gulp.task('markup', ['styles', 'scripts'], function() {

	var cssManifest = JSON.parse(fs.readFileSync('./dist/css/rev-manifest.json', {encoding: 'utf-8'}));
	var jsManifest = JSON.parse(fs.readFileSync('./dist/js/rev-manifest.json', {encoding: 'utf-8'}));

	return gulp.src('./src/index.html')
		.pipe(plugins.replace('app.css', cssManifest['app.css']))
		.pipe(plugins.replace('app.js', jsManifest['app.js']))
		.pipe(plugins.htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			minifyJS: true
		}))
		.pipe(gulp.dest('./'));

});
