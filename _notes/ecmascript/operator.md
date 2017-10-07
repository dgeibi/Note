---
title: Operator
---

## Rest

```javascript
function(a, b, ...theRest) {
  // ...
}
```

theRest 是函数未定义的参数数组

也可以解构

```javascript
function f(...[a,b,c]){
    return a+b+c;
}

// 等效
function f(...arr){
    var [a,b,c] = arr;
    return a+b+c;
}

f(1,2,3,4); // 6
```

## Spread

就地去掉中括号，可在函数调用和数组里使用。

```javascript
f(...[1,2,3]);
// 等效
f(1,2,3);

f(1,2,...[3,4,5],7,8,...[9,10]);
// 等效
f(1,2,3,4,5,7,8,9,10);

[1,2,3,...[4,5,6]];
// 等效
[1,2,3,4,5,6];
```

## void

``` javascript
void expression
```

The void operator evaluates the given expression and then returns undefined.

``` javascript
void function iife() {
    console.log('...')
}(); // treat iife as expression
```

## new

作用

1. 创建一个对象
1. 将构造函数的作用域赋给新对象
1. 执行构造函数中的代码
1. 返回新对象 (对象的存在指向构造函数的属性 [[Prototype]])

``` javascript
var o = new Foo();

// 相当于
var o = new Object();
o.[[Prototype]] = Foo.prototype;
Foo.call(o);
```

## typeof

`typeof expression`

结果：

* "undefined"
* "boolean"
* "string"
* "number"
* "object"
* "function"

检测基本数据类型很方便

## instanceof

`variable instanceof constructor`

检测引用类型是否属于 xx 构造函数

``` js
const proto = {}
const r1= {}
r1.__proto__ = proto
const F1 = function() {}
F1.prototype = proto

r1 instanceof F1 // true
proto.isPrototypeOf(r1) // true
```

## 一元操作符

* `+` 正
* `-` 负
* `--`
* `++`

## 位操作符

* `～`
* `&`
* `|`
* `^`
* `<<`
* `>>`
* `>>>`

## 布尔操作符

* `!`
* `&&`
* `||`

## 乘性操作符

* `*`
* `/`
* `%` 求余

## 加性操作符

* `+` 加
* `-` 减

## 关系操作符

* `>` Greater than
* `<` Less than
* `<=` Less than or equal to
* `>=` Greater than or equal to

## 相等操作符

* `===` 全等
* `!==` 不全等
* `==` 相等
* `!=` 不相等

## 条件操作符

* boolean_expression ? true_value :  false_value

## 赋值操作符

* `=`
* `*=`
* `%=`
* `+=`
* `%=`
* `+=`
* `-=`
* `<<=`
* `>>=`
* `>>>=`

## 逗号操作符

* `var num1 = 1, num2 = 3, num3 = 2;`
* `var num = (4, 5, 56, 7); // num == 7`
