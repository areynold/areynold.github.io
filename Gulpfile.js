// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');

// Configs
var config = {
    'sassFiles': 'src/scss/**/*.scss',
    'sassMain': 'src/scss/main.scss',
    'cssDir': 'css/'
}

// Tasks
gulp.task('hello', function() {
    console.log('hello world');
});

gulp.task('compileSass', function() {
    return gulp.src(config.sassMain)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.cssDir));
});

gulp.task('default', function() {
    gulp.watch(config.sassFiles, [compileSass]);
});
