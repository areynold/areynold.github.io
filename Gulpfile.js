// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var uncss = require('gulp-uncss');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// Configs
var config = {
    'sassFiles': 'src/scss/**/*.scss',
    'sassMain': 'src/scss/main.scss',
    'cssDir': 'css/',
    'autoprefixerOptions': {
        browsers: ['last 2 versions', '> 5%']
    },
    'imageSrc': 'src/images/*',
    'imageDest': 'images/'
}

// Tasks
gulp.task('compileSass', function() {
    return gulp.src(config.sassMain)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(config.autoprefixerOptions.browsers))
        .pipe(uncss({ html: ['index.html'] }))
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(config.cssDir));
});

gulp.task('minifyImages', function() {
    return gulp.src(config.imageSrc)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.imageDest));
});

gulp.task('default', function() {
    gulp.watch(config.sassFiles, [compileSass]);
    gulp.watch(config.imageSrc, [minifyImages]);
});
