---
title: Borders
---

## 属性简介

| 属性名 | 说明 |
|------|----|
|border | 四边，值：border-width border-style border-color|
|border-top | 上 |
|border-right | 右 |
|border-bottom | 下 |
|border-left | 左 |
|border-width | 宽度: medium\|thin\|thick\|length|
|border-color | 颜色 |
|border-top-width | 顶部边框的宽度 |
|border-left-color | 左边框的颜色 |
|border-bottom-style | 底边框的样式 |
|...|...|

## border-style

| 值      | 说明     |
|--------|---------|
|none    |no border  |
|hidden  |none       |
|dotted  | 点         |
|dashed  | 破折号     |
|solid   | 实心的     |
|double  | 双层的     |
|groove  |(3D) 像槽的 |
|ridge   |(3D) 隆起的 |
|inset   |(3D)       |
|outset  |(3D)       |

* border-style:dotted solid double dashed;
    * top border is dotted
    * right border is solid
    * bottom border is double
    * left border is dashed

* border-style:dotted solid double;
    * top border is dotted
    * right and left borders are solid
    * bottom border is double

* border-style:dotted solid;
    * top and bottom borders are dotted
    * right and left borders are solid

* border-style:dotted;
    * all four borders are dotted

[border-style preview](http://www.w3schools.com/cssref/playit.asp?filename=playcss_border-style&preval=none)

## border-radius

边框四角的曲率半径

IE9

``` css
border-radius: length|%;
```

``` css
border-radius: 1px 2px 3px 4px;
/* 等价 */
border-top-left-radius: 1px
border-top-right-radius: 2px
border-bottom-right-radius: 3px
border-bottom-left-radius: 4px
```

``` css
border-radius: 1px 2px 3px;
/* 等价 */
border-top-left-radius: 1px
border-top-right-radius: 2px
border-bottom-right-radius: 3px
border-bottom-left-radius: 2px
```

``` css
border-radius: 1px 2px;
/* 等价 */
border-top-left-radius: 1px
border-top-right-radius: 2px
border-bottom-right-radius: 1px
border-bottom-left-radius: 2px
```

## border-image

border-image:

```
<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>
```

border-image-slice：

```
<number-percentage>{1,4} && fill?
where
<number-percentage> = <number> | <percentage>
```

`fill` make the middle of the image display
