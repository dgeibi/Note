const gulp = require('gulp')
const postcssImport = require('postcss-import')
const cssnext = require('postcss-cssnext')
const postcss = require('gulp-postcss')
const csso = require('postcss-csso')
const htmlclean = require('htmlclean')
const Wikic = require('wikic')
const gulpWebpack = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const wikic = new Wikic()
const processors = [postcssImport(), cssnext(), csso]

wikic.beforeWrite((context) => {
  if (!context.data) return context
  const html = htmlclean(context.data)
  return Object.assign({}, context, { data: html })
})

gulp.task('default', ['serve', 'clean'])

gulp.task('clean', () => wikic.clean())

gulp.task('css', () =>
  gulp.src('./_styles/main.css').pipe(postcss(processors)).pipe(gulp.dest('./assets/css')))

gulp.task('build', ['css', 'js', 'clean'], () => wikic.build())

gulp.task('serve', ['css', 'build', 'css:watch', 'js', 'js:watch', 'clean'], () => {
  wikic.watch().serve()
})

gulp.task('css:watch', ['css'], () => {
  gulp.watch('./_styles/**/*', ['css'])
})

gulp.task('js', () =>
  gulp
    .src('_scripts/main.js')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('assets/js')))

gulp.task('js:watch', ['js'], () => {
  gulp.watch('./_scripts/**/*', ['js'])
})
