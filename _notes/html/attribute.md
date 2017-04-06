---
title: Attribute
---

## tabindex

- `tabindex="-1"`：将 `tabindex` 设置为负值，能使脚本获得元素焦点，但无法用 tab 键获得焦点。
- `tabindex="0"`：能使元素可以获得焦点，用户用 tab 键也能获得焦点，但顺序是相对靠后的。
- `tabindex="1"`：将 `tabindex` 设置为正值，用户可以利用 tab 取得焦点，值为 `"1"` 的元素第一个获得焦点 ... 如果值相同则根据相对位置决定。

正常情况下，不要将 `tabindex` 设置为正。

[Don’t Use Tabindex Greater than 0 \| Adrian Roselli](http://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html)
