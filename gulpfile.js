var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var dts = require('dts-bundle');

var files = [
    './src/*.ts',
    './src/**/*.ts',
    './src/*.tsx',
    './src/**/*.tsx'
];

gulp.task('build_definitions', function() {
    return gulp.src(files)
    .pipe(ts({
        sortOutput: true,
        declarationFiles: true,
        experimentalDecorators: true,
        target: 'ES5',
        jsx: 'react'
    }))
    .dts
    .pipe(gulp.dest('./def/'))
})

gulp.task('definitions', ['build_definitions'], function() {
    dts.bundle({
        name: 'russet',
        main: 'def/russet/exports.d.ts'
    });
})

gulp.task('compile', function() {
    return gulp.src(files)
    .pipe(ts({
        sortOutput: true,
        declarationFiles: false,
        experimentalDecorators: true,
        target: 'ES5',
        jsx: 'react'
    }))
    .js
    .pipe(gulp.dest('./app/'))
})

gulp.task('default', ['compile'], function(){
    return true
});
