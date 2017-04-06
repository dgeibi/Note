---
title: DocumentFragment
---

轻量的 document，作为文档仓库

```javascript
var fragment = document.createDocumentFragment();
var div = document.createElement("div");
fragment.append(div);

fragment.children // -> fragment.childNodes(elements only)
fragment.firstElementChild // fragment.firstChild(elements only)
fragment.childElementCount // fragment.children.length
fragment.nodeType // 11
fragment.nodeName // "#document-fragment"
fragment.parentNode // null
fragment.parentElement // null
fragment.nodeValue // null
fragment.textContent // ""
fragment.hasChildNodes() // true
fragment.lastElementChild
fragment.getElementById()
fragment.querySelector()
fragment.querySelectorAll()
fragment.prepend()
fragment.append()
fragment.baseURI
fragment.isConnected
fragment.ownerDocument
fragment.childNodes
fragment.firstChild
fragment.lastChild
fragment.previousSibling
fragment.nextSibling
fragment.getRootNode()
fragment.normalize()
fragment.cloneNode()
fragment.isEqualNode()
fragment.isSameNode()
fragment.compareDocumentPosition()
fragment.contains()
fragment.lookupPrefix()
fragment.lookupNamespaceURI()
fragment.isDefaultNamespace()
fragment.insertBefore()
fragment.appendChild()
fragment.replaceChild()
fragment.removeChild()
fragment.addEventListener()
fragment.removeEventListener()
fragment.dispatchEvent()
```
