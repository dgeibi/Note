---
title: history
---

## history

```shell
history [n] #列出最近的 n 笔命令列表
history -c  #将目前的 shell 中的所有 history 内容全部消除
history -raw histfiles
```

参数：

- -a：将目前新增的 history 指令新增入 histfiles 中，若没有加 histfiles ，则预设写入 ~/.bash_history
- -r：将 histfiles 的内容读到目前这个 shell 的 history 记忆中；
- -w：将目前的 history 记忆内容写入 histfiles 中！


## 感叹号

```shell
!number  #执行第几笔指令的意思；
!command #找到最近的开头为 `command` 的那个指令，并执行；
!!       #执行上一个指令 (相当于按↑按键后，按 Enter)
```
