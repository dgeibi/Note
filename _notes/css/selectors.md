---
title: Selectors
---

## 说明

特异度越高，优先级越高，选择器可以组合使用

- 内联
- id
- (伪)类
- 标签

`!important` 可以提升优先级。

## 分类


- 简单选择器
    - 通配选择器 `*`, 选择所有元素对象
    - 类型选择器
        - `p`       选择所有 `<p>`
        - `div, p`  选择所有 `<div>` 及 `<p>`
    - class选择器   `.nav`
    - id选择器   `#principal`
- 选择器组合
    - `div.header` 直接组合，不能把两个标签选择器放在一起，标签放在最前面，直接组合即同时满足
    - `div p`   后代选择器，选择所有位于 `<div>` 内的 `<p>`
    - `div > p` 亲子选择器，选择所有父级元素是 `<div>` 的 `<p>`
    - `div + p` 相邻(兄)弟选择器，选择是 `<div>` 之后最近的同胞 HTML 元素的 `<p>`
    - `div ~ p` (兄)弟选择器，选择所有在 `<div>` 之后的同胞 `<p>`
- 属性选择器
    - `[target]`        选择所有存在 `target` 属性的元素
    - `[type=button] `  选择所有存在 `type="button"` 的元素
    - `[title~=flower]` 选择所有 `title` 属性包含 `flower` 的元素（`flower` 是独立的词，前后不能有非空白字符）
    - `[lang|=en]`      选择 `lang` 属性以 `en` 开头的所有元素（`en` 后只能以 `-` 做分割符）
    - `[class^="test"]` 选择 `class` 属性以 `test` 开头的所有元素
    - `[href$=".pdf"]`  选择 `href` 以 `.pdf` 结束的所有元素
    - `[href*="google"]`  选择 `href` 包含 `google` 子字符串的元素
- 伪类选择器   `E:pseudo-class`
- 伪元素选择器 `E::pseudo-element`

## 伪类选择器

`:link`

未访问的链接；顺序：`:link — :visited — :hover — :active`.  会覆盖其他所有的 `a:*'`

`:visited`

已经访问的链接 会覆盖其他所有的 `a:*'`

`:hover`

用户鼠标悬停（放在链接上不点）会覆盖其他所有的 `a:*'`

`:active`

激活链接 （按下不松开链接）会覆盖其他所有的 `a:*'`

`:target`

location hash 匹配的元素

`:empty`

没有子元素的元素

`li:empty { display: none }`

`:checked`

被选中的元素，`input[type="checkbox"]` 使用

`:enabled`

启用的元素

`:disabled`

被禁用的元素

`:focus`

当元素成为焦点

`:not(<selector>#)`

取反

`:first-child`

父级元素下的第一个子元素

`:last-child`

父级元素下的最后一个子元素

`:nth-child(An+B)`

父级元素下的第 An+B 个子元素 n=0,1,2,…(n>=0) | odd | even

`:nth-last-child(An+B)`

从后开始数的`:nth-child`

`:first-of-type`

父级元素下的第一个 ? 元素

`:last-of-type`
父级元素下的最后一个 ? 元素

`:nth-of-type(An+B)`

父级元素下的第 An+B 个 ? 元素

`:nth-last-of-type(An+B)`

父级元素下的倒数第 An+B 个 ? 元素

`:only-child` 独子元素

`:only-of-type` ？类型的独子元素

## 伪元素选择器

`::before`

元素前面的内容

`::after`

元素最后的内容

`::first-letter`

元素的第一个字母

`::first-line`

元素的第一行

`::selection`

设置对象被选择时的颜色

`::placeholder`

设置对象文字占位符的样式, 注意浏览器前缀

``` html
<style>
input::placeholder {
	color: #111;
}
</style>
<input type="text" placeholder="input xxx" />
```
