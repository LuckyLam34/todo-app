'use strict';

var gulp          = require('gulp');
var sass          = require('gulp-sass');
var useref        = require('gulp-useref');
var gulpIf        = require('gulp-if');
var cssnano       = require('gulp-cssnano');
var imagemin      = require('gulp-imagemin');
var cache         = require('gulp-cache');
var del           = require('del');
var runSequence   = require('run-sequence');
var uglify        = require('gulp-uglify');
var jshint        = require('gulp-jshint');
var browserify    = require('browserify');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');
var ngAnnotate    = require('gulp-ng-annotate');
var browserSync   = require('browser-sync').create();
var templateCache  = require('gulp-angular-templatecache');

var src = 'assets/',
    app = 'app/',
    paths = {
      scss: 'sass/**/*.scss',
      images: 'resources/**/*.+(png|jpg|jpeg|gif|svg)',
      fonts: 'fonts/**/*',
      js: 'js/**/*.js',
      appJs: app + '**/*.js',
      appHtml: app + '**/*.html'
    };

gulp.task('sass', function() {
  return gulp.src(src + paths.scss)
    .pipe(sass())
    .pipe(gulp.dest(src + 'css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//watch for scss files changes
gulp.task('watch', function() {
  gulp.watch(src + paths.scss, ['sass', 'useref']);
  gulp.watch(paths.appJs, ['script', 'lint']);
  gulp.watch(paths.appHtml, ['template']);
});

//concatenates and minifies css files
gulp.task('useref', function() {
  return gulp.src('*.html')
    .pipe(useref())
  
    //Minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    
    //Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

//Minifies images
gulp.task('images', function() {
  return gulp.src(src + paths.images)
  
    //Optimizing images is a slow process and it shouldn't be repeated each time
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/resources'));
});

//Copy fonts to dist
gulp.task('fonts', function() {
  return gulp.src(src + paths.fonts)
    .pipe(gulp.dest('dist/fonts'));
});

//clean dist
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

//run sequence
gulp.task('build', ['framework', 'script', 'template'], function(callback) {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  );
});

//default sequence tasks (only type "gulp")
gulp.task('default', function(callback) {
  runSequence(['sass', 'lint', 'browserSync', 'watch'], callback);
});

gulp.task('lint', function() {
  return gulp.src(paths.appJs)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('framework', function() {
  return browserify({
    debug: false
  })
  .require('angular')
  .require('angular-animate')
  .require('angular-ui-bootstrap')
  .require('angular-ui-router')
  .bundle()
  .pipe(source('framework.js'))
  .pipe(gulp.dest(app + '.tmp'));
});

gulp.task('script', function() {
  return browserify({
    entries: app + 'app.js',
    debug: true
  })
  .external('angular')
  .external('angular-animate')
  .external('angular-ui-bootstrap')
  .external('angular-ui-router')
  .bundle()
  .pipe(source('app.js'))
  .pipe(ngAnnotate())
  .pipe(gulp.dest(app + '.tmp'));
});

//clear catche
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback);
});

//spin up  server using Browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('template', function() {
  return gulp.src(paths.appHtml)
    .pipe(templateCache({
      module: 'myApp',
      root: 'app/',
      moduleSystem: 'IIFE'
    }))
    .pipe(gulp.dest(app + '.tmp'));
});