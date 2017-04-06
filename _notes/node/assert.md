---
title: Assert
---

## assert(value[, message])

alias of assert.ok

``` javascript
const assert = require('assert')

assert(true) // OK
assert(1) // OK
assert({}) // OK
assert([]) // OK


assert(0, 'wrong') // throws
assert(false) // throws
```

## assert.deepEqual(actual, expected[, message])

Primitive values are compared with the equal comparison operator `==`

**only** enumerable own properties are considered.

not test object prototypes, attached symbols.

## assert.notDeepEqual(actual, expected[, message])

意义和 assert.deepEqual 相反

## assert.deepStrictEqual(actual, expected[, message])

primitive values are compared using the strict equality operator (`===`)

object comparisons include a strict equality check of their prototypes.

## assert.notDeepStrictEqual(actual, expected[, message])

意义与 assert.deepStrictEqual 相反


## assert.throws(block[, error][, message])

- `block`: `Function`
- `error`: `RegExp` \| `Function`
- `message`:  `any`

**有效的实例**

```
assert.throws(
	() => {
		throw new Error('Wrong value')
	},
	Error
)
```

**有效的错误信息**

``` javascript
assert.throws(
	()=> {
		throw new Error('Wrong value')
	},
	/value/
);
```

**自定义错误验证**

``` javascript
assert.throws(
	() => {
		throw new Error('Wrong value');
	},
	(err) => {
		if ( (err instanceof Error) && /value/.test(err) ) {
			return true
		}
	},
	'unexpected error'
)
```

## assert.doesNotThrow(block[, error][, message])

- `block`: `Function`
- `error`: `RegExp` \| `Function`
- `message`:  `any`

block 被马上执行，如果block抛出的错误是 error 的实例／error为undefined，assert.doesNotThrow 会抛出错误（类型为 AssertionError，错误信息为 message）。如果，block抛出的错误不是error的实例，抛出的错误会assert.doesNotThrow 继续抛出。

## assert.equal(actual, expected[,message])

测试 `actual == expected`

## assert.notEqual(actual, expected[, message])

测试 `actual != expected`


## assert.strictEqual(actual, expected[, message])

测试 `actual === expected`

## assert.notStrictEqual(actual, expected[, message])

测试 `actual !== expected`

## assert.fail(actual, expected, message, operator)

- actual, expected, message: any
- operator: String

``` javascript
assert.fail(1, 2, undefined, '>')
// AssertionError: 1 > 2
```

## assert.ifError(value)

throws `value` if `value` is truthy.

会抛出 Error 的实例，不会抛出 0，undefined 等
