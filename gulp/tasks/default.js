'use strict';

var gulp = require('gulp');

gulp.task('default', ['styles', 'scripts', 'markup']);

gulp.task('watch', ['default'], function() {

	var watcher = gulp.watch(['src/**/*'], ['default']);

	watcher.on('change', function(e) {

		console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');

	});

});
