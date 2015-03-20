'use strict';

var gulp = require('gulp');
var del = require('del');

gulp.task('clean-styles', function(cb) {

	// Delete everything in dist/css.

	del(['./dist/css/**/*'], cb);

});
