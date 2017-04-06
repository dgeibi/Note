---
title: 事件类型
---

[事件类型一览表 \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events)

## UI Events

[UI Events](https://www.w3.org/TR/uievents/)

* load：页面完全加载在 window 上触发，当图像（image）、样式表（style sheet）、脚本（script）等加载完毕时触发
* unload：文档被完全卸载后在 window 上触发
* abort：停止下载，嵌入的内容未加载完毕，在 <object> 上触发
* resize：窗口大小变化时在 window 上触发
* scroll：文档滚动期间在 window 上重复触发
* error：发生错误时触发
* select：用户选择（文本框中的？）字符时触发
* selectstart：刚选择时触发

## Focus Events

* focus：不会冒泡的，元素获得焦点时触发
* blur：不会冒泡的，元素失去焦点时触发
* focusin：元素获得焦点时触发
* focusout：元素失去焦点时触发


## 	Mouse Events

* click：单击主鼠标按钮，或者回车
* dblclick：双击主鼠标按钮
* mousedown：按下任意鼠标按钮
* mouseenter：鼠标光标进入元素范围（不冒泡）
* mouseleave：鼠标光标离开元素范围（不冒泡）
* mousemove：鼠标光标在元素内移动时重复触发
* mouseout：鼠标光标离开元素本身，移动到子元素 / 其它元素
* mouseover：鼠标光标进入元素本身（从子元素 / 其它元素）
* mouseup：释放鼠标按钮

**位置**

* MouseEvent.clientX, MouseEvent.clientY：   事件发生时，鼠标在视口中的位置。
* MouseEvent.pageX, MouseEvent.pageY：       事件发生时，鼠标在页面中的位置。
* MouseEvent.screenX, MouseEvent.screenY：   事件发生时，鼠标在屏幕中的位置。
* MouseEvent.offsetX, MouseEvent.offsetY：   事件发生时，鼠标在目标（target）的内边界内的位置。

**按键**

* MouseEvent.shiftKey：鼠标事件触发的同时，shift 键被按，返回 ture。
* MouseEvent.ctrlKey：鼠标事件触发的同时，ctrl 键被按，返回 ture。
* MouseEvent.altKey：鼠标事件触发的同时，alt 键被按，返回 ture。
* MouseEvent.metaKey：鼠标事件触发的同时，meta 键被按，返回 ture。
* MouseEvent.button：返回触发事件的鼠标按键。
    * 0：左键
    * 1：滚轮 / 中键
    * 2：右键
    * 3：浏览器的返回键 <-
    * 4：浏览器的前进键 ->

## Wheel Event

Event <- UIEvent <- MouseEvent <- WheelEvent

wheel：鼠标滚轮发生移动时触发 (取代 mousewheel)

* WheelEvent.deltaX：水平移动量
* WheelEvent.deltaY：垂直移动量
* WheelEvent.deltaZ：z 轴移动量
* WheelEvent.deltaMode：移动量的单位

[wheel - Event reference \| MDN](https://developer.mozilla.org/en-US/docs/Web/Events/wheel)

## Keyboard Events

* keydown：用户按下任意键时触发，不放会重复触发。
* keypress：用户按下字符键时触发，不放会重复触发。ESC 会触发此事件。
* keyup：用户释放按键时触发。

### KeyboardEvent

* KeyboardEvent.key：用户按下的键，如果是字符键，则返回字符，否则返回 code
* KeyboardEvent.code：用户按下的键的代码
* KeyboardEvent.altKey：键盘事件发生时，Alt/Option/⌥键也被按下时，返回 true
* KeyboardEvent.ctrlKey：键盘事件发生时，Ctrl/⌘键也被按下时，返回 true
* KeyboardEvent.metaKey：键盘事件发生时，Win/Mac 键也被按下时，返回 true
* KeyboardEvent.shiftKey：键盘事件发生时，Shift 键也被按下时，返回 true
* KeyboardEvent.getModifierState(keyArg)：返回指定修改键被按下的状态，[KeyboardEvent.getModifierState() - Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState)

## Composition Events

[Composition Event - w3c](https://www.w3.org/TR/uievents/#events-compositionevents)

* compositionstart：IME 的文本复合系统打开时触发，表示要开始输入了。
* compositionupdate：在向输入字段中插入新字符时触发。
* compositionend：IME 的文本复合系统打开时关闭是触发。

## Clipboard Events

- [ClipboardEvent - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent)
- [Clipboard API and events - w3c](https://www.w3.org/TR/clipboard-apis/#clipboard-event-interfaces)

* copy：在发生复制操作时触发
* cut：在发生剪切操作时触发
* paste：在发生粘贴操作时触发
* beforecopy：在发生复制操作前触发
* beforecut：在发生复制操作前触发
* beforepaste：在发生复制操作前触发

无法用 beforepaste、beforecut、beforecopy 阻止 paste、cut、copy 的发生。

### ClipboardEvent.clipboardData

*  ClipboardEvent.clipboardData.setData(format, data)  一般在 cut/copy 监听器中使用，设置剪贴板的数据。
*  ClipboardEvent.clipboardData.getData(format) 一般在 paste 中使用，获取剪贴板的数据。

format："text/plain"("text"), "text/uri-list"("url")

## Media Events

[Media Element - HTML](/html/media.html#mediaevents)

## Event handlers for objects of the text track APIs

* change
* addtrack
* removetrack
* cuechange
* enter
* exit

## Some HTML5 Event

[HTML Standard](https://html.spec.whatwg.org/multipage/indices.html#events-2)

* abort
* DOMContentLoaded：DOM 树形成后触发，外部资源可能还没加载完全。
* afterprint
* beforeprint
* cancel
* connect
* contextmenu：调出上下文菜单时触发。继承了 MouseEvent。
* error
* hashchange：锚点变化时触发
* invalid
* languagechange
* offline
* online
* close
* message
* open
* pagehide：页面在卸载时触发，在 unload 之前触发。
* pageshow：页面状态恢复使触发。
* popstate
* show
* storage
* toggle
* rejectionhandled
* unhandledrejection

beforeunload：window 上触发，文档即将卸载时触发。弹出对话框询问用户是否想离开。

```javascript
window.addEventListener("beforeunload", function (e) {
  var confirmationMessage = "\o/";

  e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
  return confirmationMessage;              // Gecko, WebKit, Chrome <34
});
```

## Form Events

* reset：表单重置时触发
* submit：表单提交时触发
* change：当 `<input>`、`<select>`、`<textarea>` 值发生变化时触发（非连续），`<input>` 和 `<textarea>` 失去焦点时触发。
* input：当 `<input>`、`<textarea>` 的值发生变化时连续触发
* select：在 `<input>`、`<textarea>` 中选中文本时触发

## Device Events

- [DeviceOrientation Event Specification](https://www.w3.org/TR/orientation-event/)
- [Detecting device orientation - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation)

* orientationchange
* MozOrientation
* deviceorientation
* devicemotion
* deviceorientationabsolute


## 	Touch Events

* touchstart：多一只手指触摸屏幕时触发
* touchmove：手指在屏幕上滑动时连续触发
* touchend：手指移开时触发
* touchcancel：系统停止跟踪触摸时触发

### TouchEvent

* TouchEvent.changedTouches：表示自上次触摸以来发生什么改变的 Touch 对象的数组。
* TouchEvent.touches：表示当前跟踪的触摸操作的 Touch 对象的数组
* TouchEvent.targetTouches：特定于事件目标的 Touch 对象的数组
* TouchEvent.altKey
* TouchEvent.ctrlKey
* TouchEvent.metaKey
* TouchEvent.shiftKey

Touch 对象的属性

* clientX：触摸目标在视口中的 x 坐标
* clientY：触摸目标在视口中的 y 坐标
* pageX：触摸页面在视口中的 x 坐标
* pageY：触摸页面在视口中的 y 坐标
* screenX：触摸目标在屏幕中的 x 坐标
* screenY：触摸目标在屏幕中的 y 坐标
* identifier：触摸目标的标识符
* target：触摸的 DOM 节点目标

## Drag and Drop Events

- [HTML Standard](https://html.spec.whatwg.org/multipage/interaction.html#dndevents)
- [JavaScript 标准参考教程（alpha）](http://javascript.ruanyifeng.com/dom/event.html#toc32)

* drag：拖拉过程中，在被拖拉的节点上持续触发。
* dragstart：拖拉开始时在被拖拉的节点上触发，该事件的 target 属性是被拖拉的节点。通常应该在这个事件的监听函数中，指定拖拉的数据。
* dragend：拖拉结束时（释放鼠标键或按下 escape 键）在被拖拉的节点上触发，该事件的 target 属性是被拖拉的节点。它与 dragStart 事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，dragend 事件总是会触发的。
* dragenter：拖拉进入当前节点时，在当前节点上触发，该事件的 target 属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。
* dragover：拖拉到当前节点上方时，在当前节点上持续触发，该事件的 target 属性是当前节点。该事件与 dragenter 事件基本类似，默认会重置当前的拖拉事件的效果（DataTransfer 对象的 dropEffect 属性）为 none，即不允许放下被拖拉的节点，所以如果允许在当前节点 drop 数据，通常会使用 preventDefault 方法，取消重置拖拉效果为 none。
* dragleave：拖拉离开当前节点范围时，在当前节点上触发，该事件的 target 属性是当前节点。在视觉上显示拖拉离开当前节点，就在这个事件的监听函数中设置。
* drop：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许 drop，即使在该节点上方松开鼠标键，也不会触发该事件。如果用户按下 Escape 键，取消这个操作，也不会触发该事件。该事件的监听函数负责取出拖拉数据，并进行相关处理。

## CSS Animation Events

[w3c](https://www.w3.org/TR/css3-animations/#animationevent)

* animationend
* animationiteration
* animationstart
* webkitanimationend
* webkitanimationiteration
* webkitanimationstart


## Pointer Events

[w3c](https://www.w3.org/TR/pointerevents/#list-of-pointer-events)

* pointerover
* pointerenter
* pointerdown
* pointermove
* pointerup
* pointercancel
* pointerout
* pointerleave
* gotpointercapture
* lostpointercapture

## App Cache Events

[whatwg](https://html.spec.whatwg.org/multipage/browsers.html#appcacheevents)

* checking
* noupdate
* downloading
* progress
* cached
* updateready
* obsolete
* error

## Others

[transitionend - Event reference \| MDN](https://developer.mozilla.org/en-US/docs/Web/Events/transitionend)

* search
* transitionend
* webkittransitionend
* webkitfullscreenchange
* webkitfullscreenerror
