---
title: Form
---

## form

[form - HTML（超文本标记语言） \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/form/)

&lt;form&gt; 定义一个表单以收集用户的输入

```html
<form>
    <!-- 表单元素 -->
</form>
```

|Attr | 描述 |
|----|----|
|action | 一个处理这个 form 信息的程序所在的 URL|
|method | 浏览器提交 form 的方式。值："post", "get"|

## 表单元素


### fieldset

[\<fieldset\> - HTML \| MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset/)

将控件与 label 集合在 `<fieldset></fieldset>` 内

### legend

为在父级的 \<fieldset\> 添加说明文字。

### input

[input - HTML（超文本标记语言） \| MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/)

`<input>` 用来创建交互控件 (control)

|Attr | 描述 | 值 |
|----|----|--|
|type | 类型 | text(文本), button(按钮), radio(单选按钮), password(密码), checkbox(复选框), submit(提交按钮)...|
|checked | 如果该元素的 type 属性的值为 radio 或者 checkbox, 则该布尔属性的存在与否表明了该控件是否是默认选择状态 | 无 |
|name | 提交的名字 | 字符串 |
|value | 初始值（若 type 为 checkbox/radio 则必须有 value）| 字符串 |

### 文本框

<input type="text" size="25" maxlength="50" name="name" value="初始文本">

```html
<input type="text" size="25" maxlength="50" name="name" value="初始文本">
```

- size：显示的字符数
- maxlength：最大字符数
- pattern：设置文本框的应该匹配的正则表达式

### label

为控件 (control) 加说明文字

```html
<label for="username">Click me</label>
<input type="text" id="username">

<!-- 等效 -->

<label>Click me <input type="text"></label>
```

### select

[\<select\> - HTML \| MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select/)

选择

```html
<!-- The second value will be selected initially -->
<select name="select">
  <option value="value1">Value 1</option>
  <option value="value2" selected>Value 2</option>
  <option value="value3">Value 3</option>
</select>
```

<select name="select">
  <option value="value1">Value 1</option>
  <option value="value2" selected>Value 2</option>
  <option value="value3">Value 3</option>
</select>

### datalist

[\<datalist\> - HTML \| MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist/)

```html
<label>Choose a browser from this list:
<input list="browsers" name="myBrowser" /></label>
<datalist id="browsers">
  <option value="Chrome">Chrome</option>
  <option value="Firefox">Firefox</option>
  <option value="Internet Explorer">Internet Explorer</option>
  <option value="Opera">Opera</option>
  <option value="Safari">Safari</option>
  <option value="Microsoft Edge">Microsoft Edge</option>
</datalist>
```

<label>Choose a browser from this list:
<input list="browsers" name="myBrowser" /></label>
<datalist id="browsers">
  <option value="Chrome">Chrome</option>
  <option value="Firefox">Firefox</option>
  <option value="Internet Explorer">Internet Explorer</option>
  <option value="Opera">Opera</option>
  <option value="Safari">Safari</option>
  <option value="Microsoft Edge">Microsoft Edge</option>
</datalist>

### textarea

多行可编辑控件。

特性：

* rows：行数
* cols：列数
* ...

```html
<textarea> 默认文字 </textarea>
```

<textarea> 默认文字 </textarea>

## 特性

- `required`：存在则必填，适用于 `<input>, <textarea>, <select>`。
- `novalidate`：使表单不进行验证，适用于 `<form>`。
- `formnovalidate`：使表单字段不进行验证，适用于表单字段。
