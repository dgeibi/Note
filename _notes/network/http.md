---
title: HTTP
---

## HTTP 请求方法

### GET

获取数据

### HEAD

请求一个与 GET 请求的响应相同的响应，但没有响应体

### POST

向指定资源提交数据，请求服务器进行处理（例如提交表单或者上传文件）。数据被包含在请求本文中。这个请求可能会创建新的资源或修改现有资源，或二者皆有。

### OPTIONS

这个方法可使服务器传回该资源所支持的所有 HTTP 请求方法。用'\*'来代替资源名称，向 Web 服务器发送 OPTIONS 请求，可以测试服务器功能是否正常运作。

### PUT

向指定资源位置上传其最新内容（Idempotent 幂等）（Successful response has no body）

### DELETE

请求服务器删除 Request-URI 所标识的资源。

### TRACE

回显服务器收到的请求，主要用于测试或诊断。

## Safe

判定标准：是否产生副作用

* safe methods: GET, HEAD, OPTIONS
* unsafe methods: PUT, DELETE, POST

## HTTP 状态返回码

### 200 OK

请求已成功，请求所希望的响应头或数据体将随此响应返回。实际的响应将取决于所使用的请求方法。在 GET 请求中，响应将包含与请求的资源相对应的实体。在 POST 请求中，响应将包含描述或操作结果的实体。

### 204 No Content

服务器成功处理了请求，没有返回任何内容。

### 206 Partial Content

服务器已经成功处理了部分 GET 请求。类似于 FlashGet 或者迅雷这类的 HTTP 下载工具都是使用此类响应实现断点续传或者将一个大文档分解为多个下载段同时下载。

### 301 Moved Permanently

永久重定向，POST->GET

如果这不是一个 GET 或者 HEAD 请求，因此浏览器禁止自动进行重定向，除非得到用户的确认，因为请求的条件可能因此发生变化。注意：对于某些使用 HTTP/1.0 协议的浏览器，当它们发送的 POST 请求得到了一个 301 响应的话，接下来的重定向请求将会变成 GET 方式。

### 302 Found

临时重定向，POST->GET

由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求。只有在 Cache-Control 或 Expires 中进行了指定的情况下，这个响应才是可缓存的。

很多现存的浏览器将 302 响应视作为 303 响应，并且使用 GET 方式访问在 Location 中规定的 URI，而无视原先请求的方法。

### 303 See Other

临时重定向，标准的 POST->GET

对应当前请求的响应可以在另一个 URI 上被找到，当响应于 POST（或 PUT / DELETE）接收到响应时，客户端应该假定服务器已经收到数据，并且应该使用单独的 GET 消息发出重定向。同时，303 响应禁止被缓存。当然，第二个请求（重定向）可能被缓存。

### 304 Not Modified

不需要传输请求的资源，暗示使用了 GET/HEAD 的请求方法和 If-Modified-Since 或 If-None-Match 的请求首部。

### 307 Temporary Redirect

临时重定向，标准的 POST->POST

与 302 重定向有所区别的地方在于，收到 307 响应码后，客户端应保持请求方法不变向新的地址发出请求

### 308 Permanent Redirect

永久重定向，标准的 POST->POST

307 和 308 重复 302 和 301 的行为，但不允许 HTTP 方法更改

### 400 Bad Request

请求错误太明显

### 401 Unauthorized

类似于 403 Forbidden，401 语义即“未认证”，即用户没有必要的凭据。

### 403 Forbidden

服务器已经理解请求，但是拒绝执行它。身份验证不是拒绝的原因，这个请求也不应该被重复提交，如果请求方法不是 HEAD，带上原因

### 404 Not Found

请求失败，请求所希望得到的资源未被在服务器上发现，但允许用户的后续请求。[35]没有信息能够告诉用户这个状况到底是暂时的还是永久的。

### 412 Precondition Failed

服务器在验证在请求的头字段中给出先决条件时，没能满足其中的一个或多个。

### 500 Internal Server Error

通用错误消息，服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。没有给出具体错误信息。

### 503 Service Unavailable

由于临时的服务器维护或者过载，服务器当前无法处理请求。这个状况是暂时的，并且将在一段时间以后恢复。如果能够预计延迟时间，那么响应中可以包含一个 Retry-After 头用以标明这个延迟时间。如果没有给出这个 Retry-After 信息，那么客户端应当以处理 500 响应的方式处理它。

## HTTP 头字段

### 重复

```
Cache-Control: no-cache, no-store
```

相当于，注意相应的顺序

```
Cache-Control: no-cache
Cache-Control: no-store
```

### `If-Modified-Since`

浏览器有副本，如果服务器资源修改了，则传输；否则，304

### `If-Unmodified-Since`

如果服务器资源修改了，则 412；否则，继续传输

用于：

* 与 POST 等不安全的方法一起用，乐观并发控制（版本冲突检测）
* 与带`If-Range`的请求一起用，确保请求的新片段来自未修改的文档。

## HTTP Cache

优先级：`Pragma` > `Cache-Control` > `Expires`

### `Pragma`

`Pragma: no-cache` Same as `Cache-Control: no-cache`

Pragma 的优先级是高于 Cache-Control

### `Expires`

`Expires` 头指定了一个日期/时间， 在这个日期/时间之后，HTTP 响应被认为是过时的。和`max-age`指令作用类似。

如果设置了`max-age`或者`s-max-age`指令的 Cache-Control 响应头，那么 `Expires` 头就会被忽略。

如果客户端和服务器的时间差距很大，`Expires`就没什么用了。

### `Cache-Control`

#### response header

* `public`：共有缓存，UA，代理服务器可缓存
* `private`：私有缓存，UA 可缓存
* `no-store`：不保存请求和响应缓存
* `no-cache`：告诉浏览器、缓存服务器，不管本地副本是否过期，使用资源副本前，**一定**要到**源服务器**进行副本有效性校验。和 response `max-age=0, must-revalidate` 效果一样。
* `must-revalidate`：告诉浏览器、缓存服务器，本地副本过期前，可以使用本地副本；本地副本一旦过期，**必须**去**源服务器**进行有效性校验。
* `s-max-age`: 仅应用在共有缓存，保持新鲜的最大时间，优先级高于 `max-age`
* `max-age`: 保持新鲜的最大时间
* `max-age=0`：告诉浏览器、缓存服务器，使用资源副本前，应该进行副本有效性校验。

#### request header

* `no-cache`：(end-to-end reload) 忽略所有缓存，重新从源服务器获取新副本（chrome ctrl+刷新，页面所有资源请求可以触发）
* `max-age=0`:（end-to-end revalidation）一路一直验证有效性直到源服务器（chrome 点击页面刷新，页面 HTML 可以触发）

### ETag

作为缓存的一种强校验器，ETag 响应头是一个对用户代理 UA 不透明的值。对于像浏览器这样的 HTTP UA，不知道 ETag 代表什么，不能预测它的值是多少。如果资源请求的响应头里含有 ETag, 客户端可以在后续的请求的头中带上 If-None-Match 头来验证缓存。

### Last-Modified

Last-Modified 响应头可以作为一种弱校验器。说它弱是因为它只能精确到一秒。如果响应头里含有这个信息，客户端可以在后续的请求中带上 If-Modified-Since 来验证缓存。

## 参考资料

* [HTTP状态码 - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/HTTP%E7%8A%B6%E6%80%81%E7%A0%81)
* [web性能优化之：no-cache与must-revalidate深入探究 - 程序猿小卡](http://www.cnblogs.com/chyingp/p/no-cache-vs-must-revalidate.html)
* [HTTP缓存控制小结 - 腾讯Web前端 IMWeb 团队社区](http://imweb.io/topic/5795dcb6fb312541492eda8c)
* [http - What's the difference between Cache-Control: max-age=0 and no-cache? - Stack Overflow](https://stackoverflow.com/questions/1046966/whats-the-difference-between-cache-control-max-age-0-and-no-cache)
* [Safe - Glossary | MDN](https://developer.mozilla.org/en-US/docs/Glossary/safe)
* [HTTP request methods - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
* [If-Unmodified-Since - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Unmodified-Since)
* [Are Duplicate HTTP Response Headers acceptable? - Stack Overflow](https://stackoverflow.com/questions/4371328/are-duplicate-http-response-headers-acceptable)