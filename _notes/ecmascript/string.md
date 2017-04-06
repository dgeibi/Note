---
title: String
---

## Template Literals

```javascript
var str = `a string`;
str // "a string"
```

```javascript
var x = 12;
`x=${x}` // "x=12"
```

```javascript
var x = 2, y=3;
`${ x  +  y }`//"5"
```

```javascript
function f() {
    return "有趣";
}
`${f()}` //"有趣"
```

```javascript
`line1
line2` // 'line1\nline2'

`line1
    line2` // 'line1\n    line2'
```

## 字符方法

### charAt()

`str.charAt(index)`

charAt() 方法返回字符串中指定位置的字符

### charCodeAt()

`str.charCodeAt(index)`

charCodeAt() 方法返回 0 到 65535 之间的整数，代表索引处字符的 UTF-16 编码单元（在 Unicode 编码单元表示一个单一的 UTF-16 编码单元的情况下，UTF-16 编码单元匹配 Unicode 编码单元。否则，比如 Unicode 编码单元 > 0x10000 的情况下，只能匹配 Unicode 代理对的第一个编码单元）。如果你希望得到整点编码值，使用 codePointAt()

### codePointAt()

## 字符串格式化方法

### trim()

`str.trim()`

会删除一个字符串两端的空白字符。在这个字符串里的空格包括所有的空格字符 (space, tab, no-break space 等) 以及所有的行结束符（如 LF，CR）

trim() 方法并不影响原字符串本身，它返回的是一个新的字符串。

### toLowerCase()

`str.toLowerCase()`

toLowerCase 会将调用该方法的字符串值转为小写形式，并返回。toLowerCase 不会影响字符串本身的值。

### toUpperCase()

### toLocaleLowerCase()

### toLocaleUpperCase()

## 字符串操作方法


### concat()

`str.concat(string2, string3[, ..., stringN])`

concat 方法将一个或多个字符串与原字符串连接合并，形成一个新的字符串并返回。 concat 方法并不影响原字符串。

### slice()

`str.slice(beginSlice[, endSlice])`

```javascript
var str = 'The morning is upon us.';
str.slice(-3);     // returns 'us.'
str.slice(-3, -1); // returns 'us'
str.slice(0, -1);  // returns 'The morning is upon us'
```

### substr()

`str.substr(start[, length])`

如果 length 为 0 或负值，则 substr 返回一个空字符串。如果忽略 length，则 substr 提取字符，直到字符串末尾。

### substring()

`str.substring(indexStart[, indexEnd])`

返回字符串两个索引之间（或到字符串末尾）的子串

substring 提取从 indexStart 到 indexEnd（不包括）之间的字符。特别地：

* 如果 indexStart 等于 indexEnd，substring 返回一个空字符串。
* 如果省略 indexEnd，substring 提取字符一直到字符串末尾。
* 如果任一参数小于 0 或为 NaN，则被当作 0。
* 如果任一参数大于 stringName.length，则被当作 stringName.length。
* 如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样。例如，str.substring(1, 0) == str.substring(0, 1)。

## 字符串位置方法

### indexOf()

`str.indexOf(searchValue[, fromIndex])`

### lastIndexOf()

`str.lastIndexOf(searchValue[, fromIndex])`


## 字符串的模式匹配方法

### match()

`str.match(regexp);`

返回值：一个包含匹配结果的数组，如果没有匹配项，则返回 null。

参看：RegExp 方法

* 如果你需要知道一个字符串是否匹配一个正则表达式（RegExp），可使用 [RegExp.test(str)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)。
* 如果你只是需要第一个匹配结果，你可能想要使用 RegExp.exec(str)。

### search()

`str.search(regexp)`

如果匹配成功，则 search() 返回正则表达式在字符串中首次匹配项的索引。否则，返回 -1。

### replace()


replace() 方法使用一个替换值（replacement）替换掉一个匹配模式（pattern）在原字符串中某些或所有的匹配项，并返回替换后的新的字符串。这个替换模式可以是一个字符串或者一个 RegExp，替换值可以是一个字符串或者一个函数。

`str.replace(regexp|substr, newSubStr|function)`

返回值

一个部分或全部匹配由替代模式所取代的新的字符串。

替换字符串可以插入下面的特殊变量名：

| 变量名 | 代表的值                                                                                     |
|--------|----------------------------------------------------------------------------------------------|
| $$     | 插入一个 "$""。"                                                                             |
| $&     | 插入匹配的子串。                                                                             |
| $`     | 插入当前匹配的子串左边的内容。                                                               |
| $'     | 插入当前匹配的子串右边的内容。                                                               |
| $n     | 假如第一个参数是 RegExp 对象，并且 n 是个小于 100 的非负整数，那么插入第 n 个括号匹配的字符串。 |

### split()

split() 方法通过把字符串分割成子字符串来把一个 String 对象分割成一个字符串数组。

`str.split([separator[, limit]])`

separator 可以是一个字符串或正则表达式

## etc

### localeCompare()

* 当 referenceStr 在 compareStr 前面时返回负数
* 当 referenceStr 作 compareStr 后面时返回正数
* 相同位置时返回 0

### String.fromCharCode()

根据指定的 Unicode 编码中的序号值来返回一个字符串。

`String.fromCharCode(num1, ..., numN)`

``` javascript
String.fromCharCode(65,66,67); // 'ABC'
```

缺陷：只能转换码点在16位（4位十六进制数）以内的字符，可使用 ES6 的 `String.fromCodePoint()` 替代。

### String.fromCodePoint()

return a string created by using the specified sequence of code points.
