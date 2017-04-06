---
title: Transform
---

## transform-origin 属性

```css
transform-origin: x-axis y-axis z-axis /* 默认：50% 50% 0 */
```

- x-axis：left，center，right，length，%
- y-axis：top，center，bottom，length，%
- z-axis：length

## 平移

### translate()
```css
transform: translate(x, y);
```

x：右正，左负。
y：下正，上负。

`translate(x)` 与 `translate(x, 0)` 等价。

### translate3d()

```css
transform: translate3d(tx,ty,tz)
```

- tx：代表横向坐标位移向量的长度；
- ty：代表纵向坐标位移向量的长度；
- tz：代表 Z 轴位移向量的长度。此值不能是一个百分比值，如果取值为百分比值，将会认为无效值。

当 z 轴值越大时，元素也离观看者更近，从视觉上元素就变得更大；反之其值越小时，元素也离观看者更远，从视觉上元素就变得更小。

单独设置：

- translateX(x)
- translateY(y)
- translateZ(z)

## 缩放

缩放时，默认以元素的中心为基点，可通过 `transform-origin` 改变基点。

### scale()

```css
/* 长宽都放大到原来的 2 倍 */
transform: scale(2);
/* 宽度是原来的 0.5，高度是原来的 0.7 */
transform: scale(0.5,0.7);
/* 先旋转 180 度再放大到原来的 1.5 倍 */
transform: scale(-1.5);
```

### scale3d()

```css
transform: scale3d(sx,sy,sz)
```

* scaleX(sx)：等价于 scale(sx, 1)
* scaleY(sy)：等价于 scale(1, sy)
* scaleZ(sz)：指定元素每个点在 Z 轴的比例。

scaleZ() 和 scale3d() 函数单独使用时没有任何效果，需要配合其他的变形函数一起使用才会有效果。

## 旋转

### rotate()

```css
/* 绕原点顺时针旋转 45 度 */
transform: rotate(45deg);
/* 绕原点逆时针旋转 45 度 */
transform: rotate(-45deg);
```

### rotate3d()

```css
transform: rotate3d(x,y,z,a)
```

以向量 (x,y,z) 为轴，旋转 a

x,y,z 均为 0 到 1 的值。

- rotateX(a)：以 x 轴为轴，顺时针旋转 a
- rotateY(a)：以 y 轴为轴，顺时针旋转 a
- rotateZ(a)：以 z 轴为轴，顺时针旋转 a，实际上和 rotate(a) 等效。

## 偏离

skew: (verb) to move or lie at an angle, especially in a position that is not normal.

```css
/* 使元素在 x 轴上偏离 10 度，y 轴上偏离 15 度。*/
transform: skew(10deg,15deg);
/* 使元素在 x 轴上偏离 10 度 */
transform: skew(10deg);
transform: skewX(10deg);
/* 使元素在 y 轴上偏离 10 度 */
transform: skewY(10deg);
```

## 矩阵

### matrix()

matrix(n,n,n,n,n,n)

6 个参数

### matrix3d(）

matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)

16 个参数

利用矩阵运算，映射出一个变化。具体可以参考下面的参考资料。

## 参考

- [CSS3 2D Transform_Transform 教程_w3cplus](http://www.w3cplus.com/css3/css3-2d-transform.html)
- [CSS3 3D Transform_Transform 教程_w3cplus](http://www.w3cplus.com/css3/css3-3d-transform.html)
