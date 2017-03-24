'use strict'

import gulp from 'gulp'
import rename from 'gulp-rename'
import less from 'gulp-less'
import autoprefixer from 'gulp-autoprefixer'
import minifyCss from 'gulp-minify-css'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'

const paths = {
  less: 'src/less/',
  js: 'src/js/',
  dest: 'dist/'
}

gulp.task('less', () => {
  gulp.src(`${paths.less}**/*.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(gulp.dest(`${paths.dest}css/`))
})

gulp.task('js', () => {
  gulp.src(`${paths.js}**/*.js`)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.dest}js/`))
})

gulp.task('default', ['less', 'js'])
