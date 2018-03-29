---
title: '[1] == true 为什么成立？'
---

相关规范：

* [ToPrimitive](https://www.ecma-international.org/ecma-262/8.0/#sec-toprimitive)
* [OrdinaryToPrimitive](https://www.ecma-international.org/ecma-262/8.0/#sec-ordinarytoprimitive)
* [Abstract Equality Comparison](https://www.ecma-international.org/ecma-262/8.0/#sec-abstract-equality-comparison)

```js
;[] == true
// false
;[1] == true
// true
;[1, 2] == true
// false
```

`[1] == true` 为什么成立？

根据规范，有推导过程：

```js
;[1] == true
ToPrimitive([1]) == true
// [1].valueOf() is itself, skip
;[1].toString() == true
'1' == true
'1' == ToNumber(true)
'1' == 1
ToNumber('1') == 1
1 == 1
1 === 1
true
```

调用 `ToPrimitive` 时，`valueOf`、`toString` 哪个优先执行？

```js
;({
  toString() {
    return '2'
  },
  valueOf() {
    return 1
  },
} == true)
// true
;({
  toString() {
    return 1
  },
  valueOf() {
    return 2
  },
} == true)
// false
;({
  toString() {
    return 1
  },
} == true)
//true
;({
  toString() {
    return 1
  },
  valueOf() {
    return {}
  },
} == true)
// true
;({
  toString() {
    return {}
  },
} == true)
// TypeError: Cannot convert object to primitive value
// valueOf() 返回本身，valueOf/toString 返回值都是一个对象，报错
;({
  [Symbol.toPrimitive]() {
    return 2
  },
  valueOf() {
    return 1
  },
} == true)
// false，Symbol.toPrimitive 屏蔽 valueOf
;({
  [Symbol.toPrimitive]() {
    return 1
  },
} == true)
// true
;({
  [Symbol.toPrimitive]() {
    return {}
  },
} == true)
// TypeError: Cannot convert object to primitive value
```
