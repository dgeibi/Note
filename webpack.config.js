const path = require('path');
const webpack = require('webpack');

const resolve = {};

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
    comments: false,
    'screw-ie8': true,
  }),
];

const rules = [
  {
    test: /\.js[x]?$/,
    use: [{ loader: 'babel-loader' }],
    include: [path.resolve('_scripts')],
  },
];

module.exports = {
  entry: './_scripts/main.js',
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: 'js',
  },
  module: { rules },
  resolve,
  plugins,
};
