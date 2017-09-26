import $ from '../utils'

$.depend({
  key: 'promise',
  url: '//cdn.bootcss.com/native-promise-only/0.8.1/npo.js',
  test() {
    if (typeof Promise !== 'function') return true
    return false
  },
})
