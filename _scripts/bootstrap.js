import loadJS from './utils/loadJS'
import './utils/modernizr'

const { Modernizr } = window

if (
  Modernizr.promises &&
  Modernizr.matchmedia &&
  Modernizr.classlist &&
  Modernizr.mutationobserver
) {
  loadJS('/assets/js/app-0.js')
} else if (Modernizr.matchmedia && Modernizr.classlist && Modernizr.mutationobserver) {
  loadJS('/assets/js/app-1.js')
} else if (Modernizr.matchmedia && Modernizr.classlist) {
  loadJS('/assets/js/app-2.js')
} else {
  loadJS('/assets/js/app-3.js')
}
