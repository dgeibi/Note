import { $, $$ } from './$';
import throttle from './throttle';
import depend from './depend';

$.throttle = throttle;
$.depend = depend;
$.$ = $$;

export { $ as default, $$ };
