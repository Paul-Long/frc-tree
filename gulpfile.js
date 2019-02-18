const gulp = require('gulp');
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, './package.json'));
let packageJson = JSON.parse(content);

gulp.task('es', function() {
  return gulp.src(['./build/dist/*.js']).pipe(gulp.dest('package/es/'));
});

gulp.task('lib', function() {
  return gulp.src(['./build/lib/*.js']).pipe(gulp.dest('package/lib/'));
});

gulp.task('ts', function() {
  return gulp.src(['./build/dist/*.ts']).pipe(gulp.dest('package/ts/'));
});

gulp.task('css', function() {
  return gulp.src(['assets/*.css']).pipe(gulp.dest('package/assets/'));
});

gulp.task('readme', function() {
  return gulp.src(['./README.md']).pipe(gulp.dest('package/'));
});

gulp.task('package', function() {
  delete packageJson.scripts;
  packageJson.engines = {
    node: '>=6'
  };
  fs.writeFileSync(
    path.resolve(__dirname, './package/package.json'),
    JSON.stringify(packageJson, null, 2)
  );
});

gulp.task('build', ['es', 'lib', 'ts', 'css', 'readme', 'package']);
