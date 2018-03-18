---
title: DTD
---

文档类型声明 (Doctype Declaration)

The `text/html` serialization of HTML5, which is not SGML-based, uses the DOCTYPE only for mode selection. Since web browsers are implemented with special-purpose HTML parsers, rather than general-purpose DTD-based parsers, they don't use DTDs and will never access them even if a URL is provided. The DOCTYPE is retained in HTML5 as a "mostly useless, but required" header only to trigger "standards mode" in common browsers.

HTML5 不基于SGML，使用DOCTYPE(`<!DOCTYPE html>`)是为了让浏览器按`标准模式`工作, 不需要引用外部DTD

DTD不存在或格式不正确会导致文档以兼容模式呈现

而 HTML4.01 以前的标准基于SGML, 需要对DTD进行`引用`，才能告知浏览器文档所使用的文档类型。

## 浏览器模式

> 怪异（Quirks）模式：在怪异模式中，排版引擎会模拟 网景4和Windows中的IE5的行为。
> 准标准（Almost Standards）：在准标准模式中，则只包含很少的一部分怪异模式中的行为。
> 标准（Standards）模式：在完全标准的模式中，会尽量执行HTML和CSS规范所指定的行为。

from [lite/readme.md at master · hoosin/lite](https://github.com/hoosin/lite/blob/master/knowledge/part1/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%A8%A1%E5%BC%8F/readme.md)

> 如果文档中没有包含 DOCTYPE 或者包含了一个无法识别的 DOCTYPE，则浏览器就会进入怪异模式。
> 下面简单说一下怪异模式。怪异模式有许多“怪异”的行为，主要是为了兼容那些遗留的古老页面而保留的模式。不同浏览器的怪异模式也不尽相同，它们都有自己的实现方式。怪异模式与标准模式的差异主要体现在 盒模型（box model）、表格单元格高度的处理等。例如 IE 的怪异模式中，元素的 width 包含了 padding 和 border，而标准模式中 padding 和 border 并不属于宽度的一部分。

详见 [深入理解浏览器兼容性模式-图灵社区](http://www.ituring.com.cn/article/15231)

## 参考资料

* [W3C QA - Recommended list of Doctype declarations you can use in your Web document](https://www.w3.org/QA/2002/04/valid-dtd-list.html)