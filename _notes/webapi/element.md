---
title: Element
---

## Create Element

```javascript
/* userAgent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2816.0 Safari/537.36 */
var element = document.createElement(tagName);
```

## Data

```javascript
element.nodeType  // 1
element.nodeName  // -> tagName
element.nodeValue // null
element.namespaceURI
element.lang // attr lang="zh-cmn-Hans"
element.dir // 输出方向 "ltr": left to right；"rtl": Right to left
element.tagName
element.id // id attribute
element.className // class attribute
element.align
element.title
element.translate
element.prefix
element.localName
```

## element.dataset

ie11+

```html
<div id="myDiv" data-myname="test"></div>
```

```javascript
var div = document.getElementById("myDiv");
var myName = div.dataset.myname;
div.dataset.myname = "ha";
```

## element.classList

```javascript
element.classList // 集合类型 DOMTokenList 的实例
element.classList.add(String[, String]) // Add specified class values. If these classes already exist in attribute of the element, then they are ignored.
element.classList.remove(String[, String]) // delete specified class
element.classList.toggle(String) // 开关
element.classList.contains(String) // Checks if specified class value exists in class attribute of the element.
```

## 内容


### element.inner* & element.outer*

element.innerText

- read: all textNode in element
- write: overwrite all elements in element, format `<` `>` `"` `+`

element.outerText

- read: all textNode in element
- write: overwrite all elements in element including element's tag, format `<` `>` `"` `+`

element.innerHTML

- r: HTML String;

element.outerHTML

- r: HTML String: <element>...</element>

### element.insertAdjacent*()

```javascript
element.insertAdjacentElement(position, anotherElement);
element.insertAdjacentText(position, text);
element.insertAdjacentHTML(position, HTMLtext);
```

position:

- 'beforebegin': Before the element itself.
- 'afterbegin': Just inside the element, before its first child.
- 'beforeend': Just inside the element, after its last child.
- 'afterend': After the element itself.

### from Node.prototype

[Node](/webapi/node.html#节点的增删)

```javascript
element.insertBefore()
element.appendChild()
element.replaceChild()
element.removeChild()
```

## Attribute and AttributeNode

```javascript
element.attributes      // 特性集合
element.hasAttributes()
element.getAttribute()   // element.getAttribute(attributeStr) return the value of attribute
element.getAttributeNS() // element.getAttributeNS(namespaceURI, localName)
element.setAttribute()   // element.setAttribute(attributeStr, newValue)
element.setAttributeNS()
element.removeAttribute()
element.removeAttributeNS()
element.hasAttribute()
element.hasAttributeNS()
element.getAttributeNode()
element.getAttributeNodeNS()
element.setAttributeNode()
element.setAttributeNodeNS()
element.removeAttributeNode()
```

## Get Elements

```javascript
element.getElementsByTagName()
element.getElementsByTagNameNS()
element.getElementsByClassName() // (IE9+) HTML5
element.querySelector() // cssSelector: "img.button" "body"… return the first matched element within element
element.querySelectorAll() // return all matched elements within element
element.closest() // experimental IE Not supported // element.closest(selectorString) // return closest parentNode matches selectorString
element.webkitMatchesSelector() // element.webkitMatchesSelector() -> boolean
element.matches() // element.matches(selectorString) -> boolean
```

## DOM 元素的大小与位置

element.style: [Style](/webapi/style.html)

[一张图彻底掌握 scrollTop, offsetTop, scrollLeft, offsetLeft......](https://github.com/pramper/Blog/issues/10)

### 偏移量

```javascript
element.offsetParent
element.offsetTop
element.offsetLeft
```

`offsetTop`, `offsetLeft`：只读属性。要确定的这两个属性的值，首先得确定元素的 `offsetParent`。`offsetParent` 指的是距该元素最近的 `position` 不为 `static` 的祖先元素，如果没有则指向 `body`。确定了 `offsetParent`，`offsetLeft` 指的是元素左侧偏移 `offsetParent` 的距离，同理 `offsetTop` 指的是上侧偏移的距离。

```javascript
element.scrollTop
element.scrollLeft
```

`scrollTop`, `scrollLeft` 获取或设置 DOM 元素已经滚动到本身左边界或上边界的像素数。

[视口位置](/webapi/window.html#视口位置)

### 长度或宽度

```javascript
element.offsetWidth  //（只读） 元素的可见宽度 (包括边框、内边距和滚动条)
element.offsetHeight //（只读） 元素的可见高度 (包括边框、内边距和滚动条)
element.scrollWidth  //（只读） 元素的完整宽度
element.scrollHeight //（只读） 元素的完整高度
element.clientWidth  //（只读） 内容 + 内边距的可见部分的宽度，不包含滚动部分
element.clientHeight //（只读） 内容 + 内边距的可见部分的高度，不包含滚动部分
element.clientTop    //（只读） 元素的上边框的宽度
element.clientLeft   //（只读） 元素的左边框的宽度
```

### Rect

```javascript
element.getClientRects() // 返回一个指向客户端中每一个盒子的边界矩形的矩形集合
element.getBoundingClientRect() // 返回边界矩形: 元素的大小及其相对于视口的位置
```

## Scroll

```javascript
element.scrollIntoView([alignToTop = true])
```

scroll to element

if false, the bottom of the element will be aligned to the bottom of the visible area of the scrollable ancestor.

```javascript
element.scrollIntoViewIfNeeded(alignCenter)
```

- Unless element is within viewpoint, scroll to element
- alignCenter == true -> element will be placed in the center.

## Event

[Event](/webapi/event.html)

```javascript
element.onbeforecopy
element.onbeforecut
element.onbeforepaste
element.oncopy
element.oncut
element.onpaste
element.onsearch
element.onselectstart
element.onwheel
element.onwebkitfullscreenchange
element.onwebkitfullscreenerror
element.onabort
element.onblur
element.oncancel
element.oncanplay
element.oncanplaythrough
element.onchange
element.onclick
element.onclose
element.oncontextmenu
element.oncuechange
element.ondblclick
element.ondrag
element.ondragend
element.ondragenter
element.ondragleave
element.ondragover
element.ondragstart
element.ondrop
element.ondurationchange
element.onemptied
element.onended
element.onerror
element.onfocus
element.oninput
element.oninvalid
element.onkeydown
element.onkeypress
element.onkeyup
element.onload
element.onloadeddata
element.onloadedmetadata
element.onloadstart
element.onmousedown
element.onmouseenter
element.onmouseleave
element.onmousemove
element.onmouseout
element.onmouseover
element.onmouseup
element.onmousewheel
element.onpause
element.onplay
element.onplaying
element.onprogress
element.onratechange
element.onreset
element.onresize
element.onscroll
element.onseeked
element.onseeking
element.onselect
element.onshow
element.onstalled
element.onsubmit
element.onsuspend
element.ontimeupdate
element.ontoggle
element.onvolumechange
element.onwaiting
element.onpointercancel
element.onpointerdown
element.onpointerenter
element.onpointerleave
element.onpointermove
element.onpointerout
element.onpointerover
element.onpointerup
element.ongotpointercapture
element.onlostpointercapture
element.click()
element.focus() // focus on element
element.blur()
element.addEventListener()
element.removeEventListener()
element.dispatchEvent()
```

## Others

```javascript
element.createShadowRoot()
element.shadowRoot
element.attachShadow()
element.getDestinationInsertionPoints()
element.requestPointerLock()
element.animate() // experimental
element.remove() // (Edge) remove element from the tree it belongs to
element.webkitRequestFullScreen()
element.webkitRequestFullscreen()
element.webkitdropzone
element.assignedSlot
element.slot
element.setPointerCapture()
element.releasePointerCapture()
element.baseURI
element.isConnected
element.ownerDocument
element.textContent
element.hasChildNodes()
element.getRootNode()
element.normalize()
element.cloneNode()
element.hidden
element.tabIndex
element.accessKey
element.draggable
element.spellcheck
element.contentEditable
element.isContentEditable
```
