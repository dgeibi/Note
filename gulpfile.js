/* eslint-disable global-require, no-console */
const gulp = require('gulp')

gulp.task('default', ['serve:watch'])

gulp.task('css', () => {
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')
  const postcssConfig = require('./postcss.config')
  return gulp
    .src('./_styles/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(postcssConfig.plugins))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css'))
})

gulp.task('css:watch', ['css'], () => {
  gulp.watch('./_styles/**/*.css', ['css'])
})

{
  const Wikic = require('wikic')
  const wikic = new Wikic()
  gulp.task('clean', () => wikic.clean())

  gulp.task('build', ['css', 'js', 'clean'], () => wikic.build())
  gulp.task('serve', ['build'], () => wikic.serve())

  gulp.task('build:watch', ['css', 'css:watch', 'js:watch', 'clean'], () =>
    wikic.build().then(() => wikic.watch())
  )
  gulp.task('serve:watch', ['build:watch'], () => wikic.serve())
}

{
  const webpack = require('webpack')
  const runWebpack = config =>
    new Promise((resolve, reject) => {
      webpack(config, (error, stats) => {
        if (error) {
          reject(error)
        } else {
          if (stats.hasErrors()) {
            const e = Error('webpack build has errors')
            e.stats = stats
            reject(e)
          } else {
            resolve(stats)
          }
        }
      })
    })
  const webpackConfig = require('./webpack.config')
  const logStats = stats => {
    console.log(
      stats.toString({
        chunks: false,
        colors: true,
      })
    )
  }

  gulp.task('js', () =>
    runWebpack(webpackConfig)
      .then(logStats)
      .catch(error => {
        console.error(error)
        if (error.stats) {
          logStats(error.stats)
        }
      })
  )

  gulp.task('js:watch', () => {
    const compiler = webpack(webpackConfig)
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err)
      } else {
        logStats(stats)
      }
    })
  })
}
