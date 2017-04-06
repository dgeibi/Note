---
title: RegExp
---

## 创建一个正则表达式

语法：

* `new RegExp(pattern [, flags])`
* `/pattern/flags`

flags(以下几个值的任意组合):

* g：全局匹配
* i：忽略大小写
* m：
让开始和结束字符（^ 和 $）工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处
* [u](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode) (ES6)：Unicode。将模式视为 Unicode 码位（code points）序列。
* [y](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp/sticky) (ES6)

## exec()

* 语法：`regexObj.exec(str)`
* 功能：为指定的一段字符串执行搜索匹配操作。它的返回值是一个数组或者 null
* [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)

```javascript
// Match "quick brown" followed by "jumps", ignoring characters in between
// Remember "brown" and "jumps"
// Ignore case
var re = /quick\s(brown).+?(jumps)/ig;
var result = re.exec('The Quick Brown Fox Jumps Over The Lazy Dog');
```

| 对象        | 属性 / 索引    | 描述                                                                                                                                                             | 例子                                        |
|-------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| result      | [0]          | 匹配的全部字符串                                                                                                                                                 | "Quick Brown Fox Jumps"                     |
|             | [1], ...[n ] | 括号中的分组捕获                                                                                                                                                 | [1] = Brown [2] = Jumps                     |
|             | index        | 匹配到的字符位于原始字符串的基于 0 的索引值                                                                                                                        | 4                                           |
|             | input        | 原始字符串                                                                                                                                                       |"The Quick Brown Fox Jumps Over The Lazy Dog"|
| re          | lastIndex    | 下一次匹配开始的位置                                                                                                                                             | 25                                          |
|             | ignoreCase   | 是否使用了'i'标记使正则匹配忽略大小写                                                                                                                            | true                                        |
|             | global       | 是否使用了'g'标记来进行全局的匹配.                                                                                                                               | true                                        |
|             | multiline    | 是否使用了'm'标记使正则工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。） | false                                       |
|             | source       | 正则模式的字符串                                                                                                                                                 | "quick\s(brown).+?(jumps)"                  |

## test()

* 语法：`regexObj.test(str)`
* 功能：执行一个检索，用来查看正则表达式与指定的字符串是否匹配。返回 true 或 false。
