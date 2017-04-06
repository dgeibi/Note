---
title: Attr
---

元素的特性

`element.attributes` 中的节点

```javascript
var attr = document.createAttribute("align");
attr.value = "left";

attr.namespaceURI
attr.prefix
attr.localName
attr.name // "align"
attr.value // "left"
attr.nodeValue // "left"
attr.textContent
attr.ownerElement
attr.specified // true // 是代码指定的
attr.nodeType // 2
attr.nodeName // "align"
attr.baseURI
attr.isConnected
attr.ownerDocument
attr.parentNode
attr.parentElement
attr.childNodes // [] // html
attr.firstChild
attr.lastChild
attr.previousSibling
attr.nextSibling
attr.hasChildNodes()
attr.getRootNode()
attr.normalize()
attr.cloneNode()
attr.isEqualNode()
attr.isSameNode()
attr.compareDocumentPosition()
attr.contains()
attr.lookupPrefix()
attr.lookupNamespaceURI()
attr.isDefaultNamespace()
attr.insertBefore()
attr.appendChild()
attr.replaceChild()
attr.removeChild()
attr.addEventListener()
attr.removeEventListener()
attr.dispatchEvent()
```

```javascript
var attr = document.createAttribute("align");
attr.value = "left";
var element = document.createElement("div");
element.setAttributeNode(attr); // 将 attr 添加到 element 的特性中
element.attributes["align"].value // "left"
element.getAttributeNode("align").value // "left"
element.getAttribute("align") // "left"
```

实际上，`setAttribute()` `getAttribute()` `removeAttribute()` 比操作节点方便
