var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var ignore = require('gulp-ignore');

gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', ['build']);
});

gulp.task('build', function() {
  return gulp.src('./scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
  .pipe(csscomb())
  .pipe(autoprefixer())
  .pipe(sourcemaps.write('.',{includeContent:false, sourceRoot: '../'}))
  .pipe(gulp.dest('./dist'))
  .pipe(ignore.exclude('*.map'))
  .pipe(cleancss())
  .pipe(rename({
      suffix: '.min'
  }))
  .pipe(gulp.dest('./dist'))
});

gulp.task('docs', function() {
  return gulp.src('./scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
  .pipe(csscomb())
  .pipe(autoprefixer({}))
  .pipe(sourcemaps.write('.',{includeContent:false, sourceRoot: '../'}))
  .pipe(gulp.dest('./docs/dist'))
  .pipe(ignore.exclude('*.map'))
  .pipe(cleancss())
  .pipe(rename({
      suffix: '.min'
  }))
  .pipe(gulp.dest('./docs/dist'))
});

gulp.task('default', ['build']);
