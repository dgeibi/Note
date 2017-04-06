---
title: Background
---

## background

Example:

```css
/* Using a <background-color> */
background: green;

/* Using a <bg-image> and <repeat-style> */
background: url(test.jpg) repeat-y;

/* Using a <box> and <background-color> */
background: border-box red;

/* <repeat-style>， <position>， <bg-image> */
background: no-repeat center/80% url(../img/image.png);
```

Syntax:

```
[<bg-layer> , ]* <final-bg-layer> // 多层次背景
where
<bg-layer> = <bg-image> || <position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box>{1,2}
<final-bg-layer> = <bg-image> || <position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box> || <'background-color'>
```

## background-size

``` css
background-size: auto; /* 初始值 */
background-size: cover; /* 缩放背景图片以完全覆盖背景区，可能背景图片部分看不见。*/
background-size: contain; /* 缩放背景图片以完全装入背景区，可能背景区部分空白。*/
background-size: 50% auto; /* 第一个值指定图片的宽度，第二个值指定图片的高度 */
background-size: 50%; /* 指定图片的宽度 */
```

## background-attachment

决定背景是在视口中固定的还是随包含它的区块滚动

|Value|Description|
|-----|-----------|
|scroll|The background scrolls along with the element. This is default|
|fixed|The background is fixed with regard to the viewport|
|local|The background scrolls along with the element's contents|
|initial|Sets this property to its default value. Read about initial|
|inherit|Inherits this property from its parent element. Read about inherit|

## background-clip

| 值 | 说明 |
|--|----|
|border-box | 背景延伸到边框外沿 |
|padding-box | 背景延伸到内边距外沿 |
|content-box | 背景裁剪到内容区外沿 |

## background-image

```css
background-image: none;
background-image: url(http://www.example.com/bck.png);
```

## background-color

```css
/* Keyword values */
background-color: red;

/* Hexadecimal value */
background-color: #bbff00;

/* RGB value */
background-color: rgb(255, 255, 128);

/* HSLA value */
background-color: hsla(50, 33%, 25%, 0.75);

/* Special keyword values */
background-color: currentColor;
background-color: transparent;  /* initial */

/* Global values */
background-color: inherit;
background-color: initial;
background-color: unset;
```

## background-repeat

| Value     | Description                                                                             |
|-----------|-----------------------------------------------------------------------------------------|
| repeat    | The background image will be repeated both vertically and horizontally. This is default |
| repeat-x  | The background image will be repeated only horizontally                                 |
| repeat-y  | The background image will be repeated only vertically                                   |
| no-repeat | The background-image will not be repeated                                               |

实验性：round, space

## background-position

|Value|Description|
|-----|-----------|
|left top|If you only specify one keyword, the other value will be "center"|
|left center|If you only specify one keyword, the other value will be "center"|
|left bottom|If you only specify one keyword, the other value will be "center"|
|right top|If you only specify one keyword, the other value will be "center"|
|right center|If you only specify one keyword, the other value will be "center"|
|right bottom|If you only specify one keyword, the other value will be "center"|
|center top|If you only specify one keyword, the other value will be "center"|
|center center|If you only specify one keyword, the other value will be "center"|
|center bottom	|If you only specify one keyword, the other value will be "center"|
|x% y%|The first value is the horizontal position and the second value is the vertical. The top left corner is 0% 0%. The right bottom corner is 100% 100%. If you only specify one value, the other value will be 50%. . Default value is: 0% 0%|
|xpos ypos|The first value is the horizontal position and the second value is the vertical. The top left corner is 0 0. Units can be pixels (0px 0px) or any other CSS units. If you only specify one value, the other value will be 50%. You can mix % and positions|

##  background-origin

The background-origin CSS property determines the background positioning area, that is the position of the origin of an image specified using the background-image CSS property.

Value:

- border-box: The background extends to the outside edge of the border (but underneath the border in z-ordering).
- padding-box: (default) No background is drawn below the border (background extends to the outside edge of the padding).
- content-box: The background is painted within (clipped to) the content box.

## 参考

* [background-attachment](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment)
* [background-clip](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)
* [background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)
* [background-repeat](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)
* [background-position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)
* [background-size](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size)
* [background-origin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)
