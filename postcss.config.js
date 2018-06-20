module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 2 versions',
      stage: 0,
      features: {
        'custom-properties': {
          preserve: false,
        },
      },
    },
    'postcss-calc': {},
    'postcss-csso': {},
  },
}
