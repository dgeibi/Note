---
title: Class
---

## expression

``` javascript
class A {}
// =
let A = class {}
```

## creation
``` javascript
class Cat {
    constructor(id) {
        this.id = id;
    }
    miao() {
        console.log(this.id)
    }
}

console.log(new Cat(111).miao === Cat.prototype.miao) //true
```

``` javascript
typeof class {} === 'function'
```

ES7:

``` javascript
class App extends React.Component {
  state = {
    value: 0
  };
}
// =

class App extends React.Component {
    constructor() {
        this.state = {
            value: 0
        }
    }
}
```
## accessors

``` javascript
class MyAccount {
  get balance() { return this.amount; }
  set balance(amount) { this.amount = amount; }
}

const account = new MyAccount();
account.balance = 23;
assert.equal(account.balance, 23);
```

## dynamic method name

``` javascript
const propertyName = 'balance';
class MyAccount {
    get [propertyName]() { return this.amount; }
    set [propertyName](amount) { this.amount = 23; }
}

const account = new MyAccount();
account.balance = 42;
assert.equal(account.balance, 23);
```

``` javascript
const name = 'lala'
class Cat {
    [name] () {
        console.log('miao')
    }
}
new Cat().lala() // miao
```

## static

``` javascript
class Cat {
    static miao() {
        console.log('miao')
    }
    static value = 0
}
var cat = new Cat()
cat.miao // undefined
Cat.miao() // miao
Cat.value // 0
```

## extends

``` javascript
class A {}
class B extends A {}
class C extends B {}

let instance = new C();
instance // C()
instance.__proto__ // B()
instance.__proto__.__proto__ // A()

C.prototype // B()
B.prototype // A()
A.prototype // Object()
```

``` javascript
class NullClass extends null {}
Object.getPrototypeOf(NullClass.prototype) // null
let nullInstance = new NullClass();
// VM487:1 Uncaught TypeError: function is not a function
```

## super

```  javascript
class A {hasSuper() { return true; }}
class B extends A {hasSuper() { return super.hasSuper(); }}
new B().hasSuper()//true
```

``` javascript
class A {constructor() { this.levels = 1; }}
class B extends A {
  constructor() {
    super()
    this.levels++;
  }
}

assert.equal(new B().levels, 2);
```
