'use strict';

var gulp = require('gulp');  // Base gulp package
var babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
var browserify = require('browserify'); // Providers "require" support, CommonJS
var source = require('vinyl-source-stream'); // Vinyl stream support
var watchify = require('watchify'); // Watchify for source changes
var merge = require('utils-merge'); // Object merge tool

var config = {
    srcDir: './source/',
    srcFile: 'app.js',
    outputDir: './build/',
    outputFile: 'snapterest.js',
};

function bundle(bundler) {
  bundler
    .bundle()
    .pipe(source(config.outputFile)) // Set source name
    .pipe(gulp.dest(config.outputDir)) // Set the output folder
}

gulp.task('default', function () {
    var args = merge(watchify.args, { debug: true }); // Merge in default watchify args with browserify arguments

    var bundler = browserify(config.srcDir + config.srcFile, args)
    .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes
    .transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms

    bundle(bundler);

    bundler.on('update', function() {
        bundle(bundler); // Re-run bundle on source updates
    });
});