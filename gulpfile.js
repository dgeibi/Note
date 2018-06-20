const gulp = require('gulp')
const wikic = new (require('wikic'))()

function streamToPromise(stream) {
  return new Promise((resolve, reject) => {
    stream.on('finish', resolve).on('error', reject)
  })
}

function buildCSS() {
  const postcss = require('gulp-postcss')
  const sourcemaps = require('gulp-sourcemaps')
  const postcssConfig = require('./postcss.config')
  return streamToPromise(
    gulp
      .src('./_styles/main.css')
      .pipe(sourcemaps.init())
      .pipe(postcss(postcssConfig.plugins))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./assets/css'))
  )
}

function watchCSS() {
  return gulp.watch('./_styles/**/*.css', buildCSS)
}

const logStats = stats => {
  console.log(
    stats.toString({
      chunks: false,
      colors: true,
    })
  )
}

function getWebpackConfig() {
  return require('./webpack.config')
}

function buildWatchJS() {
  const webpack = require('webpack')
  const compiler = webpack(getWebpackConfig())
  return new Promise(done => {
    compiler.watch({}, (err, stats) => {
      if (err) {
        console.error(err)
      } else {
        done() // first done
        logStats(stats)
      }
    })
  })
}

function buildJS() {
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

  return runWebpack(getWebpackConfig())
    .then(logStats)
    .catch(error => {
      console.error(error)
      if (error.stats) {
        logStats(error.stats)
      }
    })
}

async function dev() {
  await buildCSS()
  watchCSS()
  await buildWatchJS()

  await wikic.clean()
  await wikic.watch().build()
  wikic.serve()
}

async function build() {
  await buildCSS()
  await buildJS()

  await wikic.clean()
  await wikic.build()
  return wikic
}

async function serve() {
  await build()
  wikic.serve()
}

gulp.task('dev', dev)
gulp.task('build', build)
gulp.task('serve', serve)
