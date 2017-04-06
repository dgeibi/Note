---
title: 变量
---

http://linux.vbird.org/linux_basic/0320bash.php

## 声明变量

### 直接赋值

```shell
name=value # 定义一个变量叫name，其值为value
export name # 使变量变成环境变量，环境变量可以理解为全局变量
export name=value
```

```shell
PATH=${PATH}:/home/bin # 变量后面添加 `:/home/bin`
```

### declare

```bash
declare [-aixr] variable
```

选项与参数：

* -a  ：将后面名为 variable 的变数定义成为阵列 (array) 类型
* -i  ：将后面名为 variable 的变数定义成为整数数字 (integer) 类型
* -x  ：用法与 export 一样，就是将后面的 variable 变成环境变数
* -r  ：将变数设定成为 readonly 类型，该变数不可被更改内容，也不能 unset

把 - 改成 + 可以取消

## 取消变量声明

```shell
unset var-name
```

## 获取命令输出的值

```shell
value1="$(command)"
value2=\`command\`
```

## read：从用户输入给变量赋值

```
read [-p "提示的文字"] [-t 等待时间] 变量
```

## shell script 参数

```
./script.sh Hello World
sh script.sh Hello World
```

```
$0 = script.sh
$1 = Hello
$2 = World
```
