---
title: Animations
---

## @keyframes

```css
@keyframes identifier {
  0% { top: 0; left: 0; }
  30% { top: 50px; }
  68%, 72% { left: 50px; }
  100% { top: 100px; left: 100%; }
}
```

identifier：与相关元素的 `animation-name` 的值相同。

百分数代表动画时间上进度，0% 表示动画序列的初始状态，100% 则表示结束时的状态；因为这两个状态很重要，所以可以分别用 `from` 和 `to` 表示。以百分数作为属性名的规则，描述相应状态元素的样式。

## animation

animation: shorthand property

Formal syntax

```
<single-animation>#
where
<single-animation> = <time> || <single-timing-function> || <time>
    || <single-animation-iteration-count> || <single-animation-direction>
    || <single-animation-fill-mode> || <single-animation-play-state> || <single-animation-name>
```

### animation-delay

设定从元素被加载完毕到动画序列的开始的延迟。

值：[\<time\> - CSS \| MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/time)

### animation-direction

设定每趟动画的变化方向。

- normal：每个动画周期中动画序列都从开始状态 (from) 到结束状态 (to)。
- reverse：每个动画周期中动画序列都从结束状态 (to) 到开始状态 (from)。
- alternate：from->to，to->from, from->to, ...
- alternate-reverse：to->from, from->to，to->from ...

`animation-iteration-count` 的值大于 1 时，alternate 才和 normal 有区别。

### animation-duration

设定一次动画完成用的时间。

值：[\<time\> - CSS \| MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/time)

### animation-iteration-count

设定动画迭代的次数，设为 `infinite` 可以重复无数次。

值：数字 \| `infinite`

### animation-name

指定相应的 @keyframes 的名字。

### animation-play-state

用于暂停和回复动画序列。

值：

- running：默认
- paused

### animation-timing-function

设定时间函数，决定元素的运动轨迹。

值：

```
ease | linear | ease-in | ease-out |
ease-in-out | step-start | step-end |
steps(<integer>[, [ start | end ] ]?) |
cubic-bezier(<number>, <number>, <number>, <number>)
```

[\<timing-function\> - CSS \| MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function)

### animation-fill-mode

指定动画开始前和结束后元素的样式。

值：

- none：（默认）动画的产生的样式不会在开始前和结束后应用于元素。
- forwards：动画结束后，元素保留最后的样式。（与 `animation-direction`、`animation-iteration-count` 有关）
- backwards：动画开始前的延迟时段内，元素的使用动画开始时的样式。（与 `animation-direction` 有关）
- both：forwards & backwards

## 参考

- [Using CSS animations - CSS \| MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
- [@keyframes - CSS \| MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
