---
title: Canvas 2D Context
---

## Canvas

```html
<canvas id="drawing" width="600" height="600">A drawing of something.</canvas>
```

如果不支持 canvas 就只会显示 "A drawing of something."。

## 绘制

```javascript
var drawing = document.getElementById("drawing");
if (drawing.getContext) { /* 检测 getContext() 是否存在 */
    var context = drawing.getContext("2d");

    /* 设置填充和描边的样式 */
    /* 支持 CSS Color 任何格式 */
    context.fillStyle = "#ff0000";
    context.strokeStyle = "yellow";

    /* 绘制 */

    /* 矩形 */
    context.fillRect(10,10,40,40); /* 绘制长为 40px 宽为 40px 的红色矩形 */
    context.fillStyle = "rgba(0,0,255,0.5)";
    context.fillRect(30,30,40,40); /* 绘制半透明的蓝色矩形 */
    context.strokeRect(70,70,40,40); /* 绘制黄色的描边矩形 */
    context.clearRect(30,30,20,20); /* 绘制透明矩形 */

    /* 路径 */

    /* 开始路径 */
    context.strokeStyle = "#000000";
    context.beginPath();
    context.arc(70,140,60,0, 2*Math.PI, false);
    /* 圆心坐标为（70,140）半径为 60, 绘制起始位置为 0 弧度，2PI 绘制结束，false 表示逆时针 */
    context.rect(140,140,40,40);

    /* 移动绘图游标 */
    context.moveTo(20,120);
    context.lineTo(120,120); /* 绘制直线 */

    /* 二次曲线 */
    context.moveTo(120, 20);
    context.quadraticCurveTo(270, 50, 260, 190);
    context.fillRect(120,20,10,10)/* 起点 */
    context.fillStyle = "red";
    context.fillRect(270,50,10,10); /* 控制点 */
    context.fillStyle = "yellow";
    context.fillRect(260,190,10,10); /* 终止点 */

    /* 描路径 */
    context.stroke();

    /* 文字 */
    context.font = "10px Arial";  /* CSS Font */
    context.textAlign = "center"; /* other values: "start" "end" */
    context.textBaseline = "middle"; /* 基线 */
    context.fillText("text", 100, 20);
}
```

## Transform

- rotate(angle)：绕原点旋转。
- scale(sx,sy)：缩放。
- translate(tx, ty)：移动原点的位置。

所有变化只对后来的绘制有效。

## Gradient

```javascript
var gradient = context.createLinearGradient(30,30,70,70); // (x1,y1,x2,y2)
gradient.addColorStop(0, "white");// 开始
gradient.addColorStop(1, "black");// 结束

context.fillStyle = gradient; // 作为填充样式
```

## Pattern

```javascript
var image = document.images[0]; // 可以为 video, canvas
var pattern = context.createPattern(image, "repeat"); // 第二个参数："repeat", "repeat-x", "repeat-y", "no-repeat"。
context.fillStyle = pattern;
```

## State

用 save() 将设置放入栈结构中，restore() 出栈，还原设置。

## 图像导出

```javascript
/* 取得图像数据的 URI */
var imgURI = drawing.toDataURL("image/png");
/* 显示图像 */
var image = document.createElement("img");
image.src = imgURI;
document.body.appendChild(image);
```
