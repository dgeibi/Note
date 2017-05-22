---
title: Graphviz
hide: true
---

[使用graphviz绘制流程图（2015版） - I code it](http://icodeit.org/2015/11/using-graphviz-drawing/)
[使用graphviz画程序流程图 - 阿牛牛牛牛的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/u013819806/article/details/42180959)

Graphviz 使用 dot 脚本语言。

元素：
- 图（`digraph` `subgraph`）
- 边（`edge`）
- 结点（`node`）

元素的属性：
- `label`
- `bgcolor`
- `fontname`
- `fontsize`
- `color`
- `shape`
- `style`
- `width`
- `height`
- ...

使用 Graphviz 的一般流程为：

1. 定义一个图，并向图中添加需要的结点和边
2. 为结点和边添加样式
3. 使用布局引擎进行绘制
