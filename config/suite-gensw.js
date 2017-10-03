const swPrecache = require('sw-precache')

const makeWrite = root => () => {
  swPrecache.write(`${root}/sw.js`, {
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

module.exports = (config, wikic) => ({
  afterBuild: makeWrite(wikic.publicPath),
})
