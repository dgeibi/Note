---
title: 继承
---

## 原型链继承

```javascript
function SuperType() {
  this.property = true
}

SuperType.prototype.getSuperValue = function getSuperValue() {
  return this.property
}

function SubType() {
  this.subproperty = false
}

SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType

SubType.prototype.getSubValue = function getSubValue() {
  return this.subproperty
}

const instance = new SubType()
console.log(instance.getSuperValue()) // true
console.log(Object.keys(instance)) // [ 'subproperty' ]
instance.property = false
console.log(Object.keys(instance)) // [ 'subproperty', 'property' ]
console.log(instance.getSuperValue()) // false
console.log(instance instanceof SubType) // true
console.log(instance instanceof SuperType) // true
console.log(Object.prototype.isPrototypeOf.call(SubType.prototype, instance)) // true
console.log(Object.prototype.isPrototypeOf.call(SuperType.prototype, instance)) // true
console.log(Object.getPrototypeOf(instance)) // SubType
```

上面的例子并没有在实例上直接的执行 SuperType 的构造函数，property 并不属于 instance。

## 调用父类的构造函数

如果能在 SubType 构造函数执行之前执行 SuperType 的构造函数，可以解决。

```javascript
function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function sayName() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType() // SubType.prototype.__proto__ -> SuperType.prototype
SubType.prototype.constructor = SubType
SubType.prototype.sayAge = function SayAge() {
  console.log(this.age)
}

const instance = new SubType('who', 17)
console.log(Object.keys(instance)) // [ 'name', 'colors', 'age' ]
instance.sayAge() // 17
instance.sayName() // who
console.log(instance instanceof SubType) // true
console.log(instance instanceof SuperType) // true
console.log(Object.prototype.isPrototypeOf.call(SubType.prototype, instance)) // true
console.log(Object.prototype.isPrototypeOf.call(SuperType.prototype, instance)) // true
```

然而，这种方法有个问题，构造函数 SuperType 被执行了两次，实例本身已经有 name 和 colors 属性了，所以 SubType.prototype.name 和 SubType.prototype.colors 是多余的。在设置 SubType 的prototype 时，若能够创建一个原型 SuperType.prototype 的对象，是但不执行构造函数 SuperType 就好了。

## 如何创建指定原型的对象？

`createObject(proto)` 表示创建原型对象是 `proto` 的对象。

定义如下

```javascript
function createObject(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
var person = {
    name: "a",
    friends: ["b", "c", "d"]
}

var person1 = createObject(person);
person1.friends = ["c"]
```

person1 的原型对象是 person。

注意：操作 `person1.friends[1] = 'aa'` 相当于 `person1.__proto__.friends[1] = 'aa'`，所以 `person.friends[1] === 'aa'`。

ES5 中的 `Object.create()` 与 `createObject()` 相似。

## 差不多的版本

```javascript
function inheritPrototype(subType, superType) {
  subType.prototype = Object.create(superType.prototype)
  subType.prototype.constructor = subType
}

function SuperType(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function sayName() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name)
  this.age = age
}

inheritPrototype(SubType, SuperType)

SubType.prototype.sayAge = function sayAge() {
  console.log(this.age)
}

const instance = new SubType('who', 17)
instance.sayAge() // 17
instance.sayName() // who
console.log(instance instanceof SubType) // true
console.log(instance instanceof SuperType) // true
console.log(Object.prototype.isPrototypeOf.call(SubType.prototype, instance)) // true
console.log(Object.prototype.isPrototypeOf.call(SuperType.prototype, instance)) // true
```

## 更多

[Class](/ecmascript/class.html#extends)
