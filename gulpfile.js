'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var compass = require('gulp-compass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var gutil = require('gulp-util');

var del = require('del');

var paths = {
  scripts: ['./src/js/**'],
  images: './src/images/**',
  scss: './src/scss/**/*.scss'
};

gulp.task('webserver', function() {
  connect.server({
    root: '.',
	port: 8080,
    livereload: true
  });
});

gulp.task('clean-img', function() {
  return del(['images']);
});
gulp.task('clean-js', function() {
  return del(['js']);
});
gulp.task('clean-css', function() {
  return del(['css']);
});

gulp.task('jsBundle',  function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/js/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./js/'))
    .pipe(connect.reload());
});


// Copy all static images
gulp.task('images',  function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('images'))
	.pipe(connect.reload());
});


gulp.task('compass',  function() {
  return gulp.src(paths.scss)
    .pipe(compass({
		css: 'css',           // compass 輸出位置
		sass: 'src/scss',      // sass 來源路徑
		image: 'images',   // 圖片來源路徑
		style: 'compressed',                // CSS 處理方式，預設 nested（expanded, nested, compact, compressed）
		comments: false,                    // 是否要註解，預設(true)
      	sourcemap: true
    }))
	.pipe(connect.reload());
});


gulp.task('watch',function(){
	gulp.watch(paths.scripts, ['jsBundle']);
	gulp.watch(paths.images, ['images']);	
    gulp.watch(paths.scss,['compass']);
});




gulp.task('default', ['compass', 'images', 'jsBundle', 'webserver', 'watch']);

