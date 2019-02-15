const gulp = require('gulp');

gulp.task('js', function() {
  return gulp.src(['./build/dist/*.js']).pipe(gulp.dest('package/es/'));
});

gulp.task('ts', function() {
  return gulp.src(['./build/dist/*.ts']).pipe(gulp.dest('package/ts/'));
});

gulp.task('css', function() {
  return gulp.src(['assets/*.css']).pipe(gulp.dest('package/assets/'));
});

gulp.task('build', ['js', 'ts', 'css']);
