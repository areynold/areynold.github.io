// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');

// Configs

// Tasks
gulp.task('hello', function() {
    console.log('hello world');
});

gulp.task('default', ['hello']);
