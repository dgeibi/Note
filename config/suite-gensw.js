/* eslint-disable no-console */
const wbBuild = require('workbox-build')
const { basename, join } = require('path')

const WB_SW = require.resolve('workbox-sw')
const copyToDir = (fn, from, dir) => fn(from, join(dir, basename(from)))

const generateSW = async (_, { publicPath, fse, config: { workbox } }) => {
  const config = {
    globDirectory: publicPath,
    swDest: `${publicPath}/sw.js`,
    ...workbox,
  }
  await wbBuild.injectManifest(config)
  const string = await fse.readFile(config.swDest, { encoding: 'utf8' })

  const result = string.replace('workbox-sw.prod.js', basename(WB_SW))

  await fse.writeFile(config.swDest, result)
  console.log('Service worker generated.')
}

const copyWorkboxSW = async (_, { fse, publicPath }) => {
  await Promise.all([
    copyToDir(fse.copy, WB_SW, publicPath),
    copyToDir(fse.copy, `${WB_SW}.map`, publicPath),
  ])
}

module.exports = {
  afterBuild: generateSW,
  beforeBuild: copyWorkboxSW,
}
