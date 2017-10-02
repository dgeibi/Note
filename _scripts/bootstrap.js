import loadJS from './utils/loadJS'

if (typeof Promise !== 'function') {
  loadJS('/assets/js/app-old.js')
} else {
  loadJS('/assets/js/app.js')
}
