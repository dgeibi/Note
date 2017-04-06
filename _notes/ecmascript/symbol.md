---
title: Symbol
---

``` javascript
Symbol() == Symbol() // false
Symbol('12') == Symbol('12') // false
Symbol.for('12') == Symbol.for('12') // true
const symbol1 = Symbol('abc')
Symbol.keyFor(symbol1) // undefined
const symbol2 = Symbol.for('abc')
Symbol.keyFor(symbol2) // "abc"
Symbol.keyFor(Symbol.iterator) // undefined
```
