---
title: Traversal & Range
---

[Document Object Model (DOM) Level 2 Traversal and Range Specification](https://www.w3.org/TR/DOM-Level-2-Traversal-Range/)

## NodeIterator

```javascript
var nodeIterator = document.createNodeIterator(root, whatToShow, filter);
```

* root: 根，搜索的起点
* whatToShow: 表示要访问的节点的类别，掩码

```javascript
NodeFilter.SHOW_ALL
NodeFilter.SHOW_ELEMENT
NodeFilter.SHOW_TEXT
NodeFilter.SHOW_COMMENT
NodeFilter.SHOW_DOCUMENT
NodeFilter.SHOW_DOCUMENT_TYPE
NodeFilter.SHOW_NOTATION
NodeFilter.SHOW_ATTRIBUTE // dropped
NodeFilter.SHOW_CDATA_SECTION // dropped
NodeFilter.SHOW_ENTITY_REFERENCE // dropped
NodeFilter.SHOW_ENTITY // dropped
NodeFilter.SHOW_PROCESSING_INSTRUCTION // dropped
NodeFilter.SHOW_DOCUMENT_FRAGMENT // dropped
```

* filter: NodeFilter 对象 / 函数 / null

```javascript
NodeFilter.FILTER_ACCEPT // 保留节点
NodeFilter.FILTER_REJECT // 跳过节点
NodeFilter.FILTER_SKIP // 跳过节点
```

Methods:

* nodeIterator.nextNode()
* nodeIterator.previousNode()

Example:

```javascript
var nodeIterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    function(node) {
        return node.nodeName.toLowerCase() === 'p' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
);
var pars = [];
var currentNode;

while (currentNode = nodeIterator.nextNode()) {
  pars.push(currentNode);
}
```

## TreeWalker

https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker

```javascript
treeWalker = document.createTreeWalker(root, whatToShow, filter, entityReferenceExpansion);
// entityReferenceExpansion 一般 -> false
treeWalker.root
treeWalker.whatToShow
treeWalker.filter
treeWalker.currentNode

treeWalker.parentNode() // 父节点
treeWalker.firstChild()
treeWalker.lastChild()
treeWalker.previousSibling() // 上一个同胞节点
treeWalker.nextSibling() // 下一个同胞节点
treeWalker.previousNode()
treeWalker.nextNode()
```

```javascript
// filter
NodeFilter.FILTER_ACCEPT // 保留节点
NodeFilter.FILTER_REJECT // 跳过节点及其子树
NodeFilter.FILTER_SKIP // 跳过节点
```

## Range

```javascript
var range = document.createRange();

range.startContainer  // 第一个节点的父节点
range.startOffset     // 第一个节点在父节点中的索引
range.endContainer    // 最后一个节点的父节点
range.endOffset       // 最后一个节点在父节点中的索引
range.commonAncestorContainer // range.startContainer 和 range.endContainer 最深的共同祖先

/* 设置属性的方法 */
range.setStart(refNode, offset) // startContainer = refNode, startOffset = offset
range.setEnd(refNode, offset) // endContainer = refNode, endOffset = offset
range.selectNode(refNode)       // 选择包括 refNode 本身及子节点的范围
range.selectNodeContents(refNode)  // 选择包括 refNode 的所有子节点的范围
range.setStartBefore( refNode )
range.setStartAfter( refNode )
range.setEndBefore( refNode )
range.setEndAfter( refNode )

/* 折叠 */
range.collapsed // 范围选区为空时 -> true
range.collapse(boolean) // boolean: true-> 折叠到范围的起点，false-> 折叠到范围的终点

/* 比较 DOM 范围 */

range.compareBoundaryPoints()
compare = range.compareBoundaryPoints(how, anotherRange);

//compare 的值
// -1 -> range's 在 anotherRange's 前
// 0  -> 相等
// 1  -> range's 在 anotherRange's 后

//how
range.START_TO_START
range.START_TO_END // range 的起点与 anotherRange 的终点比较
range.END_TO_END
range.END_TO_START // range 的终点与 anotherRange 的起点比较

/* 操作方法 （必要时会自动构建有效的 DOM 结构）*/
range.deleteContents() // 删除
range.extractContents() // 剪切（返回值是文档片段）
range.cloneContents() // 克隆（返回值是文档片段）
range.insertNode(node) // 向范围选区开始处插入一个节点
range.surroundContents(node) // 将选区的内容剪切到 node.innerHTML，并且将 node 放在原选区的位置

range.cloneRange() // 克隆范围
range.detach() // 从文档中分离范围，一般与 range=null 一起用

// etc
range.isPointInRange()
range.comparePoint() //https://developer.mozilla.org/en-US/docs/Web/API/Range/comparePoint
range.intersectsNode()
range.getClientRects()
range.getBoundingClientRect()
range.createContextualFragment()
range.expand()
range.toString()
```
