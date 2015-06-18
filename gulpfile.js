'use strict';

var
  gulp = require('gulp'),
  rename = require('gulp-rename'),
  runSequence = require('run-sequence'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  karma = require('karma').server
  ;

gulp.task('scripts', function() {
  return gulp.src(['module.prefix', '**/*.js', 'module.suffix'], { cwd: 'src' })
    .pipe(plumber())
    .pipe(concat('angular-digest-logger.js'))
    .pipe(gulp.dest('.', { cwd: 'dist' }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.', { cwd: 'dist' }))
  ;
});

gulp.task('test', function(done) {
  var
    karmaConfig = {
      configFile: __dirname + '/config/karma.conf.js'
    };

  karma.start(karmaConfig, done);
});

gulp.task('styles', function() {
  return gulp.src('**/*.css', { cwd: 'src' })
    .pipe(gulp.dest('.', { cwd: 'dist' }))
});

gulp.task('clean', function(done) {
  var
    pattern = [
      'dist/*',
      '!dist/.git*'
    ];
  del(pattern, done);
});

gulp.task('build', function(done) {
  runSequence('clean', 'scripts', 'test', done);
});

