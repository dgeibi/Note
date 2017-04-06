---
title: Number
---

## Number()

``` javascript
Number("08") // 8
Number('123 hello') // NaN
```

## toString()

整数数字字面量（没有小数点）直接调用 Number.prototype 上的方法时，会报错，因为解释器不知道`.`是**方法调用符号**和**小数点**。

```
> 1.toString()
1.toString()
^^
SyntaxError: Invalid or unexpected token
```

解决方法如下，顺便看看 num.toString(base = 10) 参数的用法：

``` javascript
3.0.toString() // '3'
;(3).toString(2) // '11'
9 .toString(8) // '11'
12..toString(16) // 'c'
3['toString']() // '3'
```

## toFixed()

* 语法：`num.toFixed(digits = 0)`
* 功能：依据 digits（小数点后的位数）来格式化一个数，四舍五入
* 返回值：String

```javascript
var num = 12345.6789;
num.toFixed();         // 返回 "12346"：进行四舍五入，不包括小数部分
num.toFixed(1);        // 返回 "12345.7"：进行四舍五入
num.toFixed(6);        // 返回 "12345.678900"：用 0 填充

(1.23e+20).toFixed(2);    // 返回 "123000000000000000000.00"
(1.23e-10).toFixed(2);    // 返回 "0.00"

2.34.toFixed(1);          // 返回 "2.3"
-2.34.toFixed(1);         // 返回 -2.3 （由于操作符优先级，负数不会返回字符串）
(-2.34).toFixed(1);       // 返回 "-2.3" （若用括号提高优先级，则返回字符串）
```

## toExponential()

* 语法：num.toExponential(fractionDigits = 0)
* 功能：科学计数法，四舍五入
* 返回：`String`
* fractionDigits：小数点后的位数

```javascript
var num = 77.1234;

console.log(num.toExponential()); //  7.71234e+1
console.log(num.toExponential(4)); //  7.7123e+1
console.log( num.toExponential(2)); //  7.71e+1
console.log(77.1234.toExponential()); // 7.71234e+1
console.log(77..toExponential()); // 7.7e+1
console.log(0..toExponential()) // 0e+0
```

## toPrecision()

* 语法：`num.toPrecision(precision)`
* 功能：有效数字，四舍五入
* 返回：`String`

```javascript
var num = 5.123456;
console.log("num.toPrecision()  is" + num.toPrecision());  //  5.123456
console.log("num.toPrecision(5) is" + num.toPrecision(5)); //  5.1235
console.log("num.toPrecision(2) is" + num.toPrecision(2)); //  5.1
console.log("num.toPrecision(1) is" + num.toPrecision(1)); //  5

// 注意：在某些情况下会以指数表示法返回
console.log((1234.5).toPrecision(2)); // "1.2e+3"
```

Number.parseInt => parseInt

Number.isSafeInteger(num) return true if num if number and Number.MAX_SAFE_INTEGER ~ Number.MIN_SAFE_INTEGER
