---
title: Array
---

## 初始化

``` javascript
var array = [];
var array = new Array(3); //array.length == 3
var array = new Array("Great");
var array = ["red", "yellow"];
```

array.length = 100;

## 检测数组

``` javascript
if (value instanceof Array) {} // 不一定正确
```
ES 5：

``` javascript
if (Array.isArray(value)) {}
```

## [].toString()

``` javascript
var arr = ["red", "yellow"];
arr.toString();  // "red,yellow"
```

## [].join()

```javascript
var arr = ["red", "yellow"];
arr.join(',');   // "red,yellow"
arr.join('||');  // "red||yellow"
```

## [].push()

* 语法：`arr.push(element1, ..., elementN)`
* 参数：被添加到末尾的新元素
* 功能：添加元素到数组末尾，返回新的 arr.length

例子 1：添加元素到数组

下面的代码创建了 sports 数组，包含两个元素，然后又把两个元素添加给它。total 变量为数组的新长度值。

```javascript
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");

console.log(sports); // ["soccer", "baseball", "football", "swimming"]
console.log(total);  // 4
```

例子 2：合并两个数组

该示例使用 apply() 添加第二个数组的所有元素。

```javascript
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// Merge the second array into the first one
// Equivalent to vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables); // ['parsnip', 'potato', 'celery', 'beetroot']
```

## [].pop()

* 语法：`arr.pop()`
* 功能：删除掉数组 (arr) 的最后一个元素，返回被删除的元素

## [].shift()

* 语法：`arr.shift()`
* 功能：shift 方法移除索引为 0 的元素 (即第一个元素)，返回被移除的元素 或 undefined （length 为 0 时）。

## [].unshift()

* 语法：`arr.unshift(element1, ..., elementN)`
* 功能：在数组 (arr) 的开头添加一个或者多个元素，返回数组新的 length 值

```javascript
var arr = [0, 1, 2];
arr.unshift(-2, -1); // = 5
//arr is [-2, -1, 0, 1, 2]
```

## [].sort()

* 语法：`arr.sort([compareFunction])`
* 功能：对数组的元素做原地的排序，返回这个数组。
* 参数：`compareFunction` 可选。用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的诸个字符的 `Unicode` 位点进行排序。
* 注意：如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前


## [].reverse()

* 语法：`arr.reverse()`
* 功能：颠倒数组中元素的位置，并返回该数组的引用，也就是 arr 本身。
* 注意：方法并不改变 arr 引用的值，只改变元素的位置。

## [].concat()

* 语法：`array.concat(value1, value2, ..., valueN)`
* 功能：将传入的数组或非数组值与原数组合并（原数组未被修改），组成一个新的数组并返回

```javascript
var alpha = ['a', 'b', 'c'];

// 组成新数组 ["a", "b", "c", 1, 2, 3], 原 alpha 数组未被修改
var alphaNumeric = alpha.concat(1, [2, 3]);
```

## [].fill()

``` javascript
arr.fill(value, start = 0, end = this.length)
```

``` javascript
[1, 2, 3].fill(1) // [1,1,1]
```

## [].slice()

* 语法：`arr.slice([begin[,end]])`
* 功能：slice() 方法把数组中一部分的浅复制（shallow copy）存入一个新的数组对象中，并返回这个新的数组
* 参数：
    * begin 为负数则将 begin 看成 begin + arr.length ，即倒数第 \|begin\| 个
    * end 为负数则将 end 看成 end + arr.length ，即倒数第 \|end\| 个
    * 注意：结束位置小于起始位置，返回空数组

```javascript
var arr = [0,1,2,3];

var newArr = arr.slice(1,3);
// = [1,2]
```

## [].splice()

* 语法：`array.splice(start, deleteCount[, item1[, item2[, ...]]])`
* 参数：
    * start: 从数组的哪一位开始修改内容。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位。
    * deleteCount: 从第 start 位开始（含第 start 位）要移除的数组元素的个数。
    * itemN: 要添加进数组的元素。
* 返回值：由被删除的元素组成的一个数组。

## [].indexOf()

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

* 语法： `arr.indexOf(searchElement[, fromIndex = 0])`
* 功能：返回给定元素能找在数组中找到的第一个索引值，否则返回 - 1

## [].lastIndexOf()

* 语法：`arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])`
* 功能：返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

## [].findIndex()

``` javascript
arr.findIndex(callback[, thisArg])
```

``` javascript
[1, 2, 3, -1,-3].findIndex(e=>e<0) // 3
```

## [].find()

``` javascript
arr.find(callback[, thisArg])
```

``` javascript
[1, 2, 3, -1,-3].find(e=>e<0) // -1
```

## [].every()

* 语法：`arr.every(callback[, thisArg])`
* 功能：测试数组的所有元素是否都通过了指定函数的测试
* 参数：
	* callback：用来测试每个元素的函数
	* thisArg：执行 callback 时使用的 this 值

callback 被调用时传入三个参数：元素值，元素的索引，原数组

```javascript
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
// passed is false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
// passed is true
```

## [].some()

* 语法：`arr.some(callback[, thisArg])`
* 功能：测试数组中的某些元素是否通过了指定函数的测试
* 参数：
	* callback：用来测试每个元素的函数
	* thisArg：执行 callback 时使用的 this 值

## [].filter()

* 语法：`arr.filter(callback[, thisArg])`
* 功能：使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组
* 参数：
	* callback：用来测试每个元素的函数（返回 true 表示保留该元素（通过测试），false 则不保留）
	* thisArg：执行 callback 时使用的 this 值

## [].map()

* 语法：`array.map(callback[, thisArg])`
* 功能：返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组
* 参数：
	* callback：原数组中的元素经过该方法后返回一个新的元素
		* currentValue：callback 的第一个参数，数组中当前被传递的元素。
		* index：callback 的第二个参数，数组中当前被传递的元素的索引。
		* array：callback 的第三个参数，调用 map 方法的数组
	* thisArg：执行 callback 时使用的 this 值

## [].forEach()

* 语法：`array.forEach(callback[, thisArg])`
* 功能：让数组的每一项都执行一次给定的函数
* 参数：
	* callback：在数组每一项上执行的函数
		* currentValue：callback 的第一个参数，数组中当前被传递的元素。
		* index：callback 的第二个参数，数组中当前被传递的元素的索引。
		* array：callback 的第三个参数，调用 forEach 方法的数组。
	* thisArg：执行 callback 时使用的 this 值

## [].reduce()

* 语法：`arr.reduce(callback,[initialValue])`
* 功能：接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始合并，最终为一个值。
* 参数：
	* callback：执行数组中每个值的函数，包含四个参数
		* previousValue：上一次调用回调返回的值，或者是提供的初始值（initialValue）
		* currentValue：数组中当前被处理的元素
		* index：当前元素在数组中的索引
		* array：调用 reduce 的数组
	* initialValue：作为第一次调用 callback 的第一个参数

## [].reduceRight()

* 语法：`arr.reduceRight(callback[, initialValue])`
* 功能：接受一个函数作为累加器（accumulator），让每个值（从右到左，亦即从尾到头）缩减为一个值。（与 reduce() 的执行方向相反）
* 参数：
	* callback：执行数组中每个值的函数，包含四个参数
		* previousValue：上一次调用回调返回的值，或者是提供的初始值（initialValue）
		* currentValue：数组中当前被处理的元素
		* index：当前元素在数组中的索引
		* array：调用 reduceRight 的数组
	* initialValue：作为第一次调用 callback 的第一个参数


## [].entries()

``` javascript
const iterator = ['one', 'two'].entries() // Array Iterator
iterator.next().value // [0, "one"]
iterator.next().value // [1, "two"]
iterator.next().value // undefined
Array.from(iterator) // []
```

## [].keys()

``` javascript
const arr1 = [,,];
[...arr1.keys()]; // [0,1]

const arr2 = [];
[...arr2.keys()]; // 0
```

## [].values()

like [].keys(), [].entries()

## Array.from()

``` javascript
Array.from(arrayLike[, mapFn[, thisArg]])
```

``` javascript
Array.from("foo"); // ["f", "o", "o"]

var s = new Set(["foo", window]);
Array.from(s);
// ["foo", window]

var m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m);
// [[1, 2], [2, 4], [4, 8]]
```

## Array.of()

``` javascript
Array.of(2) // [2]
Array.of(1, 2, 3) // [1,2,3]

Array() // []
Array(3) // [undefined × 3]
Array(1, 2, 3) // [3, 11, 8]
```
