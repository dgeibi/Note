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

### 为什么 key 不能是数组的 index？

假定有个组件，其状态有一个数组，组件用数组生成一个列表。通过 setState 方法删除数组中间的一个元素，触发组件重渲染，对应的，删除列表子树一个节点。列表组件的 item 是有内部状态的节点比如 `<Article url={item.url} />`，Article 组件存在副作用，它获取 url 对应的资源，最终显示相应的内容。

如果不指定 key，React 按顺序比较两组节点。如果 key 为数组 index，React 比较 key 相同的两个 Element，因为数组 index 只和位置有关，所以实际上 React 依旧按顺序比较两组节点。

被删除节点后面的所有节点被移动到前面的一个位置。然而 React 并不知道其中的对应关系。React 只知道新子树的末尾少了一个节点，销毁最后的实例。React 会执行剩下所有实例的 `componentWillReceiveProps` 方法，如果 `componentWillReceiveProps` 没有处理好 url 改动的情况，url 变动的实例的状态会是脏的，因为状态和 url 不匹配。如果处理了 props 改变的情况，则会带来额外的开销。

根据实际业务应该用和内容相关的唯一值作为 key，例如上面的 `item.url`。

### 不用 index 那用 `Math.random()` 可以吧！？

引用一下 React 文档的一段话：

> Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.

用 key 寻找配对的节点，但没找到的，结果总是卸载原来的实例，创建新的实例，会造成状态丢失，性能降级。

## 参考资料

* [Reconciliation - React](https://reactjs.org/docs/reconciliation.html#elements-of-different-types)
* [React diff 算法](http://zencode.in/12.react-diff%E7%AE%97%E6%B3%95.html)
