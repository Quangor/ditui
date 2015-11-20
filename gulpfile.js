"use strict";


var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-minify-html');
var cssmin = require('gulp-minify-css');
var rev = require('gulp-rev');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var md5 = require("gulp-md5");

gulp.task('usemin', function() {
  gulp.src('./templates/*.html')
    .pipe(usemin({
      cssmin: cssmin(),
      jsmin: uglify(),
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function () {
  return gulp.src('./dist/static/css/*.css')
      .pipe(cssmin())
      .pipe(gulp.dest('./dist/static/css/'));
});

gulp.task('js', function () {
  return gulp.src('./dist/static/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/static/js/'));
});

gulp.task('md5', function () {
  return gulp.src(['./dist/static/js/*.js','./dist/static/css/*.css'])
      .pipe(md5())
      .pipe(gulp.dest('./dist/static/'));
});

gulp.task('img', function () {
  return gulp.src(['./dist/static/images/*.png','./dist/static/images/*.jpg','./dist/static/images/*.jpeg'])
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/static/images/'));
});