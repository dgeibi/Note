---
title: Media Element
---

## Usage

媒体元素包括 `<video>` `<audio>`

```html
<video src="videofile.ogg">Video player not available.</video>
<audio src="song.mp3">Audio player not available.</audio>
```

指定不同来源：

```html
<video id="myVideo">
    <source src="conference.webm" type="video/webm; codecs='vp8, vorbis'">
    <source src="conference.ogv"  type="video/ogg; codecs='theora, vorbis'">
        Video player not available.
</video>
```


## Attributes

[HTMLMediaElement - Web APIs \| MDN](https://developer.mozilla.org/en/docs/Web/API/HTMLMediaElement)

## Media Events

[HTML Standard](https://html.spec.whatwg.org/multipage/embedded-content.html#mediaevents)

* loadstart：下载已开始
* progress：正在下载
* suspend：当前有意的不获取数据
* abort：下载中断
* error：下载期间发生网络错误
* emptied：网络连接已经关闭
* stalled：浏览器尝试下载，但未收到数据
* loadedmetadata：元数据已加载完毕
* loadeddata：第一帧已加载
* canplay：可以播放时；readyState 值为 2
* canplaythrough：播放可继续；readState 值为 3
* canshowcurrentframe：当前帧已经下载完成；readState 值为 1
* playing：实际开始播放
* play：接收到开始播放的指令
* waiting：播放暂停，等待下载更多数据
* seeking：正在移动到新位置
* seeked：找到新位置
* ended：停止播放，已播放到末尾
* durationchange：duration 的值改变
* timeupdate：currentTime 被不合理或意外的方式更新
* pause：播放已停止
* ratechange：播放速度改变
* resize：videoWidth/videoHeight 的值已改变
* volumechange：volume/muted 的值已改变
