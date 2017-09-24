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
```
