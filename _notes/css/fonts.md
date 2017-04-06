---
title: Fonts
---

## font-family

字体类型：

- serif: 有衬线字体
- sans-serif: 无衬线字体
- monospace: 等宽字体
- cursive: 手写体
- fantasy: 梦幻字体

## font-size

字体大小

px, em, rem, ...

## font-style

- normal（正常）
- italic（斜体）
- oblique（倾斜）

[italic vs oblique](https://www.zhihu.com/question/21443831/answer/18243900)

`font-style: italic` 时，如果字体没有 italic 变体就妥协到 oblique 变体。如果字体族连 oblique 也未提供，则由浏览器合成倾斜的仿 oblique。所以优先选择 `italic`。

## font-variant

```css
font-variant: small-caps;
```

将小写字母变成小号的大写。

## font-weight

字重

- normal (400)
- bold   (700)
- 100, 200, ..., 900

## font

```css
/* size | family */
font: 2em "Open Sans", sans-serif;

/* style | size | family */
font: italic 2em 'Open Sans', sans-serif;

/* style | variant | weight | size/line-height | family */
font: italic small-caps bolder 16px/3 cursive;

/* style | variant | weight | stretch | size/line-height | family */
font: italic small-caps bolder condensed 16px/3 cursive;

/* The font used in system dialogs */
font: message-box;
font: icon;

/* Global values */
font: inherit;
font: initial;
font: unset;
```

## @font-face

```css
@font-face {
    font-family: myfont; /* 声明字体名称 */
    src: local(Example Font), url(examplefont.woff) format("woff"),
      url(examplefont.woff) format("opentype");   /* 指定来源 */
    font-weight: bold;
    font-style: normal;
}
```
