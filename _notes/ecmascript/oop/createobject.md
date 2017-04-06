---
title: 创建对象
---

## new 操作符的作用

见 [Operator - ECMAScript](/ecmascript/operator.html#new)

## 工厂模式

```javascript
function createPerson(name, age, job) {
    var o = new Object();
    o.age = age;
    o.job = job;
    o.name = name;
    return o;
}

var person1 = createPerson("ff", 12, "student");
```

## 构造函数模式

```javascript
function Person(name) {
    this.name = name;
}

var person1 = new Person("XiaoMing");
```

缺点：构造函数定义函数浪费空间，不变的变量声明浪费空间。

## 原型模式

函数在创建时就有 `Prototype` 的属性，可以称之为原型对象。

利用 new 创建构造函数的实例时，实例对象有一个内部属性 `[[Prototype]]` 指向原型对象。

```javascript
function Person() {
}

Person.prototype.name = "XiaoMing";
Person.prototype.course = ["math", "chinese"] ;

var person1 = new Person();
var person2 = new Person();

person1.name = "Mike";
console.log(person1.name); // Mike // 屏蔽了
console.log(person2.name); // XiaoMing

person1.course.push("english");
console.log(person1.course); //["math", "chinese", "english"]
console.log(person2.course); //["math", "chinese", "english"]
```

缺点：

1. 继承自原型对象的属性是共享的, 引用类型指向的内存地址不变导致反直觉的结果。
1. 初始化不方便。

## 组合使用构造函数和原型

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getname = function() {
    console.log(this.name);
}
var person1 = new Person("Ben", 24);
person1.getname(); // Ben
```

## 其它

[创建指定原型的对象](/ecmascript/oop/inheritance.html#如何创建指定原型的对象？)
