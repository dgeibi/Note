---
title: this
---

``` javascript
this.a = 'outside'
const obj1 = { a: 'inside', b: this.a, c: this.b }
console.log(obj1.b, this.c) // outside undefined

const obj2 = { a: 'inside', func: function func() { console.log(this.a) } }
obj2.func() // inside

const obj3 = { a: 'inside', func: () => { console.log(this.a) } }
obj3.func() // outside

const obj4 = { arr: [this.a] }
console.log(obj4.arr) // [ 'outside' ]

this.b = 'outside b'
const obj5 = { a: 'inside', func() { console.log(this.a, this.b) } }
obj5.func() // inside
```
