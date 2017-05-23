import { $, $$ } from './$';
import throttle from './throttle';
import depend from './depend';
import Events from './events';

$.throttle = throttle;
$.depend = depend;
$.Events = Events;
$.$ = $$;

export { $ as default, $$ };
