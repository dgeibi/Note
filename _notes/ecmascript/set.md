---
title: Set
---

``` javascript
let set = new Set()

set.add(1)
[...set] // [ 1 ]

set.add(1)
[...set] // [ 1 ]

set.add(NaN).add(NaN)
set.size // 2

set.add()
set.has(undefined) // true

set.add(-0).add(+0)
[...set] // [ 1, NaN, undefined, 0 ]

set.delete(0)
set.clear()
set // Set {}
```
