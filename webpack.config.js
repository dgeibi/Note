const path = require('path')

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  mode: PROD ? 'production' : 'development',
  devtool: PROD ? 'source-map' : 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: '[name].js',
    publicPath: '/assets/js/',
  },
  entry: {
    app: './_scripts/app.js',
    'offline-page': './_scripts/offline-page.js',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve('_scripts')],
        options: {
          presets: [
            [
              '@babel/env',
              {
                modules: false,
                useBuiltIns: 'usage',
                targets: {
                  browsers: ['last 2 versions'],
                },
                shippedProposals: true,
              },
            ],
          ],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },
      },
    ],
  },
}
