import { $, $$ } from './$';
import throttle from './throttle';

$.throttle = throttle;
$.$ = $$;

export { $ as default, $$ };
