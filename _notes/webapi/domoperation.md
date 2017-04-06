---
title: DOM Operation
---

## 动态脚本

### 外链脚本

```javascript
function loadScript(url){
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.body.appendChild(script);
}

loadScript("client.javascript");
```

### 内联脚本

```javascript
function loadScriptString(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {
        script.appendChild(document.createTextNode(code));
    } catch (ex){
        script.text = code; //IE
    }
    document.body.appendChild(script);
}

loadScriptString("function sayHi(){alert('hi');}");
sayHi();
```

## 动态样式

### 外链样式

```javascript
function loadStyles(url){
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
}

loadStyles("styles.css");
```

### 内联样式

```javascript
function loadStyleString(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{
        style.appendChild(document.createTextNode(css));
    } catch (ex){
        style.styleSheet.cssText = css; //IE
    }
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);
}

function addStyle(){
    loadStyleString("body{background-color:red}");
}
```

## 操作表格

```javascript
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/
var table = document.createElement("table");
table.constructor.prototype //HTMLTableElement
table.caption // -> <caption>
table.tHead // -> <thead>
table.tFoot // -> <tfoot>
table.tBodies //<tbody> 元素的 HTMLCollection
table.rows // -> 所有行的 HTMLCollection
table.createCaption() // create <caption>, return table.caption
table.deleteCaption()
table.createTHead()
table.deleteTHead()
table.createTFoot()
table.deleteTFoot()
table.createTBody() // HTML 5
table.insertRow(pos) // pos: 0-; return table.rows[pos] // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/insertRow
table.deleteRow(pos)

table.align // obsolete api
table.border // obsolete api
table.frame // obsolete api
table.rules // obsolete api
table.summary // obsolete api
table.width // obsolete api
table.bgColor // obsolete api
table.cellPadding // obsolete api
table.cellSpacing // obsolete api
```

```javascript
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableSectionElement
var tbody = document.createElement("tbody");
tbody.constructor.prototype // HTMLTableSectionElement
tbody.rows // -> 所有行的 HTMLCollection
tbody.insertRow() // pos: 0-; return table.rows[pos]
tbody.deleteRow()
tbody.align // obsolete api
tbody.ch // obsolete api
tbody.chOff // obsolete api
tbody.vAlign // obsolete api
```

```javascript
/* HTMLTableRowElement, element of rows */
tr.rowIndex // Returns a long value which gives the logical position of the row within the entire table. If the row is not part of a table, returns -1.
tr.sectionRowIndex // obsolete api
tr.cells // collection of <td> // doc read only but actually writable
tr.insertCell(pos) // create cell at pos, return the cell
tr.deleteCell(pos)

tr.align // obsolete api
tr.ch // obsolete api
tr.chOff // obsolete api
tr.vAlign // obsolete api
tr.bgColor // obsolete api
```


```HTML
<table border="1" width="%100">
    <tbody>
        <tr>
            <td>
                Cell 1, 1
            </td>
            <td>
                Cell 2, 1
            </td>
        </tr>
        <tr>
            <td>
                Cell 1, 2
            </td>
            <td>
                Cell 2, 2
            </td>
        </tr>
    </tbody>
</table>
```

```javascript
/* 创建 <table> */
var table = document.createElement("table");
table.border = 1;
table.width = "100%";

/* 创建 <tbody> */
var tbody = document.createElement("tbody");
table.appendChild(tbody);

/* create rows */
tbody.insertRow(0);
tbody.insertRow(1);

/* create and fill cells */
tbody.rows[0].insertCell(0).appendChild(document.createTextNode("Cell 1, 1"));
tbody.rows[0].insertCell(1).appendChild(document.createTextNode("Cell 2, 1"));
tbody.rows[1].insertCell(0).appendChild(document.createTextNode("Cell 1, 2"));
tbody.rows[1].insertCell(1).appendChild(document.createTextNode("Cell 2, 2"));

document.body.appendChild(table);
```
