---
title: Selectors
---

## 说明

* 精确度越高，优先级越高
* 选择器可以组合使用

## 分类

- 标签选择器
    - `p`       选择所有 `<p>`
    - `div, p`  选择所有 `<div>` 及 `<p>`
    - `div p`   选择所有位于 `<div>` 内的 `<p>`
    - `div > p` 选择所有父级元素是 `<div>` 的 `<p>`
    - `div + p` 选择是 `<div>` 之后最近的同胞 HTML 元素的 `<p>`
    - `div ~ p` 选择所有在 `<div>` 之后的同胞 `<p>`
- 类选择器   `.nav`
- ID 选择器   `#principal`
- 属性选择器
    - `[target]`        选择所有存在 `target` 属性的元素
    - `[type=button] `  选择所有存在 `type="button"` 的元素
    - `[title~=flower]` 选择所有 `title` 属性包含 `flower` 的元素（`flower` 是独立的词，前后不能有非空白字符）
    - `[lang|=en]`      选择 `lang` 属性以 `en` 开头的所有元素（`en` 后只能以 `-` 做分割符）
    - `[class^="test"]` 选择 `class` 属性以 `test` 开头的所有元素
    - `[href$=".pdf"]`  选择 `href` 以 `.pdf` 结束的所有元素
    - `[href*="goog"]`  选择 `href` 包含 `goog` 子字符串的元素
- 伪类选择器   `selector:pseudo-class`

## 伪类和伪元素

伪类

```css
:link                 /* 未访问的链接；顺序：:link — :visited — :hover — :active.  会覆盖其他所有的 `a:*'*/
:visited              /* 已经访问的链接 会覆盖其他所有的 `a:*' */
:hover                /* 用户鼠标悬停（放在链接上不点）会覆盖其他所有的 `a:*' */
:active               /* 激活链接 （按下不松开链接）会覆盖其他所有的 `a:*'*/
:empty                /* 没有子元素的元素 */
:target               /* 匹配锚点 (id) 被选中 (target) 时的元素 */
:checked              /* 被选中的元素 */
:enabled              /* 启用的元素 */
:disabled             /* 被禁用的元素 */
:focus                /* 当元素成为焦点 */
:not(<selector>#)     /* 取反 */
:first-child          /* 父级元素下的第一个子元素 (ie 7+)*/
:last-child           /* 父级元素下的最后一个子元素 ie 9+ */
:nth-child(An+B)      /* 父级元素下的第 An+B 个子元素 n=0,1,2,… */
:nth-last-child(An+B) /* 从后开始数的 :nth-child */
li:first-of-type          /* 父级元素下的第一个 li 元素 */
li:last-of-type           /* 父级元素下的最后一个 li 元素 */
li:nth-of-type(An+B)      /* 父级元素下的第 An+B 个 li 元素 */
li:nth-last-of-type(An+B) /* 父级元素下的倒数第 An+B 个 li 元素 */
```

伪元素

```css
::before       /* 元素前面的内容 */
::after        /* 元素最后的内容 */
::first-letter /* 元素的第一个字母 */
::first-line   /* 元素的第一行 */
::selection    /* 被选中的内容，一般改变其 color，background-color */
```
