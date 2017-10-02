/* global Modernizr */
import loadJS from './utils/loadJS'
import './utils/modernizr'

if (!Modernizr.promises) {
  loadJS('/assets/js/app-old.js')
} else {
  loadJS('/assets/js/app.js')
}
