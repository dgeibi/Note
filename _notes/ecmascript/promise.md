---
title: Promise
---

## Promise 对象是什么？

Promise 是一种控制流抽象。

Promise 对象代表一个现在/未来的一个值，或者什么都不是。

Promise 有 3 种状态：

- pending：初始值
- fulfilled：promise 表示的操作成功完成
- rejected：promise 表示的操作失败

可以用 `Promise` 创建一个 promise 对象

``` javascript
function getJSON(url) {
  if(typeof url !== 'string') throw Error('should pass a string')
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = () => {
      if (request.status >= 200 && request.status < 300 || request.status === 304) {
        const data = JSON.parse(request.responseText)
        if (typeof data === 'string') resolve(data)
      } else {
        reject(Error(`JSON didn't load successfully; error code:${request.statusText}`))
      }
    }
    request.onerror = () => {
      reject(Error('There was a network error.'))
    }
    request.send()
  })
}
```

## promise.then, promise.catch

Promise 操作完成后，结果会缓存起来，随时可通过 then 取得结果。

通过 then 指定 fulfilled 后进行的操作，catch 指定 rejected 后的错误处理。两个方法的返回值是新的 promise。

如果传递给 then 的第一个参数的是一个返回 promise 的函数，那么下一个 then 将在该 promise 完成后的返回值（resolve 的值）将传给下一个 then 的第一个参数，如果传递给 then 的第一个参数的不是一个返回 promise 的函数，该函数的返回值则返回值将传给下一个 then 的第一个参数。（注意不是立即传递）。

假设没有 then 的第二参数。catch 方法接收一个回调函数，当 catch 前面的 promise 失败时，会跳过所有的所有 then 的第一个回调，将 error 传给第一个 catch，如果 catch 也失败传给下一个 catch。

``` javascript
promise
  .then(() => asyncFunction())
  .then(value => value.toLowerCase())
```

then 的第二参数是什么？

``` javascript
promise.then(
    null,
    error => { /* rejection */ })

// 等价
promise.catch(
    error => { /* rejection */ })
```

``` javascript
asyncFunction()
  .then(handler1)
  .then(handler2, errorHandler) // (A)
```

在（A）中当 handler2 抛出错误，并不会给 errorHander 处理。

正确的方式应该是

``` javascript
asyncFunction()
  .then(handler1)
  .then(handler2)
  .catch(errorHandler)
```

## 其它创建 Promise 的方式

### Promise.resolve()

多数情况下，返回一个结果为 x 的 Promise

``` javascript
Promise.resolve('x').then(x => console.log(x))
// x
```

如果参数为 Promise，则返回该 Promise
```javascript
const p = Promise.resolve('x')
console.log(Promise.resolve(p) === p)
// true
```

如果参数是 thenable 的对象，转化为对应的一个 Promise

``` javascript
const thenable = {
  then(onFulfilled) {
    onFulfilled('o_0')
  },
}
const promise = Promise.resolve(thenable)
console.log(promise instanceof Promise) // true
promise.then(console.log) // o_0
```

### Promise.reject()

``` javascript
Promise.reject(Error('oops')).catch(console.error)
// Error: oops
```

## 错误处理

有两种错误（Error）：
Operational errors：
 Programmer errors：比如传入的参数类型错了等等，应该尽快抛出错误。
