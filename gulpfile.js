var gulp = require('gulp');
var ejs = require('gulp-ejs');
var stylus = require('gulp-stylus');
var livereload = require('gulp-livereload');
var myth = require('gulp-myth');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var ts = require('gulp-ts');
var app = require('./app');

gulp.task('ts', function () {
    gulp.src(['./app/**/*.ts'])
        .pipe(concat('index.ts'))
        .pipe(gulp.dest('./public/ts'))
        .pipe(livereload(app));
});