---
title: 重定向
---

`>` 与 `1>` 等价，表示“重定向标准输出 (STDOUT)”，`2>` 表示“重定向标准错误 (STDERR)”；`2>&1` 表示“重定向标准错误到标准输出的目标”。

## 重定向标准输出和标准错误

```bash
command &> file
```

忽略错误

```shell
command > /dev/null 2>&1
command &> /dev/null #这样更简单
```

## String to STDIN

```bash
command <<< "string to be read as standard input"
```

Example:

```bash
sed 's/bar//' <<< 'foobarbar'
#foobar
```

## STDOUT to String

```shell
value1="$(command)"
value2=\`command\`
```
