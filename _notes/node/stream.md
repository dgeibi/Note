---
title: Stream
hide: true
---

所有的 stream 都是 EventEmitter 的实例。

- Writable
- Readable
- Deplex：双工
- Transform：双工，可修改数据？

## Object Mode

所有 Node.js API 创建的 Stream 仅仅操作 string 和 Buffer。选项 `objectMode` 为 true 的 Stream 可以进入 Object Mode，这样 stream 可以用来操作其它类型的值。

## Buffering

Get Buffer

- `writable._writableState.getBuffer()`
- `readable._readableState.buffer`

buffer 的大小取决于被传给 Stream 构造函数的 `highWaterMark` 选项

对于普通 Stream，highWaterMark 是所占字节数；对于 object mode 的 Stream，highWaterMark 是项目总数。

Readable:

- [stream.push(chunk)][push]：将 `chunk` 存入内部 buffer
- [stream.read()][read]：消耗(consume) buffer
- 当内部 buffer 的总大小达到 `highWaterMark`，stream 暂停读取数据，直到数据开始被消耗。

Writable:

- [stream.write(chunk)][write]：将 `chunk` 写入内部 buffer
- 当内部 buffer 大小小于 `highWaterMark`，write 返回 true，否则返回 false

Stream API 的核心目标是限制单个数据的大小，使不同速度的源和目标不会因为内存太小而挂掉。

Duplex 和 Transform 是 Readable 也是 Writable。两者都有单独的两个内部 buffer。两端允许独立地操作，高效地利用 Stream。

## Writable


### Events

- 'close': 没有更多的计算
- 'drain': 在 [stream.write(chunk)][write] 返回 false 之后，如果再次适合写入时触发。
- 'finish': [stream.end()][end] 之后触发，且所有数据均已发送给底层系统
- 'pipe': readable.pipe(writable) 之后触发
- 'unpipe': readable.unpipe(writable) 之后触发

<!--

### writable.cork()

The writable.cork() method forces all written data to be buffered in memory. The buffered data will be flushed when either the stream.uncork() or stream.end() methods are called.

The primary intent of writable.cork() is to avoid a situation where writing many small chunks of data to a stream do not cause a backup in the internal buffer that would have an adverse impact on performance. In such situations, implementations that implement the writable._writev() method can perform buffered writes in a more optimized manner.

### writable.uncork()

The writable.uncork() method flushes all data buffered since stream.cork() was called.

When using writable.cork() and writable.uncork() to manage the buffering of writes to a stream, it is recommended that calls to writable.uncork() be deferred using process.nextTick(). Doing so allows batching of all writable.write() calls that occur within a given Node.js event loop phase.


If the writable.cork() method is called multiple times on a stream, the same number of calls to writable.uncork() must be called to flush the buffered data.


```
stream.cork();
stream.write('some ');
stream.cork();
stream.write('data ');
process.nextTick(() => {
  stream.uncork();
  // The data will not be flushed until uncork() is called a second time.
  stream.uncork();
});
```

-->

### writable.end([chunk][,encoding][,callback])

- chunk: `<string>` | `<Buffer>` | `<any>` (not null): in object mode
- encoding: `<string>`, if chunk is a string
- callback: When 'finish' event emit.

### writable.write(chunk[,encoding][,callback])

- chunk: `<string>` | `<Buffer>` | `<any>` (not null): in object mode
- encoding: `<string>`, if chunk is a string
- callback: `(err) => { }`, when chunk is flushed.
- Returns: <Boolean>, whether highWaterMark < size
如果可以根据需要生成或取得要写入的数据，建议将逻辑封装为一个 Readable 并使用 [readable.pipe()][pipe]

## Readable

### 两种模式

1. flowing: 尽可能快地接收数据。使用 'data' 事件或 [readable.pipe()][pipe]
2. paused: 只允许使用 stream.read() 读取数据

所有的 readable 初始模式是 paused。

进入 flowing 模式的方法：

- 添加 'data' 事件
- 调用 stream.resume()
- 调用 [readable.pipe()][pipe]

回到 paused 模式的方法：

- stream.pause()
- stream.unpipe()

在 flowing 模式下，消费者不处理数据，数据会丢失。

### 三种状态

`readable._readableState.flowing` :

- `null`: 不产生数据
- `false`: pause(), unpipe() 之后
- `true`: flowing

建议只使用一种模式。

### Events

- 'close': Indicates that no more events will be emitted. Not all Readable streams will emit the 'close' event.
- 'data':  `(chunk) => { }` chunk: Buffer | String | any
- 'end': 没有更多 chunk 可供消耗
- 'error'
- 'readable': Indicates that the stream has new information: either new data is available or the end of the stream has been reached.

### readable.isPaused()

- Returns: `<boolean>`, whether is paused.

### readable.pause()

- Returns: this

### readable.pipe(destination[, options])

- destination: `<stream.Writable>`
- options: `<Object>`
    - end: `<boolean>`, whether end the writable when the reader ends. Defaults to true.
- Returns a reference to the destination stream making it possible to set up chains of piped streams.

process.stderr / process.stdout 永不关闭，不管 options

如果 readable 发射一个 error 事件，destination 不会自动关闭，有必要手动关闭所有 stream 以免内存泄漏。

### readable.read([size])

- size: `<number>` Optional argument to specify how much data to read.
- Returns: `<string>` | `<Buffer>` | `<null>`

### readable.resume()

- Returns: this

### readable.setEncoding(encoding)

- encoding: `<string>` The encoding to use.
- Returns: this

``` javascript
const readable = getReadableStreamSomehow();
readable.setEncoding('utf8');
readable.on('data', (chunk) => {
  assert.equal(typeof chunk, 'string');
  console.log('got %d characters of string data', chunk.length);
});
```

### readable.unpipe([destination])

- destination: `<stream.Writable>` Optional specific stream to unpipe

If the destination is not specified, then all pipes are detached.

If the destination is specified, but no pipe is set up for it, then the method does nothing.

unpipe 后需要手动停止 destination 流。

### readable.push(chunk[,encoding])


### readable.unshift(chunk)

不要在 read() 过程中 unshift。

## 实现一个 Writable

自定义可写流必须调用 `new stream.Writable([options])` 并实现 `writable._write()`，`writable._writev()` 也许也要实现。

### new stream.Writable([options])

- `options`: `<Object`
    - `highWaterMark`: `<number>`
    - `decodeStrings`: `<boolean>`, 是否在传给 `stream._write()` 前，将字符串解码为 Buffers. 默认为 `true`
    - `objectMode`: `<boolean>`, 是否进入 Object Mode，默认为 `false`
    - `write`: `<Funciton`，`stream._write()` 的实现
    - `wirtev`: `<Funciton`，`stream._writev()` 的实现

``` javascript
const Writable = require('stream').Writable;

class MyWritable extends Writable {
  constructor(options) {
    // Calls the stream.Writable() constructor
    super(options);
  }
}
```

Simplified Constructor

``` javascript
const Writable = require('stream').Writable;

const myWritable = new Writable({
  write(chunk, encoding, callback) {
    // ...
  },
  writev(chunks, callback) {
    // ...
  }
});
```

### writable._write(chunk, encoding, callback)

- `chunk`: `<Buffer>` | `<string>` | `<any>` The chunk to be written.
- `encoding`: if the chunk is a string, then encoding is the character encoding of that string.
- callback: `<Function>`, Call this function (optionally with an error argument) when processing is complete for the supplied chunk.

``` javascript
const Writable = require('stream').Writable;

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) {
      callback(new Error('chunk is invalid')); // emit 'error' event
    } else {
      callback();
    }
  }
}
```

### writable._writev(chunks, callback)

- `chunks`: `<Array>` The chunks to be written. Each chunk has following format: `{ chunk: ..., encoding: ... }`
- `callback`: `<Function>` A callback function (optionally with an error argument) to be invoked when processing is complete for the supplied chunks.

[write]: #streamwritechunk
[push]: #streampushchunk
[read]: #streamread
[end]: #streamendchunk
[pipe]: #streampipe

## 实现一个 Readable

### new stream.Readable([options])

- `options`:
    - `highWaterMark`: `<number>`
    - `encoding`: `<string>`
    - `objectMode`: `<boolean>`
    - `read`: `<Function>`, `stream._read()` 的实现

### readable._read(size)

- `size`

### readable.push(chunk[, encoding])

- `chunk`: `<number`
- `encoding`
- Returns `<boolean>`
