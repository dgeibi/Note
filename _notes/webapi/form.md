---
title: Form
---

## HTMLFormElement

`<form>` 属性与方法

- acceptCharset：服务器能够处理的字符集。
- action：接受请求的 URL。
- elements：表单中所有控件的集合。
- enctype：请求的编码类型。
- length：表单中控件的数目。
- method：要发送的 HTTP 请求类型，"get"/"post"。
- name：表单的名称。
- reset()：将表单域重置为默认值。
- submit()：提交表单。
- target：用于发送请求和接收响应的窗口名称。
- checkValidity()：字段都有效返回 true。

## 取得表单元素

```javascript
var form = document.getElementById("form1");

var field1 = form.elements[0]; /* 取得第 1 个的表单元素 */

var field2 = form.elements["textbox1"]; /* 取得 name 为 "textbox1" 的表单元素 */
```

## 表单元素共有的属性

- disabled：boolean，是否被禁用。
- name：名称。
- form：指向所属表单的指针，只读。
- readOnly：boolean，是否只读。
- tabIndex：tab 序号。
- type：类型。
- value：提交给服务器的值。
- validity：包含一系列属性，反应字段有效性，都是 boolean。
    - patternMismatch
    - rangeOverFlow
    - rangeUnderflow
    - stepMisMatch
    - tooLong
    - typeMismatch
    - valid
    - valueMissing

`<fieldset>` 没有 type 属性。`<input>` 的 type 与 HTML 特性 type 相同。

|HTML|type 属性 |
|----|---------|
|`<select> ... </select>`|"select-one"|
|`<select multiple> ... </select>`|"select-multiple"|
|`<button> ... </button>`|"submit"|
|`<button type="button"> ... </button>`|"button"|
|`<button type="reset"> ... </button>`|"reset"|
|`<button type="submit"> ... </button>`|"submit"|

**避免多次提交表单**

```javascript
form.addEventListener("submit", function (event) {
    var btn = event.target.elements["submit-btn"];
    btn.disabled = true;
});
```

## 表单元素共有的方法

`focus()`：将浏览器焦点设置到表单字段上

`blur()`：移走焦点。

`checkValidity()`：字段的值有效则返回 true，否则返回 false。

## 文本选择

- [HTMLTextAreaElement - Web APIs \| MDN](https://developer.mozilla.org/en/docs/Web/API/HTMLTextAreaElement)
- [HTMLInputElement - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement)

`<textarea>`, `<input type="text">`

- selectionStart：选择的文本的开头索引。
- selectionEnd：选择的文本的末尾索引。
- setSelectionRange()：
```javascript
/* 选择一定范围的文本 */
el.setSelectionRange(selectionStart, selectionEnd);
```
- select()：选择所有的所以内容。

## 选择框

选择框由 `<select>` `<option>` 创建

HTMLSelectionElement 的属性和方法：

- add(newOption, relOption)：向控件中插入新 `<option>` 元素，位置在 relOption 之前。relOption 为 `undefiled` 时可插到最后面。
- multiple：boolean，表是否多选。
- options：控件中所有 `<option` 的 HTMLCollection。
- remove(index)：移除给定位置的选项。
- size：选择框的可见行数。
- selectedIndex：第一个已选择的选项索引，未选择时值为 -1。

value 的值：

- 没有选中项：空字符串。
- 有一个选择项，选项 value 特性在 HTML 上已指定：value 特性的值。
- 有一个选择项，选项 value 特性未在 HTML 上已指定：该项的文本。
- 多项：取被选的第一项的 value。

HTMLOptionElement 的属性：

- index：索引。
- label：标签。
- selected：boolean，表是否被选中。
- text：选项的文本。
- value：值，等价于 HTML 上的 value 特性。

不推荐用标准 DOM 技术修改 `<option>` 的文本和值。

**添加选项**

```javascript
var newOption = new Option("Option text", "Option value");
selectElem.add(newOption, undefined);
```

## 表单事件

[表单事件](/webapi/typeofevent.html#formevents)
