---
title: Transition
---

```
<single-transition>#
where 
<single-transition> = [ none | <single-transition-property> ] || <time> || <single-transition-timing-function> || <time>

where 
<single-transition-property> = all | <custom-ident>
<single-transition-timing-function> = ease | linear | ease-in | ease-out | ease-in-out | step-start | step-end | steps( <integer> [, [ start | end ] ]? ) | cubic-bezier( <number>, <number>, <number>, <number> )
```

In `<single-transition>`, the 1st `<time>` is for `transition-duration`, ths 2rd is for `transition-delay`