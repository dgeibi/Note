---
title: Shadow
---

## text-shadow

[text-shadow - CSS \| MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow/)

```css
/* offset-x | offset-y | blur-radius | color */
text-shadow: 1px 1px 2px black;

/* color | offset-x | offset-y | blur-radius */
text-shadow: #CCC 1px 0 10px;

/* offset-x | offset-y | color */
text-shadow: 5px 5px #558ABB;

/* color | offset-x | offset-y */
text-shadow: white 2px 5px;

/* offset-x | offset-y
/* Use defaults for color and blur-radius */
text-shadow: 5px 10px;

/* Global values */
text-shadow: inherit;
text-shadow: initial;
text-shadow: unset;
```

* offset-x: 水平方向上的偏移量，正值时向右偏移
* offset-y: 垂直方向上的偏移量，正值时向下偏移
* blur-radius: 模糊的深度

## box-shadow

[box-shadow - CSS \| MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow/)

[CSS box-shadow "inset" and blur (tests, examples)](http://elektronotdienst-nuernberg.de/bugs/box-shadow_inset.html)

```css
/* offset-x | offset-y | color */
box-shadow: 60px -16px teal;

/* offset-x | offset-y | blur-radius | color */
box-shadow: 10px 5px 5px black;

/* offset-x | offset-y | blur-radius | spread-radius | color */
box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

/* inset | offset-x | offset-y | color */
box-shadow: inset 5em 1em gold;

/* Any number of shadows, separated by commas */
box-shadow: 3px 3px red, -1em 0 0.4em olive;
```

* inset: 使阴影在盒子内部
* spread-radius: 设置阴影的大小，可以是负数。
