---
title: Node
---

下面这些类型的元素继承了该接口的所有属性和方法：

* `Document`
* `Element`
* `HTMLElement`: Inherits properties from its parent, `Element`, and implements those from `GlobalEventHandlers` and
* `TouchEventHandlers`.
* `Attr`
* `CharacterData` (Text, Comment,CDATASection 继承该类型)
* `ProcessingInstruction`
* `DocumentFragment`
* `DocumentType`
* `Notation`
* `Entity`
* `EntityReference`

```javascript
/* 类型值 1 -> 12 */
Node.ELEMENT_NODE
Node.ATTRIBUTE_NODE
Node.TEXT_NODE
Node.CDATA_SECTION_NODE
Node.ENTITY_REFERENCE_NODE
Node.ENTITY_NODE
Node.PROCESSING_INSTRUCTION_NODE
Node.COMMENT_NODE
Node.DOCUMENT_NODE
Node.DOCUMENT_TYPE_NODE
Node.DOCUMENT_FRAGMENT_NODE
Node.NOTATION_NODE

/* DOCUMENT_POSITION  */                        // 掩码
Node.DOCUMENT_POSITION_DISCONNECTED             // 1
Node.DOCUMENT_POSITION_PRECEDING                // 2
Node.DOCUMENT_POSITION_FOLLOWING                // 4
Node.DOCUMENT_POSITION_CONTAINS                 // 8
Node.DOCUMENT_POSITION_CONTAINED_BY             // 16
Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC  // 32
```

```javascript
node.nodeType // return 类型
node.nodeName // 如果是元素，return tagName;
node.baseURI  // 文档的地址；通过 [<base>](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/base) 修改
node.isConnected
node.ownerDocument  // -> 所在的 document
node.parentNode     // 父节点
node.parentElemenft // parent Element Node; if parentNode is not an element, return null
node.childNodes     // type: NodeList (类数组)
node.firstChild     // 第一个子节点
node.lastChild      // 最后一个子节点
node.previousSibling // 上一个同胞节点
node.nextSibling     // 下一个同胞节点
node.nodeValue       // 如果 node 是元素，return null;
node.hasChildNodes() // ture：如果有子节点
node.getRootNode()
node.normalize() // 处理文本节点的异常 element.normalize();
node.cloneNode() // var deepList = myList.cloneNode(true); var shallowList = myList.cloneNode(false);
node.isEqualNode() // node.isEqualNode(otherNode) // true: same/all the value equal
node.isSameNode()  // node.isSameNode(otherNode) // true: point to the same node
```

## node.textContent

ie9

* 如果 element 是 Document，DocumentType 或者 Notation 类型节点，则 textContent 返回 null。
* 如果节点是个 CDATA 片段，注释，ProcessingInstruction 节点或一个文本节点，textContent 返回节点内部的文本内容（即 nodeValue）。
* 对于其他节点类型，textContent 将所有子节点的 textContent 合并后返回，除了注释、ProcessingInstruction 节点。如果该节点没有子节点的话，返回一个空字符串。
* 在节点上设置 textContent 属性的话，会删除它的所有子节点，并替换为一个具有给定值的文本节点。

[textContent 与 innerText 的区别](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent# 与 innerText 的区别)

## 节点位置

### node.compareDocumentPosition()

[DOCUMENT_POSITION](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/compareDocumentPosition)

```javascript
node.compareDocumentPosition( otherNode )
```

| 常量名           	                       | 十进制值  |   含义                |
|-----------------------------------------|----------|-----------------------|
|DOCUMENT_POSITION_DISCONNECTED	          |    1 	 |   不在同一文档中      |
|DOCUMENT_POSITION_PRECEDING              |    2     |   otherNode 在 node 之前 |
|DOCUMENT_POSITION_FOLLOWING	          |    4	 |   otherNode 在 node 之后 |
|DOCUMENT_POSITION_CONTAINS	              |    8	 |   otherNode 包含 node   |
|DOCUMENT_POSITION_CONTAINED_BY	          |    16    |   node 包含 otherNode  |
|DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC|	   32    |  待定                 |


### node.contains()

```javascript
node.contains( otherNode )
```

returns a Boolean value indicating whether a node is a descendant of a given node or not.

## 命名空间相关方法

```javascript
node.lookupPrefix()       // node.lookupPrefix(namespaceURI) // return namespaceURI's prefix
node.lookupNamespaceURI() // node.lookupNamespaceURI(prefix) // return prefix's namespaceURI
node.isDefaultNamespace() // node.isDefaultNamespace(namespaceURI) // return true if specified namespaceURI is namespace of node
```

## 节点的增删

### node.insertBefore()

```javascript
var insertedElement = parentElement.insertBefore(newElement, referenceElement);
```


### node.appendChild()

向 childNodes 末尾添加一个节点；同一个节点只能在同一文档中出现一次

### node.replaceChild()

```javascript
var returnedNode = someNode.replaceChild(newChild, oldChild) // oldChild = returnedNode
```

### node.removeChild()

```javascript
var formerChild = someNode.removeChild(tobeRemoved);
```

## ChildNode

[ChildNode - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode)

experimental

### ChildNode.remove()

```javascript
node.remove();
```

将 node 从节点树中删除。

### ChildNode.after()

```javascript
node.after(nodes);
```

向 node 的父节点下于 node 之后插入一系列节点，参数顺序和文档上的顺序一致。

### ChildNode.before()

```javascript
node.before(nodes);
```

向 node 的父节点下于 node 之前插入一系列节点，参数顺序和文档上的顺序一致。

### ChildNode.replaceWith()

```javascript
node.replaceWith(nodes);
```

将 node 替换成一系列节点。

## ParentNode

(IE9+)

```javascript
Element.previousElementSibling  // previous element https://developer.mozilla.org/zh-CN/docs/Web/API/NonDocumentTypeChildNode
Element.nextElementSibling      // next element
ParentNode.firstElementChild       // first child element
ParentNode.lastElementChild        // last child element
ParentNode.childElementCount       // the number of child element
ParentNode.children                // child elements of Node. // ie6-8 erroneously includes Comment nodes
ParentNode.parentElement           // parent Element Node; if parentNode is not an element, return null
```

### ParentNode.append()

```javascript
ParentNode.append(nodes);
```

在 ParentNode 的子节点列表最后添加一系列节点

### ParentNode.prepend()

```javascript
ParentNode.prepend(nodes);
```

在ParentNode的子节点列表开始处添加一系列节点
