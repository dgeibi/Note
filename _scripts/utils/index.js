import { $, $$ } from './$';
import throttle from './throttle';
import debounce from './debounce';
import depend from './depend';
import Events from './events';

$.throttle = throttle;
$.debounce = debounce;
$.depend = depend;
$.Events = Events;
$.$ = $$;

export { $ as default, $$ };
