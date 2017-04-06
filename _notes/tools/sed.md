---
title: sed
---

## \\L 和 \\U

```shell
# 将匹配部分转换为小写
echo 'subpath: Color' | sed 's/subpath:.*/\L\0/'
# subpath: color

echo 'subpath: Color' | sed 's/subpath:.*/\U\0/'
# SUBPATH: COLOR
```
