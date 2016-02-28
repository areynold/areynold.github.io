// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');

// Configs
var config = {
    'sassFiles': 'src/scss/**/*.scss',
    'sassMain': 'src/scss/main.scss',
    'cssDir': 'css/',
    'autoprefixerOptions': {
        browsers: ['last 2 versions', '> 5%']
    }
}

// Tasks
gulp.task('hello', function() {
    console.log('hello world');
});

gulp.task('compileSass', function() {
    return gulp.src(config.sassMain)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixerOptions.browsers))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(config.cssDir));
});

gulp.task('default', function() {
    gulp.watch(config.sassFiles, [compileSass]);
});
