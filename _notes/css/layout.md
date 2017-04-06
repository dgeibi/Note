---
title: Layout
---

## 文档结构

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <div class="box">

        </div>
    </body>
</html>
```

## 文本布局

| 属性 | 说明 | 值 |
|----|----|--|
|text-align | 内容对齐 | left, right, center, justify|
|text-indent | 指定内容缩进。| em, px, %(width of container), [ hanging \|\| each-line ] |
|vertical-align|[w3schools](http://www.w3schools.com/cssref/pr_pos_vertical-align.asp)|sub, super, px, %, ...|

### column

ie9

多列布局

* `column-count`：列数
* `column-gap`：列间距

```html
<div class="three-column">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit.
</div>
```

```css
.three-column {
  padding: 1em;
  -moz-column-count: 3;
  -moz-column-gap: 1em;
  -webkit-column-count: 3;
  -webkit-column-gap: 1em;
  column-count: 3;
  column-gap: 1em;
}
```

[CSS - column](http://zh.learnlayout.com/column.html)

## display

每个元素都有默认的 display 属性值;

[display - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/display)

### block

块级元素的默认值

块级元素：`div` `p` `form` `footer` `header` `section` ... 这些元素会尽可能撑满容器

### inline

行内元素的默认值

行内元素：`span` `a`

水平菜单：`li{display： inline;}`

### none

`display: none` 将元素隐藏，不保留其空间；`visibility: hidden` 将元素隐藏，但保留其空间。

### inline-block

块级元素放在一行，元素之间可用 `vertical-align` 调整布局

[CSS - inline-block](http://zh.learnlayout.com/inline-block.html)

## flexbox

* [CSS - flexbox](http://zh.learnlayout.com/flexbox.html)
* [一个完整的 Flexbox 指南_flexbox 教程_w3cplus](http://www.w3cplus.com/css3/a-guide-to-flexbox-new.html)
* [使用 CSS 弹性盒子 - CSS \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)

## 块级元素居中

```css
div.box {
    max-width: 800px;
    margin: 0 auto;
}
```

## box-sizing

`box-sizing: content-box;`

（标准盒模型）：

* width = 内容宽度
* height = 内容高度

`box-sizing: border-box;`

 * width = padding + border + 内容宽度
 * height = padding + border + 内容高度

用法：

```css
.example {
  -moz-box-sizing: border-box;
       box-sizing: border-box;
}
```

## clearfix hack

```html
<div class="elem clearfix">
    <img src="/images/ilta.png" alt="An Image">
</div>
```

```css
img {
  float: right;
}

.clearfix {
  overflow: auto;
  zoom: 1;
}
```

[CSS - 清除浮动（clearfix hack）](http://zh.learnlayout.com/clearfix.html)

## position

| 值 | 说明 |
|--|----|
|relative | 通过为元素指定一个属性（top, right, bottom, left），元素相对于其原来位置移动。也可以使用 margin 来达到同样的效果。|
|fixed | 为元素指定相对于窗口的确切位置 。即使文档的其它元素出现滚动，元素位置仍然不变。|
|absolute | 为元素指定相对于其父元素的确切位置。只有在父元素使用 relative, fixed or absolute 时才有效。你可以为任何父元素指定 `position: relative;` 因为它不会产生移动。|
|static | 默认值。当明确要关闭位置属性时使用。|

和 position 属性 (除了 static) 一起使用的, 有下列属性: top, right, bottom, left, width, height 通过设置它们来指定元素的位置或大小。

## 媒体查询

```css
/* 窗口宽度 >= 600 px */
@media screen and (min-width:600px) {
  nav {
    float: left;
    width: 25%;
  }
  section {
    margin-left: 25%;
  }
}

/* 窗口宽度 <= 599 px */
@media screen and (max-width:599px) {
  nav li {
    display: inline;
  }
}
```

[CSS媒体查询 - Web开发者指南 \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries/)
