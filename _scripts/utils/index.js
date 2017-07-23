import Emitter from 'uemitter';

import { $, $$ } from './$';
import throttle from './throttle';
import debounce from './debounce';
import depend from './depend';

$.throttle = throttle;
$.debounce = debounce;
$.depend = depend;
$.Emitter = Emitter;
$.$ = $$;

export { $ as default, $$ };
