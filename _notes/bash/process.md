---
title: 进程管理
---

参考：[bash - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Bash#.E8.BE.93.E5.85.A5.E8.BE.93.E5.87.BA.E9.87.8D.E5.AE.9A.E5.90.91)

批处理模式：按照顺序执行命令

```
command1 ; command2
```

当 `command1` 执行完毕，即执行 `command2`

- `&&`: and，前面的命令运行正确，后面的命令才会执行
- `||`: or，前面的命令运行出错，后面的命令才会执行
- `|` : pipe，将 `command1` 的输出流连接到 `command2` 的输入流

并发模式：

`command1` 在后台执行（通过 `&`），从而立即将控制返回到 shell，以执行 `command2`

组合键：

使用 `Ctrl+c`，取消前台运行的程序。

使用 `Ctrl+z`，挂起前台运行的程序，`fg` 将挂起的程序恢复到前台，`bg` 将挂起的程序恢复到后台。
