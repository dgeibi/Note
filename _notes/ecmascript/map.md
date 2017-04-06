---
title: Map
---

``` javascript
let map = new Map()
map.set(1, 2) // Map { 1 => 2 }
map.get(1) // 2
map.has(1) // true
[...map] // [ [ 1, 2 ] ]


map.set(1, 'one').set(2, 'two')
[...map.keys()] // [ 1, 2 ]
[...map.values()] // ['one', 'two']
map.delete(1)
map.has(1) // false

map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]) // Map { 1 => 'one', 2 => 'two', 3 => 'three' }
```
