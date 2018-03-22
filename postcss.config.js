const csso = require('postcss-csso')
const cssnext = require('postcss-cssnext')
const postcssImport = require('postcss-import')

module.exports = {
  plugins: [postcssImport(), cssnext(), csso],
}
