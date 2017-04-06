---
title: Date
---

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

## 构造函数

```javascript
new Date(); // 如果没有输入任何参数，则 Date 的构造器会依据系统设置的当前时间来创建一个 Date 对象
new Date(value);
new Date(dateString);
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]); //month 代表月份的整数值从 0（1 月）到 11（12 月）
```

## 方法

### Date.now()

* 语法：`var timeInMs = Date.now();`
* 功能：返回自 1970 年 1 月 1 日 00:00:00 UTC 到当前时间的毫秒数

### Date.parse()

* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/parse)
* 语法：`Date.parse(dateString)`
* 功能：解析一个表示日期对象的字符串，并返回从 1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的 UTC 时间）的毫秒数
* 参数：dateString
    * `"Dec 25, 1995"`
    * `"Mon, 25 Dec 1995 13:30:00 GMT"`
    * `"2011-10-10"`
    * `"2011-10-10T14:48:00"`

### Date.UTC()

* [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC)
* 语法：
```javascript
Date.UTC(year,month[,date[,hrs[,min[,sec[,ms]]]]])
```
* 功能：接受的参数同日期构造函数接受最多参数时一样，返回从 1970-1-1 00:00:00 UTC 到指定日期的的毫秒数

UTC 方法与 Date 有两点不同：

* Date.UTC 方法使用协调世界时代替本地时间。
* Date.UTC 方法返回一个时间数值，而不是一个日期对象。

```javascript
var utcDate = new Date(Date.UTC(96, 11, 1, 0, 0, 0));
```

## 原型方法

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/prototype)

* Date.prototype.getDate()
* Date.prototype.getDay()
* Date.prototype.getFullYear()
* Date.prototype.getHours()
* Date.prototype.getMilliseconds()
* Date.prototype.getMinutes()
* Date.prototype.getMonth()
* Date.prototype.getSeconds()
* Date.prototype.getTime()
* Date.prototype.getTimezoneOffset()
* Date.prototype.getUTCDate()
* Date.prototype.getUTCDay()
* Date.prototype.getUTCFullYear()
* Date.prototype.getUTCHours()
* Date.prototype.getUTCMilliseconds()
* Date.prototype.getUTCMinutes()
* Date.prototype.getUTCMonth()
* Date.prototype.getUTCSeconds()
* Date.prototype.setDate()
* Date.prototype.setFullYear()
* Date.prototype.setHours()
* Date.prototype.setMilliseconds()
* Date.prototype.setMinutes()
* Date.prototype.setMonth()
* Date.prototype.setSeconds()
* Date.prototype.setTime()
* Date.prototype.setUTCDate()
* Date.prototype.setUTCFullYear()
* Date.prototype.setUTCHours()
* Date.prototype.setUTCMilliseconds()
* Date.prototype.setUTCMinutes()
* Date.prototype.setUTCMonth()
* Date.prototype.setUTCSeconds()
* Date.prototype.toDateString()
* Date.prototype.toISOString() // 返回一个 ISO（ISO 8601 Extended Format）格式的字符串： `YYYY-MM-DDTHH:mm:ss.sssZ`。时区总是 UTC（协调世界时），加一个后缀 “Z” 标识
* Date.prototype.tojavascriptON()
* Date.prototype.toLocaleDateString()
* Date.prototype.toLocaleString()
* Date.prototype.toLocaleTimeString()
* Date.prototype.toString()
* Date.prototype.toTimeString()
* Date.prototype.toUTCString()
* Date.prototype.valueOf()
