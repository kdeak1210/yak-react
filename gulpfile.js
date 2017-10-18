var gulp = require('gulp');
var to5 = require('gulp-6to5');

gulp.task('es6-es5', function(){
  return gulp.src([
      './src/app.js',
      './src/*/**.js',
      './src/*/*/**.js'
    ]
  )
  .pipe(to5())
  .pipe(gulp.dest('./public/build/es5/'))
});

// A watch task to detect changes to the files
gulp.task('watch', function(){
  gulp.watch(['./src/app.js', './src/*/**.js', './src/*/*/**.js'], ['es6-es5']);
});

// 'Default task' - gulp executes this when given no inputs
gulp.task('default', ['es6-es5', 'watch'], function(){});