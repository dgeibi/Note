---
title: Modules
---

## 语法

导入

```js
import assert from 'assert'
import { default as myAssert } from 'assert' // = import myAssert from 'assert';
import { equal, deepEqual, notEqual } from 'assert'
import { equal as myEqual } from 'assert'

myAssert === assert
equal === assert.equal
myEqual === assert.equal
```

导出

```js
export { name1, name2, …, nameN };
export { variable1 as name1, variable2 as name2, …, nameN };
export let name1, name2, …, nameN; // also var
export let name1 = …, name2 = …, …, nameN; // also var, const

export expression;
export default expression;
export default function (…) { … } // also class, function*
export default function name1(…) { … } // also class, function*
export { name1 as default, … };

export * from …;
export { name1, name2, …, nameN } from …;
export { import1 as name1, import2 as name2, …, nameN } from …;
```

## ES Modules VS CommonJS

|                          | ES Modules                      | CommonJS |
| ------------------------ | ------------------------------- | -------- |
| 载入方式                 | 异步 (HTML spec) 或 同步 (node) | 同步     |
| 判断依赖的时间           | 运行前                          | 运行时   |
| 导出类型                 | 变量的引用                      | 值拷贝   |
| 循环依赖                 | 支持                            | 受限     |
| 导入的标识符是否可以赋值 | 否                              | 是       |

Q: CommonJS 循环依赖的支持为什么受限？

A: 正在执行的模块导出值为尚未准备好，导入依赖，却被依赖依赖，依赖获得的当前模块值为 undefined。

## 导入的变量是相当于 const

```js
// a.mjs
import b from './b.mjs'

b.a = 1
console.log(b)

b = null
console.log(b)
```

```js
// b.mjs
let b = {}
export default b
```

执行：

```bash
$ node --experimental-modules a.mjs
# { a: 1 }
# TypeError: Assignment to constant variable.
```

<s>导出的是变量的引用，可以通过修改变量指向的值可以间接修改导出的值</s>

```js
// a.mjs
import b from './b'

console.log(b)

setTimeout(() => {
  console.log(b)
}, 2000)
```

```js
// b.mjs
let value = 1

setTimeout(() => {
  value += 1
}, 1000)

export default value
```

执行结果：

```
1
1
```

## 实现步骤

1.  构建（Construction）：找到模块的地址、获取（下载/读取文件系统）、解析所有文件，生成模块记录（module record）
2.  实例化（Instantiation）：将各模块导出值（当前为空）的位置与内存建立连接
3.  赋值（Evaluation）：执行代码并将导出值放到内存的相应位置

### 构建模块记录的步骤

第一步，找到入口文件：

浏览器：

```html
<script src="main.js" type="module">
```

Node：

```bash
$ node --experimental-modules main.mjs
```

接着，获取入口文件，解析文件，生成记录。

```js
// main.mjs
import { a } from './a.mjs'
```

Module Record 包含代码的 AST，依赖请求的信息（依赖 url，导入名）等等。

下一步：获取'./a.mjs'，解析……以此类推，深度优先遍历所有文件。

## 参考资料

* [ES modules: A cartoon deep-dive – Mozilla Hacks – the Web developer blog](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
* [Axel Rauschmayer's book: "Exploring JS: Modules"](http://exploringjs.com/es6/ch_modules.html)
* [JavaScript 模块的循环加载 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html)
