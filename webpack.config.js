const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './_scripts/app.js',
    'app-old': './_scripts/app-old.js',
    bootstrap: './_scripts/bootstrap.js',
  },
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: '[name].js',
    publicPath: 'js',
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

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
      'screw-ie8': true,
    })
  )
}
