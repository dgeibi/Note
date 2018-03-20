/* eslint-disable no-console */
const wbBuild = require('workbox-build')
const path = require('path')

const generateSW = async (_, { publicPath, cwd, fse, config: { workbox } }) => {
  const isFile = p =>
    fse
      .stat(p)
      .then(x => x.isFile())
      .catch(() => false)

  const config = {
    globDirectory: publicPath,
    ...workbox,
  }

  config.swSrc = path.resolve(
    cwd,
    typeof config.swSrc !== 'string' ? 'sw.js' : config.swSrc
  )
  if (!await isFile(config.swSrc)) {
    throw Error(`should provide "config.workbox.swSrc" for sw.js`)
  }
  config.swDest = path.resolve(
    publicPath,
    typeof config.swDest !== 'string' ? 'sw.js' : config.swDest
  )

  const ret = await wbBuild.injectManifest(config)
  if (ret.warnings.length > 0) {
    console.log(ret.warnings.join('\n'))
  }
  const workboxDirname = await wbBuild.copyWorkboxLibraries(publicPath)
  const relativePath = path.posix.normalize(
    path.relative(path.dirname(config.swDest), path.join(publicPath, workboxDirname))
  )
  const string = await fse.readFile(config.swDest, { encoding: 'utf8' })
  const result = string.replace(/__workbox_prefix__/g, relativePath)
  await fse.writeFile(config.swDest, result)
  console.log('Service worker generated.')
}

module.exports = {
  afterBuild: generateSW,
}
