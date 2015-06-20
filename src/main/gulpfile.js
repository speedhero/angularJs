var gulp = require('gulp'),
  less = require('gulp-less'),
  gaze = require('gaze'),
  jade = require('gulp-jade'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  stylish = require('jshint-stylish'),
  minifyCSS = require('gulp-minify-css'),
  connect = require('gulp-connect'),
  imagemin = require('gulp-imagemin'),
  sourcemaps = require('gulp-sourcemaps');

/**
 * @usage: gulp connect
 *
 * 创建服务器，hostname：localhost；port：8001
 */
gulp.task('connect', function() {
  connect.server({
    port: 12001,
    root: 'webapp',
    livereload: true
  });
});

/**
 * @usage: gulp less
 *
 * 编译less文件
 */
gulp.task('less', function() {
  gulp
    .src('webapp/raw/less/theme/default/theme-default.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('webapp/css'))
    .pipe(connect.reload());
});

/**
 * @usage: gulp imagemin
 *
 * 优化image
 */
gulp.task('imagemin', function() {
  console.info('imagemin');
});

/**
 * @usage: gulp jade
 *
 * 编译jade文件
 */
gulp.task('jade', function() {
  gulp
    .src('webapp/raw/jade/**/*.jade')
    .pipe(jade({
      pretty: true,
      doctype: 'html'
    }))
    .pipe(gulp.dest('webapp/html'))
    .pipe(connect.reload());
});

/**
 * @usage: gulp concat
 *
 * 串接js文件，同时jshint
 */
gulp.task('concat', function() {
  gulp
    .src(['webapp/raw/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('webapp/js'))
    .pipe(connect.reload());
});


gulp.task('watch', function() {
  gulp.watch(['webapp/raw/jade/**/*.jade'], ['jade']);
  gulp.watch(['webapp/raw/less/**/*.less'], ['less']);
  gulp.watch(['webapp/raw/js/**/*.js'], ['concat']);
});

gulp.task('watch-less', function() {
    gulp.watch(['webapp/raw/less/**/*.less'], ['less']);
});

gulp.task('build-all', ['jade', 'concat', 'less']);
gulp.task('build-less', ['less']);
gulp.task('build', ['concat', 'less']);
gulp.task('default', ['connect', 'build', 'watch']);
