---
title: DOM Level 2 Style
---

* [Document Object Model (DOM) Level 2 Style Specification](https://www.w3.org/TR/DOM-Level-2-Style/)
* [CSS Object Model (CSSOM)](https://www.w3.org/TR/cssom-1/)

## element.style

element.style - instance of CSSStyleDeclaration

包含通过 HTML 的 style 特性指定的所有样式信息，不包含与外部样式表或嵌入样式表经层叠而来的样式。

| CSS 属性          |   JavaScript 属性      |
| :--------------  | :----------------     |
| background-image | style.backgroundImage |
| color            | style.color           |
| float            | style.cssFloat        |

```javascript
element.style.cssText // cssCode w/r
element.style.item(index) // 给定位置的 CSS 属性名称
element.style.length      // element 的 CSS 属性数量
element.style.parentRule  // return CSSRule which containing CSSStyleDeclaration
element.style.getPropertyValue(propertyName)    // 返回指定属性值
element.style.getPropertyPriority(propertyName) // 如果指定属性值有'!important', 则返回 "important"，否则返回 ""
element.style.setProperty(propertyName, value, priority) // priority: "important" || ""
element.style.removeProperty(propertyName) // 删除指定属性
```

## Computed Style

document.defaultView.getComputedStyle() || window.getComputedStyle()

```javascript
var style = window.getComputedStyle(element[, pseudoElt]);
```

- element: 要取得 computed style 的元素。
- pseudoElt: 指定一个伪元素 (":before"/":after") 进行匹配。对于常规的元素来说可省略或设成 null。

返回一个只读的 CSSStyleDeclaration 对象。

输出规则的值：

```
console.log(style.backgroundColor);
console.log(style.width);
```

IE8 的有类似的对象。

```javascript
var style = element.currentStyle;
```

## StyleSheet

```
document.styleSheets instanceof StyleSheetList
document.styleSheets[0] instanceof CSSStyleSheet

sheets -> sheet -> rules -> rule -> style
StyleSheetList - CSSStyleSheet - CSSRuleList - CSSStyleRule - CSSStyleDeclaration
```

```javascript
var sheet = document.styleSheets[0];

var rules = sheet.cssRules || sheet.rules;
var rule = rules[0];

rule.style.backgroundColor = "red";

sheet.disabled // 表示样式表是否被禁用的布尔值。值为 true 时，禁用样式表。
sheet.deleteRule(index) // for ie8: sheet.removeRule(index)
sheet.insertRule(rule, index) // for ie8: sheet.addRule(selectorText, cssText, index)
rule.cssText // read only "p {color: red;}"
rule.selectorText //-> "body" "p" "#id" ...
rule.style // similar to element.style, r/w
```

直接从 `<link>` 或 `<style>` 元素取得 CSSStyleSheet 对象：

```javascript
function getStyleSheet(element) {
    return element.sheet || element.styleSheet;
}
var link = document.getElementsByTagName("link")[0];
var sheet = getStyleSheet(link);
```
