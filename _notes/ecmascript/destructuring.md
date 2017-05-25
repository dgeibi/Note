---
title: Destructuring
---

``` javascript
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

// 和下面的 Rest parameters 类似
let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

default

```javascript
var [x = 1] = [undefined];
x // 1

var [x = 1] = [null];
x // null
```

object

```javascript
var { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

var { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined

var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

string

```javascript
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

let {length : len} = 'hello';
len // 5
```

function

```javascript
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

**Caveats**

``` javascript
let _a = 1;
let _b = 2;

setInterval(() => {
  _a += 1;
  _b += 2;
}, 1000);

function normal(obj) {
  setInterval(() => {
    console.log('a', obj.a);
    console.log('b', obj.b);
  }, 1000);
}

normal({
  get a() {
    return _a;
  },
  get b() {
    return _b;
  },
});
// a 2
// b 4
// a 3
// b 6
// a 4
// b 8
// a 5
// b 10
// a 6
// b 12
// a 7
// b 14
```

``` javascript
let _a = 1;
let _b = 2;

setInterval(() => {
  _a += 1;
  _b += 2;
}, 1000);

function wtf({ a, b }) {
  setInterval(() => {
    console.log('a', a);
    console.log('b', b);
  }, 1000);
}

wtf({
  get a() {
    return _a;
  },
  get b() {
    return _b;
  },
});

// a 1
// b 2
// a 1
// b 2
// a 1
// b 2
// a 1
// b 2
// a 1
// b 2
// a 1
// b 2
```
