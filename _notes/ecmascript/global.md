---
title: Global
---

Web 浏览器中 Global 对象作为 window 对象的一部分加以实现。

## 属性

* null
* undefined
* NaN
* Infinity
* Object
* Array
* Function
* Boolean
* String
* Date
* RegExp
* Error
* EvalError
* RangeError
* ReferenceError
* SyntaxError
* TypeError
* URIError

## 方法

* decodeURI()
* decodeURIComponent()
* encodeURI()
* encodeURIComponent()
* eval()
* isFinite()
* isNaN()
* parseInt()
* parseFloat()
* uneval()

## isNaN()

想象

```javascript
isNaN = function(value) {
    Number.isNaN(Number(value));
}
```

```javascript
isNaN(NaN);       // true
isNaN(undefined); // true
isNaN({});        // true

isNaN(true);      // false
isNaN(null);      // false
isNaN(37);        // false

// strings
isNaN("37");      // false: "37" is converted to the number 37 which is not NaN
isNaN("37.37");   // false: "37.37" is converted to the number 37.37 which is not NaN
isNaN("123ABC");  // true:  parseInt("123ABC") is 123 but Number("123ABC") is NaN
isNaN("");        // false: the empty string is converted to 0 which is not NaN
isNaN(" ");       // false: a string with spaces is converted to 0 which is not NaN

// dates
isNaN(new Date());                // false
isNaN(new Date().toString());     // true

// This is a false positive and the reason why isNaN is not entirely reliable
isNaN("blabla")   // true: "blabla" is converted to a number.
// Parsing this as a number fails and returns NaN
```

## encodeURI()

encodeURI() 是对统一资源标识符（URI）进行编码的方法。它使用 1 到 4 个转义字符串来替换 UTF-8 编码字符串中的每个字符（只有由两个代理字符区组成的字符才用四个转义字符编码）。

```javascript
var encodedURI = encodeURI(uri); /* 编码 */
var decodedURI = decodeURI(encodedURI); /* 解码 */
```

| 类型         | 包含                        |
|--------------|-----------------------------|
| 保留字符     | ; , / ? : @ & = + $         |
| 非转义的字符 | 字母 十进制数字 - _ . ! ~ * ' ( ) |
| 数字符号     | #                           |

## encodeURIComponent()

encodeURIComponent() 是对统一资源标识符（URI）的组成部分进行编码的方法。它使用一到四个转义字符串来替换 UTF-8 编码字符串中的每个字符（只有由两个 Unicode 代理区字符组成的字符才用四个转义字符编码）。

encodeURIComponent 转义除了字母，十进制数字， `(` `)` `.` `!` `~` `*` `'` `-` `_` 之外的所有字符。

由 encodeURIComponent() 编码的 URI 可用 decodeURIComponent() 解码。

## eval()

`eval(string)`

将一个JavaScript代码字符串求值成特定的对象。

## parseInt()

`parseInt(string, radix)`

radix: Different implementations produce different results when a radix is not specified, usually defaulting the value to 10.

``` javascript
console.log(Number.parseInt === parseInt) // true

console.log(parseInt(1.6)) // 1
console.log(Math.floor(1.6)) // 1

console.log(parseInt(-1.2)) // -1
console.log(Math.floor(-1.2)) // -2

console.log(parseInt("11abc")) // 11
console.log(Math.floor("11abc")) // NaN
```
