const csso = require('postcss-csso')
const cssnext = require('postcss-cssnext')
const postcssImport = require('postcss-import')

module.exports = {
  plugins: [
    postcssImport(),
    cssnext({
      browsers: '> 5% in CN, last 2 versions',
    }),
    csso,
  ],
}
