const csso = require('postcss-csso')
const cssnext = require('postcss-cssnext')
const postcssImport = require('postcss-import')

module.exports = {
  plugins: [
    postcssImport(),
    cssnext({
      browsers: '> 5% in CN, ie >= 9, last 2 versions',
    }),
    csso,
  ],
}
