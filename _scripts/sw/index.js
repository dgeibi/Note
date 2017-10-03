const path = require('path')
const swPrecache = require('sw-precache')

module.exports = function genSW() {
  const root = path.join(__dirname, '../../docs')
  const OUTPUT = path.join(root, 'sw.js')

  swPrecache.write(OUTPUT, {
    stripPrefix: root,
    staticFileGlobs: [
      `${root}/**/*.{png,jpg,gif,svg,eot,ttf,woff}`,
      `${root}/assets/js/bootstrap.js`,
      `${root}/assets/js/app-0.js`,
      `${root}/assets/css/*.css`,
      `${root}/index.html`,
    ],
    navigateFallback: '/index.html',
    runtimeCaching: [{
      urlPattern: /.+\.html$/,
      handler: 'networkFirst',
    }],
  })
}
