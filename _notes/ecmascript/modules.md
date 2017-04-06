---
title: Modules
---

## import

``` javascript
import assert from 'assert';
import {default as myAssert} from 'assert'; // = import myAssert from 'assert';
import {equal, deepEqual, notEqual} from 'assert';
import {equal as myEqual} from 'assert';

myAssert === assert
equal === assert.equal
myEqual === assert.equal
```

## export

``` javascript
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const

export expression;
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```
