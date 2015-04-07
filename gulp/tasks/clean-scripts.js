'use strict';

var gulp = require('gulp');
var del = require('del');

gulp.task('clean-scripts', function(cb) {

	// Delete everything in dist/js.

	del(['./dist/js/**/*'], cb);

});
