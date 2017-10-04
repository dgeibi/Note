/* eslint-disable no-console */
const wbBuild = require('workbox-build')

const genSW = (_, { publicPath: root }) =>
  wbBuild
    .injectManifest({
      swDest: `${root}/sw.js`,
      swSrc: `${__dirname}/sw.js`,
      globDirectory: root,
      globPatterns: [
        '**/*.{png,jpg,gif,svg,eot,ttf,woff}',
        'assets/js/bootstrap.js',
        'assets/js/app-0.js',
        'assets/css/*.css',
        'index.html',
        '*.json',
      ],
    })
    .then(() => {
      console.log('Service worker generated.')
    })
    .catch((err) => {
      console.log(`[ERROR] This happened: ${err}`)
    })

module.exports = {
  afterBuild: genSW,
}
