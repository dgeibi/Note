const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const readFile = filename => fs.readFileSync(filename, { encoding: 'utf8' })
const getChecksumOfFile = (file) => {
  const data = fs.readFileSync(file)
  return crypto
    .createHash('md5')
    .update(data)
    .digest('hex')
}
const getVersion = old => old + 1
const CONFIG_FILE = path.join(__dirname, 'config.json')
const TEMPLATE_FILE = path.join(__dirname, 'sw.template.js')

const updateSums = (config) => {
  const urls = (() => {
    const obj = {}
    Object.keys(config.urls).forEach((url) => {
      obj[url] = getChecksumOfFile(path.join(config.root, url))
    })
    return obj
  })()

  const diff = config.urls
    ? Object.keys(config.urls).reduce((changed, key) => {
      if (changed) return changed
      const newSum = urls[key]
      if (typeof newSum === 'undefined') return false
      const oldHash = config.urls[key]
      return oldHash !== newSum
    }, false)
    : true

  const version = diff ? getVersion(config.version) : config.version

  return Object.assign({}, config, { version, urls })
}

module.exports = function genSW() {
  let config = JSON.parse(readFile(CONFIG_FILE))
  if (process.env.NODE_ENV === 'production') config = updateSums(config)

  const generateSW = (template, { version, name, urls }) =>
    template
      .replace(/__version__/g, version)
      .replace(/__name__/g, name)
      .replace(/__urls__/g, urls)

  const template = readFile(TEMPLATE_FILE)
  const sw = generateSW(template, {
    version: config.version,
    name: config.name,
    urls: json(Object.keys(config.urls)),
  })

  const OUTPUT = path.join(config.root, config.output)

  fs.writeFileSync(CONFIG_FILE, json(config))
  fs.writeFileSync(OUTPUT, sw)
}

function json(obj) {
  return JSON.stringify(obj, null, 2)
}
