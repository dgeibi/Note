---
title: Object
lang: en
---

## `Object` 字面量

`{x: x}` is `{x}`

inline functions, can written as `obj={func(){}}` instead of `obj={func:function(){}}`

``` javascript
const short = {
  inlineFunc(){return 'I am inline'}
};
short.inlineFunc()//'I am inline'
```

properties may be computed values

``` javascript
const propertyName = 'x';
const obj = {[propertyName]: 1};

obj.x// 1
```

``` javascript
const publicPropertyName = 'x';
const privatePropertyName = '_' + publicPropertyName;
const obj = {
    [privatePropertyName] : null,
    set [publicPropertyName](x) {
        this[privatePropertyName] =x
    }
};
obj.x = 'axe';
obj._x//'axe'
```

## `Object.assign()`

`Object.assign(target, ...sources)` return target

The Object.assign() method is used to copy the **values** of all **enumerable own properties** from one or more source objects to a target object. It will return the target object.

Note: target itself will be changed.

## `Object.create()`

`Object.create(proto[, propertiesObject])` return a new object whose prototype is proto.

See

- [原型式继承](/ecmascript/inheritance.html#原型式继承)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

## `Object.defineProperty()`

[Object.defineProperty() - JavaScript \| MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

The method creates or modifies a property on an object directly, return the object.

Syntax:

```javascript
Object.defineProperty(obj, prop, descriptor)
```

Parameters:

- obj: object on which to create the property.
- prop: string, the name of the property to be defined.
- descriptor: the descriptor of the property to be defined.

Both data and accessor descriptors (数据属性和访问器属性的描述符) are objects.

They shared the following required keys:

|Key|Description|Default|
|---|---|---|
| configurable | true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. |false|
| enumerable | true if and only if this property shows up during enumeration of the properties on the corresponding object.|false|

A data descriptor also has the following optional keys:

|Key|Description|Default|
|---|---|---|
| Value | The value associated with the property.| undefined |
| writable| true or false. true if and only if the value associated with the property may be changed with an assignment operator.| false |

An accessor descriptor also has the following optional keys:

|Key|Description|Default|
|---|---|---|
| get| A function which serves as a getter for the property, or undefined if there is no getter. The function return will be used as the value of property. The function has no parameter. | undefined |
| set| A function which serves as a setter for the property, or undefined if there is no setter. The function will receive as only argument the new value being **assigned** to the property. | undefined |

## `Object.keys()`

return: an array of a given object's **own enumerable** properties

##  `Object.getOwnPropertyNames()`

return: an array of all properties (enumerable or not) found directly upon a given object.

## `Object.getOwnPropertyDescriptors()`

return: all own property descriptors of a given object

``` javascript
Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj))
```

## `Object.preventExtensions()`

prevents new properties from ever being added to an object (i.e. prevents future extensions to the object).

## `Object.seal()`

Sealing an object prevents new properties from being added and marks all existing properties as non-configurable

`Object.seal(obj)` 可修改已存在的 property，但不能用 delete property/或重新设置 descriptor，不能给 obj 增加新 property。

## `Object.freeze()`

prevents new properties from being added to it; prevents existing properties from being removed; and prevents existing properties, or their enumerability, configurability, or writability, from being changed. The method returns the object being frozen.

`Object.isFrozen(obj)` true

## `Object.is()`

``` javascript
+0 === -0 // true
Object.is(+0, -0) // false
Object.is(1, '1') // false
Object.is(NaN,NaN) // true
Object.is(NaN, 0/0) // true
Object.is({},{}) // false
```

## `Object.setPrototypeOf()`

``` javascript
Object.setPrototypeOf(B.prototype, A.prototype);
// 等同于
B.prototype.__proto__ = A.prototype;
```

## `Object.getPrototypeOf()`

`Object.getPrototypeOf(obj)`

``` javascript
var person = { age: 12 }
var anotherPerson = Object.create(person)
console.log(Object.getPrototypeOf(anotherPerson) === person) // true
```

## `{}.isPrototypeOf()`

`prototypeObj.isPrototypeOf(obj)`

- return: Boolean

``` javascript
var person = { age: 12 }
var anotherPerson = Object.create(person)
console.log(person.isPrototypeOf(anotherPerson)) // true
```

## `{}.hasOwnProperty()`

`obj.hasOwnProperty(prop)`

- prop: String or Symbol
- return: Boolean
