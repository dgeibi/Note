const path = require('path')
const webpack = require('webpack')

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: PROD ? 'source-map' : 'cheap-module-eval-source-map',
  entry: {
    'app-0': './_scripts/app-0.js',
    'app-1': './_scripts/app-1.js',
    'app-2': './_scripts/app-2.js',
    'app-3': './_scripts/app-3.js',
    bootstrap: './_scripts/bootstrap.js',
  },
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: '[name].js',
    publicPath: '/assets/js/',
    chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('_scripts')],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'bootstrap',
      minChunks: Infinity,
    }),
  ],
}

if (PROD) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
      'screw-ie8': true,
      sourceMap: true,
    })
  )
}
