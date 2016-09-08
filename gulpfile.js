var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');

var files = [
    './src/*.ts',
    './src/**/*.ts'
];


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
