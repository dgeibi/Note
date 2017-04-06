---
title: Function
---

## Arrow Functions

```javascript
function(a,b) {
  return a+b;
}

// 等效
(a,b) => a+b

// 返回一个对象需要括号
()=>({
  key:value
})
```

好处：方法里的 this 不再诡异。

箭头函数在定义时已经绑定了所在环境的 `this`，通过 bind/call/apply 无法改变 this 的指向

- arrow functions have lexical `this`, no dynamic `this`
- can NOT bind a different context
- `arguments` doesnt work inside arrow functions

[关于 this 的例子](/ecmascript/this.html)

## Default parameters

```javascript
function fn(a=1,b) {
    return a+b;
}
fn(undefined,2);
//3
```

## 函数声明提升

```javascript
hoisted(); // logs "foo"

function hoisted() {
  console.log("foo");
}
```

```javascript
// 函数表达式不会提升
notHoisted(); // TypeError: notHoisted is not a function

var notHoisted = function() {
   console.log("bar");
};
```

## 函数内部属性

### arguments

`arguments` 是类数组对象。

通过 `arguments` 对象访问参数「数组」，在非严格模式下，`arguments[i]` 与 `argi` 始终相互同步。

`arguments.callee` -> 拥有 arguments 对象的数组的函数

### this

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

```javascript
var color = "yellow";
var obj = {};
obj.color = "red";
obj.test = function() {console.log(color);};
obj.test(); // yellow
obj.test = function() {console.log(this.color);};
obj.test(); // red
```

## func.apply()

* 语法：`func.apply(thisArg[, argsArray])`

## func.call()

* 语法：`func.call(thisArg[, arg1[, arg2[, ...]]])`

## func.bind()

* 语法：`func.bind(thisArg[, arg1[, arg2[, ...]]])`
* 功能：创建一个新函数，当这个新函数被调用时，它的this值是传递给bind()的第一个参数，它的参数是bind()的其他参数和其原本的参数。

## func.length

函数的形参个数，不包括带默认值的形参之后的所有形参。

[函数的扩展 - ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/function#函数的-length-属性)
