const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const PROD = process.env.NODE_ENV === 'production'

let base = {
  devtool: PROD ? 'source-map' : 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, 'assets/js'),
    filename: '[name].js',
    publicPath: '/assets/js/',
    chunkFilename: '[name].bundle.js',
  },
}

if (PROD) {
  const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin')

  base = merge(base, {
    plugins: [
      new BabelMinifyWebpackPlugin(
        {
          removeConsole: true,
          removeDebugger: true,
        },
        {
          comments: false,
        }
      ),
    ],
  })
}

const includeJSRule = {
  test: /\.js$/,
  loader: 'babel-loader',
  include: [path.resolve('_scripts')],
}

const getJSRule = opts => Object.assign({}, includeJSRule, opts)

const modern = {
  entry: {
    'app-0': './_scripts/app-0.js',
  },
  module: {
    rules: [
      getJSRule({
        options: {
          presets: [
            [
              'env',
              {
                modules: false,
                useBuiltIns: 'usage',
                targets: {
                  browsers: ['Chrome >= 52'],
                },
              },
            ],
            'stage-3',
          ],
        },
      }),
    ],
  },
}

const legacy = {
  entry: {
    'app-1': './_scripts/app-1.js',
    'app-2': './_scripts/app-2.js',
    'app-3': './_scripts/app-3.js',
    bootstrap: './_scripts/bootstrap.js',
  },
  module: {
    rules: [
      getJSRule({
        options: {
          presets: [
            [
              'env',
              {
                modules: false,
                useBuiltIns: 'entry',
              },
            ],
            'stage-3',
          ],
        },
      }),
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'bootstrap',
      minChunks: Infinity,
    }),
  ],
}

module.exports = [merge(base, modern), merge(base, legacy)]
