---
title: Reconciliation
---

Reconciliation 是 React 的 diff 算法的名字。

## Element 类型改变

```jsx
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

前后两个 Virtual DOM 中 `div` 和 `span` 在同一层次，根节点不同，并不比较子树，Counter 组件实例会被销毁，并重新挂载。

## Element 位置改变

```jsx
<>
  <div/>
  <Header />
</>

<>
  <div/>
  {null}
  <Header />
</>
```

null 在这里没有任何作用，只是占了位置，但导致 Header 组件实例销毁， 新 Header 实例的创建和挂载。

## 递归子节点

这里指的是对 Element 子树节点的递归。顺便提一下，React 还会在下一层的自定义组件渲染出的 Virtual DOM 执行 Diff 算法。

默认情况下，React 按照顺序将两组子树的节点按顺序进行比较。

```jsx
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

两个 `<li>first</li>` 匹配，两个 `<li>second</li>` 匹配，插入 `<li>third</li>`。

```jsx
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

React 会修改原`<li>Duke</li>`，原`<li>Villanova</li>`，插入新`<li>Villanova</li>`节点。而不是保留原来的子树，插入`<li>Connecticut</li>`。

## Keys

React 用 key 匹配原子树的节点和新子树的节点。

```jsx
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

React 知道 key 为 `2014` 的节点是新项，并且 key 为 `2015`、`2016` 的节点移到了后面。

key 仅仅需要在兄弟节点间唯一，不需要全局唯一。

如果需要指定 key 则 key 最好和节点内容有密切的关系，如果 key 是数组的 index ，往往效果和不用 key 一样。

为什么 key 不用数组的 index？

如果数组的变更触发组件重渲染，列表子树的一个非末尾节点被删除或者中间有新节点插入，在没有指定 key 或 key 为数组 index 的情况下，和前文说的默认情况一样是按顺序比较两组节点，这是不准确、效率低下的。例如，我们把 `<li />` 换成有内部状态的节点比如 `<Article url={item.url} />`，Article 组件存在副作用，它获取 url 对应的资源，最终显示相应的内容。此时，Virtual DOM 中实际发送改变位置之后的节点对比原子树对应位置的节点 url prop 的值改变了，如果 Article 组件没有处理 props 改变的情况即 `componentWillReceiveProps` 没有处理 url 改动带来的变化，内部的状态还是原来的，但和 url 不匹配，这样就造成了状态紊乱。如果处理了 props 改变的情况，也会带来额外的开销。根据实际业务应该用和内容相关的唯一值作为 key，例如这里的 `item.url` 。

不用 index 那用 `Math.random()` 可以吧！？

引用一下 React 文档的一段话：

> Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.

用 key 寻找配对的节点，但没找到的，结果总是卸载原来的实例，创建新的实例，会造成状态丢失，性能降级。

## 参考资料

* [Reconciliation - React](https://reactjs.org/docs/reconciliation.html#elements-of-different-types)
* [React diff 算法](http://zencode.in/12.react-diff%E7%AE%97%E6%B3%95.html)
