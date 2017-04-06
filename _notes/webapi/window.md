---
title: Window 对象
---

## history

```javascript
/* userAgentMozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2816.0 Safari/537.36 */
history.length
history.state
history.go()
history.back()
history.forward()
history.pushState()
history.replaceState()
history.scrollRestoration
```

## screen

https://developer.mozilla.org/en-US/docs/Web/API/Screen

```javascript
/* userAgentMozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2816.0 Safari/537.36 */
screen.availWidth
screen.availHeight
screen.width
screen.height
screen.colorDepth //Returns the color depth of the screen
screen.pixelDepth //Gets the bit depth of the screen.
screen.availLeft
screen.availTop
screen.orientation //Returns the current orientation of the screen. 屏幕方向
```

## location

* [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)
* [window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)

```javascript
document.location == window.location // true
location.assign("http://www.mozilla.org"); //or
location = "http://www.mozilla.org"; //or
location.href = "http://www.mozilla.org";
location.reload(true); //force reload
```

```javascript
/* userAgentMozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2816.0 Safari/537.36 */
location.replace() // 修改地址但不存历史记录
location.assign()
location.hash // "#contents"
location.search // "?id=123&q=javascript"
location.pathname // "/ye/"
location.port
location.hostname
location.host // "www.baidu.com:80"
location.protocol // "http:"
location.origin
location.href
location.ancestorOrigins
location.reload()
```

## navigator

```javascript
//navigator.vendorSub
//navigator.productSub
//navigator.vendor
navigator.maxTouchPoints //Return the maximum number of simultaneous touch contact points are supported by the current device.
navigator.hardwareConcurrency //returns the number of logical processors available to run threads on the user's computer.
navigator.appCodeName
navigator.appName
navigator.appVersion
navigator.platform
navigator.product
navigator.userAgent //UA
navigator.language
navigator.languages
navigator.onLine
navigator.cookieEnabled
navigator.doNotTrack
navigator.geolocation
navigator.plugins // non-IE plugin array
navigator.mimeTypes
navigator.webkitTemporaryStorage
navigator.webkitPersistentStorage
navigator.serviceWorker
navigator.getBattery()
navigator.sendBeacon()
navigator.requestMediaKeySystemAccess()
navigator.getGamepads()
navigator.webkitGetUserMedia()
navigator.javaEnabled()
navigator.vibrate()
navigator.requestMIDIAccess()
navigator.credentials
navigator.mediaDevices
navigator.permissions
navigator.presentation
navigator.getUserMedia()
navigator.registerProtocolHandler() //Allows web sites to register themselves as possible handlers for particular protocols.
navigator.unregisterProtocolHandler()
/ * non-chrome */
navigator.registerContentHandler() //https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerContentHandler
```

## 框架窗口

`window.frames` 返回一个类似数组的对象，成员为页面内所有框架窗口，包括 `frame` 元素和 `iframe` 元素。

```javascript
window === frames // true
window.length // 返回当前网页包含的框架总数
```

* `top` -> 最外层的框架
* `parent` -> 当前框架的上层对象，没框架时 -> `top`
* `self` -> 窗口自身

```html
<frameset rows="100,*">
    <frame src="frame.htm" name="topFrame">
    <frameset cols="50%,50%">
        <frame src="anotherframe.htm" name="leftFrame">
        <frame src="anotherframeset.htm" name="rightFrame">
    </frameset>
</frameset>
```

`anotherframeset.htm`

```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
"http://www.w3.org/TR/html4/frameset.dtd">
<html>
<head>
    <title>Frameset Example</title>
</head>
<frameset cols="50%,50%">
    <frame src="red.htm" name="redFrame">
    <frame src="blue.htm" name="blueFrame">
</frameset>
</html>
```

```javascript
top.frames[0] === top.frames["topFrame"] === frames["topFrame"]
top.frames[1] === top.frames["leftFrame"] === frames["leftFrame"]
top.frames[2].frames[0] === top.frames[2].frames["redFrame"]
```

## 窗口大小

```javascript
window.innerWidth
window.innerHeight
window.outerWidth
window.outerHeight
window.resizeTo()
window.resizeBy()
```

```javascript
// dom

// 可见 // 布局（内容实际）
document.documentElement.clientWidth
document.documentElement.clientHeight
document.body.clientWidth
document.body.clientHeight
```


## 窗口位置

```javascript
window.moveTo()
window.moveBy()
window.screenTop    // 窗口相对屏幕顶部的垂直偏移量
window.screenLeft   // 窗口相对屏幕左边的水平偏移量
window.screenY      // 窗口相对屏幕顶部的垂直偏移量
window.screenX      // 窗口相对屏幕左边的水平偏移量
```

兼容性：

* screenTop/screenLeft Firefox 不支持
* screenY/screenX  IE9+ 支持

## 视口位置

```javascript
window.pageYOffset  // 视口相对于整个页面垂直偏移量
window.scrollY      // 视口相对于整个页面垂直偏移量
window.pageXOffset  // 视口相对于整个页面水平偏移量
window.scrollX      // 视口相对于整个页面水平偏移量
```

由 MDN 提供的跨浏览器的解决方案如下

```javascript
var x = (window.pageXOffset !== undefined)
  ? window.pageXOffset
  : (document.documentElement || document.body.parentNode || document.body).scrollLeft;

var y = (window.pageYOffset !== undefined)
  ? window.pageYOffset
  : (document.documentElement || document.body.parentNode || document.body).scrollTop;
```

## 页内滚动

### window.scroll() 和 window.scrollTo()

```javascript
window.scroll(x, y);
window.scrollTo(x, y)
```

滚动窗口至文档中的特定位置。

### window.scrollBy()

```javascript
window.scrollBy(xOffset, yOffset);
```

以当前位置为参照点，根据偏移量滚动一定距离。

## window.open(), window.close()

https://developer.mozilla.org/en-US/docs/Web/API/Window/open

功能：打开一个窗口，返回窗口的引用

```javascript
var windowObjectReference = window.open(strUrl, strWindowName, [strWindowFeatures]);
//strWindowFeatures: example "resizable=yes,scrollbars=yes,status=yes"
windowObjectReference.opener //-> (原)window

windowObjectReference.close(); // 关闭 window.open() 打开的窗口
```

## 超时调用和周期调用

### setTimeout()

超时调用

```javascript
var timeoutID = window.setTimeout(func, [delay, param1, param2, ...]);
var timeoutID = window.setTimeout(code, [delay]);
```

code: 代码字符串
delay: 函数被调用 / 代码被执行等待的毫秒数

取消任务

```javascript
clearTimeout(timeoutID);
```

### setInterval()

```javascript
var intervalID = window.setInterval(func, delay[, param1, param2, ...]);
var intervalID = window.setInterval(code, delay);
/* 取消调用 */
clearInterval(intervalID);
```

## 系统对话框

```javascript
window.alert()
window.confirm()
window.prompt()
window.print() // 打印
window.find() // 查找
```

### window.confirm()

```javascript
result = window.confirm(str)
```

* result： true: OK, false: Cancel/ ×

### window.prompt()

```javascript
result = window.prompt(message, default);
```

* default: 输入框默认值
* result: 提交的字符串；若 cancel/ × 则为 null


## Base64

```javascript
window.btoa() // 用 Base64 转码
window.atob() // 解 Base64
```

## Others

```javascript
window.speechSynthesis
window.caches
window.localStorage
window.sessionStorage
window.webkitStorageInfo
window.indexedDB
window.webkitIndexedDB
window.crypto // crypto 对象
window.performance // performance 对象
window.console
window.styleMedia
window.defaultstatus
window.defaultStatus
window.customElements
window.clientInformation
window.devicePixelRatio
window.external
window.applicationCache
window.frameElement
window.opener // 返回打开当前窗口的父窗口
window.closed // 属性返回一个布尔值，表示窗口是否关闭
window.TEMPORARY
window.PERSISTENT
window.status    // 返回或设置浏览器底部状态栏的文字
window.toolbar   // 返回工具栏对象
window.statusbar // 返回状态栏对象
window.scrollbars
window.personalbar
window.menubar
window.locationbar
window.isSecureContext
```
