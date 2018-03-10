---
title: z-index
---

作用对象：`position` 非 `static` 的元素。

## 取值

初始值：auto

<dl>
  <dt>auto</dt><dd>元素不会建立一个新的本地堆叠上下文。当前堆叠上下文中新生成的元素和父元素堆叠层级相同。</dd>

  <dt>整数</dt><dd>整型数字是生成的元素在当前堆叠上下文中的堆叠层级。<strong>元素同时会创建一个堆叠层级为0的本地堆叠上下文，这意味着子元素的 z-indexes 不与元素外的其余元素的 z-indexes 进行对比。</strong></dd>
</dl>
