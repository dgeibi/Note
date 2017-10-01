import { $, $$ } from './$'
import throttle from './throttle'
import debounce from './debounce'

$.throttle = throttle
$.debounce = debounce
$.$ = $$

export { $ as default, $$ }
