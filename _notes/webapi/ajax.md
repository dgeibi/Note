---
title: Ajax
---

https://github.com/developit/unfetch/blob/master/src/index.js

## XHR

默认情况下，在发送 XHR 请求的同时，还会发送下列头部信息：

* Accept: 浏览器能够处理的内容类型
* Accept-Charset: 浏览器能够显示的字符集
* Accept-Encoding: 浏览器能够处理的压缩编码
* Accept-Language: 浏览器当前设置的语言
* Cookie: 当前页面设置的任何 Cookie
* Host：发出请求的页面所在的域
* Referer：发出请求的页面的 URL
* User-Agent: 浏览器的用户代理字符串

https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/getAllResponseHeaders

```js
var xhr = new XMLHttpRequest();

/*xhr.open(httpMethod,url, async = true)*/
xhr.open("GET", filepath, true);

xhr.onload = function onload(event) {
  // xhr.responseText
  // xhr.response
  // xhr.status
  // xhr.statusText
  // xhr.responseURL
  // xhr.getResponseHeader(headerName)
  // xhr.getAllResponseHeaders()
};

xhr.onerror = function onerror(error) {
  // handle error
};
// xhr.setRequestHeader(header, value);

// if cors
// xhr.withCredentials = true;

/* xhr.send(data) */
xhr.send(null);

if (needCancel) {
  xhr.abort();
}

// upload property https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload
```

## `Credentials`

Credentials are HTTP cookies, TLS client certificates, and authentication entries (for HTTP authentication). [COOKIES][tls] [HTTP-AUTH]

https://fetch.spec.whatwg.org/#credentials

```js
fetch(url, {
  credentials: "omit"
});
```

`fetch` 请求默认不带 cookie 等内容即使符合同域。
