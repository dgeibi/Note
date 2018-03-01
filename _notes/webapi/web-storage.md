---
title: Web Storage
---

## Storage 类

methods and properties:

- `clear()`: delete all the keys
- `getItem(name)`: return value whose key is name
- `key(index)`: return name of index
- `removeItem(name)`: remove item whose key is name
- `setItem(name, value)`: set item
- `length`: the number of key

其实，也可以直接用点和中括号操作 Storage 的实例的键值。

## sessionStorage

储存窗口或标签页关闭前的数据。打开任意页面时，sessionStorage 为空。

sessionStorage 是 Storage 的一个实例。

```javascript
sessionStorage.setItem("name", "dgeibi");
sessionStorage.blog="https://dgeibi.xyz";
delete sessionStorage.blog;
```

迭代

```javascript
for( var i=0, len=sessionStorage.length; i<len;i++) {
    var key = sessionStorage.key(i);
    var value = sessionStorage.getItem(key);
    /* do something with key and value */
}

/* or */
for (var key in sessionStorage) {
    var value = sessionStorage.getItem(key);
    /* do something with key and value */
}
```

## localStorage

取代的 globalStorage 的方案。

localStorage 是 Storage 的实例，只对同一域名，同一协议，同一端口的页面可访问。

## storage 事件

Storage 的实例发生更改就会触发 storage 事件。适用于 localStorage 。

event 对象的属性：

- url：发生变化的存储空间的域名
- key：键名
- newValue：新值 \|\| null
- oldValue：旧值
- storageArea：Storage 的实例

```js
window.addEventListener('storage', function(e) {  
    console.log(e)
});
```