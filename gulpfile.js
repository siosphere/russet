var gulp = require('gulp');
var uglify = require('gulp-uglify');
var ts = require('gulp-typescript');
var dts = require('dts-bundle');

var tsProject = ts.createProject('tsconfig.json')

var files = [
    './src/*.ts',
    './src/**/*.ts',
    './src/*.tsx',
    './src/**/*.tsx'
];

gulp.task('build_definitions', function() {
    var proj = tsProject.src()
    .pipe(tsProject())
    ;

    return proj
    .dts
    .pipe(gulp.dest('./def/'))
})

gulp.task('definitions', ['build_definitions'], function() {
    dts.bundle({
        name: 'russet',
        main: 'def/exports.d.ts'
    });
})

gulp.task('compile', function() {
    return tsProject.src()
    .pipe(tsProject())
    .js
    .pipe(gulp.dest('./app/russet/'))
})

gulp.task('default', ['compile'], function(){
    return true
});
