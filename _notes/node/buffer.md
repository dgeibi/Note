---
title: Buffer
---

Now that TypedArray has been added in ES6, the Buffer class implements the Uint8Array API in a manner that is more optimized and suitable for Node.js' use cases.

buffer 的单位是1字节

## Buffer.from(), Buffer.alloc(), and Buffer.allocUnsafe()

- `new Buffer(10)` 这样返回的 Buffer 的数据是不确定的，语义含糊，所以该操作是不被推荐的。
- 传入 string/array/Buffer 作为第一个参数，该参数数据的拷贝被分配给新的 Buffer 实例，返回该实例。
- 传入一个 ArrayBuffer 实例返回和它共用内存的一个 Buffer 实例。

Buffer.from(array) array 的拷贝被分配给新的 Buffer 实例，返回该实例。

Buffer.from(arrayBuffer[, byteOffset [, length]]) 返回和 arrayBuffer 共用内存的一个 Buffer 实例。

Buffer.from(buffer) buffer 的拷贝被分配给新的 Buffer 实例，返回该实例。

Buffer.from(string[, encoding]) string 的拷贝被分配给新的 Buffer 实例，返回该实例。

Buffer.alloc(size[, fill[, encoding]]) 返回一个 size 字节的，已经初始化的 Buffer 实例。

Buffer.allocUnsafe(size) 返回一个 size 字节的，未初始化的 Buffer 实例，刚创建的 buffer 的内存是未知的，可能含有敏感数据？。

Buffer.allocUnsafeSlow(size) 和 Buffer.allocUnsafe 一样都创建未初始化的 buffer，但是。。？

Buffer.allocUnsafe() 返回的 buffer 如果大小 ≦ Math.floor(Buffer.poolSize/2)，那么分配给它的内存是在一个内部共享内存池（shared internal memory pool）里，这里的 pool 是预分配的（pre-allocated）。而 Buffer.allocUnsafeSlow() 绝对不会使用 pool 的空间。Buffer.alloc()也不会使用 pool 的空间，所以 Buffer.alloc(size, fill) 和 Buffer.allocUnsafe(size).fill(fill) 也存在区别。

Buffer.allocUnsafe 在需要创建多个独立的和持久（Persistent）的 buffer 的情况下，可以避免垃圾回收机制带来的不必要的跟踪（track）和清除（cleanup）。

然而，分配出来的 buffer 不一定需要一直使用，这种情况下，也许在 pool 外请求内存会更合适。

例如：

``` javascript
// Need to keep around a few small chunks of memory
const store = [];

socket.on('readable', () => {
  const data = socket.read();

  // Allocate for retained data
  const sb = Buffer.allocUnsafeSlow(10);

  // Copy the data into the new allocation
  data.copy(sb, 0, 0, 10);

  store.push(sb);
});
```

然而，这应该是开发者观察到内存泄漏后进行优化的最后手段。
