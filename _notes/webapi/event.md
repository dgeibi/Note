---
title: Event
---

## HTML 事件处理程序

```html
<input type="button" value="Click Me" onclick="alert('clicked')">
```

属性 `onclick` 的值可以想象在

```javascript
function() {
    with(document) {
        with(this) {
            // 这里执行
        }
    }
}
```

`this` -> `<input>`；所以可以直接访问 `value`，不用这样 `this.value`;

```javascript
// element.onclick
function(event) {
  alert('clicked')
}
```

## DOM Level 0 事件处理程序

```javascript
var btn = document.getElementById("myBtn");
btn.onclick = function() {
    alert(this.id); // myBtn
} // 添加

btn.onclick = null; // 移除
```

## DOM Level 2 事件处理程序

```javascript
eventTarget.addEventListener(type, listener, [useCapture]); // 添加
eventTarget.removeEventListener(type, listener[, useCapture]); // 移除，listener 不能是匿名函数
```

- type: 'click' 'load' ...
- listener: handler; function;
- useCapture: true, 捕获阶段调用程序；false, 默认冒泡阶段调用。

In listener, this -> eventTarget

- Good：可添加多个事件处理器
- Bad： IE >= 9

## IE <= 8 的事件处理程序

```javascript
eventTarget.attachEvent(eventNameWithOn, callback)// 添加
eventTarget.detachEvent(eventNameWithOn, callback) // 移除，callback 不能是匿名函数
```

- eventNameWithOn: 'onclick' 'onload' ...

In callback, this -> window

## DOM Event 对象

- 在 HTML 特性事件处理程序中 `event`
- DOM 0/DOM 2 方法中指定的函数的第一个参数

以下属性和方法均只读

- bubbles：Boolean，冒泡与否
- cancelable：Boolean，能否取消事件默认行为
- defaultPrevented：Boolean，是否已经取消事件默认行为
- eventPhase：Interger
- detail：Interger
- currentTarget：Element，设置时间处理程序时的目标
- target：Element，具体的触发事件的目标
- type：String，被触发事件的类型
- preventDefault()： 取消事件默认行为
- stopImmediatePropagation()： DOM3 取消事件进一步冒泡 / 捕获，阻止任何事件处理程序被调用
- stopPropagation()：取消事件进一步冒泡 / 捕获

## IE Event 对象

- DOM 0: window.event
- 使用 attachEvent()：callback 的第一个参数
- 在 HTML 特性事件处理程序中 `event`

属性：

- cancelBubble：Boolean，r/w，false: 默认，true: 取消事件冒泡
- returnValue： Boolean，r/w，true: 默认，false: 取消事件默认行为
- srcElement：Element，readonly，in DOM called `target'
- type：String，被触发事件的类型

## 事件模拟

- [MouseEvent() - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
- [KeyboardEvent() - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)

以 MouseEvent 为例

```javascript
var event = new MouseEvent(typeArg, mouseEventInit);
var target = document.getElementById('checkbox');
target.dispatchEvent(event); /* 在目标上触发事件 */
```

- typeArg：事件类型，如'click' 'mousedown'
- mouseEventInit（Optional）：json，用于 event 对象属性的设定。

## 自定义事件

- [CustomEvent() - Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent)
- [Event() - Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)

利用 CustomEvent 的实例比 Event 的直接实例多 `detail` 属性

```javascript
// add an appropriate event listener
obj.addEventListener("cat", function(e) { process(e.detail) });

// create and dispatch the event
var event = new CustomEvent("cat", {
  detail: {
    hazcheeseburger: true
  }
});
obj.dispatchEvent(event);
```
