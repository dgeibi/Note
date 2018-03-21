/* eslint-disable no-console */
const wbBuild = require('workbox-build')
const path = require('path')

const babel = require('@babel/core')

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
  const { define } = config
  delete config.define
  const injectResult = await wbBuild.injectManifest(config)
  if (injectResult.warnings.length > 0) {
    console.log(injectResult.warnings.join('\n'))
  }
  const workboxDirname = await wbBuild.copyWorkboxLibraries(publicPath)
  const workboxPrefix = path.posix.normalize(
    path.relative(
      path.dirname(config.swDest),
      path.join(publicPath, workboxDirname)
    )
  )
  const string = await fse.readFile(config.swDest, 'utf8')
  const { code } = babel.transform(string, {
    babelrc: false,
    plugins: [
      [
        'transform-define',
        {
          'self.__workbox_prefix__': workboxPrefix,
          ...define,
        },
      ],
    ],
  })
  await fse.writeFile(config.swDest, code)
  console.log('Service worker generated.')
}

module.exports = {
  afterBuild: generateSW,
}
