---
title: Useful Tools
---

## man

```shell
man command
```

##  passwd


```shell
passwd root #修改 root 密码
```

## sudo
```shell

sudo bash -c 'command line && command line'
sudo -i
```

## hash

```shell
md5sum  filename
sha256sum filename
sha1sum filename
```

## cp

```shell
cp file1 dir1   #复制 file1 到 dir1 下         
cp a b          #将文档 a 复制成 b             
cp -r dir1 dir2 #将目录 dir1 整个复制到 dir2 下
```

## rm

```shell
rm -rf dir # 删除目录    
rm -f file # 强制删除文件
```

## rename

```shell
rename a b a        # 将 a 重命名为 b          
rename "s/AA/aa/" * # 把文件名中的 AA 替换成 aa
```

## mv

```shell
mv file1 file2       #将 a 重命名为 b              
mv file1 file2 dir/  #把 file1、file2 移动到 dir 下
```

## chmod

|chmod|Descriptions|
|-------|---------------|
|chmod a+r file|	对file的所有用户增加读权限|
|chmod a-x file|	对file的所有用户删除执行权限|
|chmod u=rw,go= file	|对file的所有者设置读写权限，对file的用户组和其他用户清空所有权限|
|chmod -R 755 */path/*|递归处理，将指令目录下的所有文件及子目录一并处理|


|r--|-w-|--x|rw-|r-x|-wx|rwx|
|-|-|-|-|-|-|-|-|
|4|2|1|6|5|3|7|

|Reference|	Class|	Description|
|---|---|---|
|u|	user|	the owner of the file|
|g|	group|	users who are members of the file's group|
|o|	others|	users who are neither the owner of the file nor members of the file's group|
|a|	all|	all three of the above, same as ugo|


chown (change user ownership)
chgrp (change group ownership)

[-R] 递归选项
