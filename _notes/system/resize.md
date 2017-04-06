---
title: 调整分区大小
---

原文：[用gdisk调整gpt/ext4分区大小](http://www.cnblogs.com/tanghuimin0713/p/4545001.html)

主机： CentOS release 6.4 (Final)

目的：从 /home 分区分出100G来创建新分区 /vm

参考：

- [Ryan Clouser](http://ryanclouser.com/?p=66)
- [Online resize root filesystem on a GPT partition](https://falstaff.agner.ch/2013/12/22/online-resize-root-filesystem-on-a-gpt-partition/)
- [Super User](https://superuser.com/questions/660309/live-resize-of-a-gpt-partition-on-linux)

后记：其实用 `parted` 更方便！

## 查看当前分区情况

```shell
[root@tanghuimin /]# df -Th

# Filesystem Type Size Used Avail Use% Mounted on
#
# /dev/sda3 ext4 9.7G 6.6G 2.6G 72% /
#
# tmpfs tmpfs 1.8G 280K 1.8G 1% /dev/shm
#
# /dev/sda1 ext4 426G 37G 368G 10% /home
#
# /dev/sda2 ext4 20G 4.2G 15G 23% /opt
```

/home 分区在 /dev/sda1.

## 备份分区表

- ?: 打印gdisk下命令的用法
- p: 查看分区表
- b: 备份分区表，以便后面操作失误可以恢复分区表

```shell
[root@tanghuimin ~]# gdisk /dev/sda

# GPT fdisk (gdisk) version 0.8.10
#
#
# Partition table scan:
#
# MBR: protective
#
# BSD: not present
#
# APM: not present
#
# GPT: present
#
#
# Found valid GPT with protective MBR; using GPT.
#

Command (? for help): ?

# b	back up GPT data to a file
#
# c	change a partition's name
#
# d	delete a partition
#
# i	show detailed information on a partition
#
# l	list known partition types
#
# n	add a new partition
#
# o	create a new empty GUID partition table (GPT)
#
# p	print the partition table
#
# q	quit without saving changes
#
# r	recovery and transformation options (experts only)
#
# s	sort partitions
#
# t	change a partition's type code
#
# v	verify disk
#
# w	write table to disk and exit
#
# x	extra functionality (experts only)
#
# ?	print this menu
#

Command (? for help): p

# Disk /dev/sda: 976773168 sectors, 465.8 GiB
#
# Logical sector size: 512 bytes
#
# Disk identifier (GUID): FB42D8BC-9B54-4B3B-A16C-A39A39B902FF
#
# Partition table holds up to 128 entries
#
# First usable sector is 34, last usable sector is 976773134
#
# Partitions will be aligned on 2048-sector boundaries
#
# Total free space is 2029 sectors (1014.5 KiB)
#
#
# Number Start (sector) End (sector) Size Code Name
#
# 1 2048 907141119 432.6 GiB 0700
#
# 2 907141120 948101119 19.5 GiB 0700
#
# 3 948101120 968581119 9.8 GiB EF00
#
# 4 968581120 976773119 3.9 GiB 8200

Command (? for help): b

# Enter backup filename to save: /root/gpt.sda.bak
#
# The operation has completed successfully.
```

## 卸载即将被调整的分区 /home

```shell
[root@tanghuimin ~]# umount /home/

[root@tanghuimin ~]# df -Th

# Filesystem Type Size Used Avail Use% Mounted on
#
# /dev/sda3 ext4 9.7G 6.6G 2.6G 72% /
#
# tmpfs tmpfs 1.8G 296K 1.8G 1% /dev/shm
#
# /dev/sda2 ext4 20G 4.2G 15G 23% /opt
```

## 检测文件系统错误

```shell
[root@tanghuimin ~]# e2fsck -f /dev/sda1

# e2fsck 1.41.12 (17-May-2010)
#
# Pass 1: Checking inodes, blocks, and sizes
#
# Pass 2: Checking directory structure
#
# Pass 3: Checking directory connectivity
#
# Pass 4: Checking reference counts
#
# Pass 5: Checking group summary information
#
# /dev/sda1: 268432/28352512 files (0.1% non-contiguous), 11359488/113392384 blocks
```

## 用resize2fs 调整文件系统大小

```shell
[root@tanghuimin ~]# resize2fs /dev/sda1 326G

# resize2fs 1.41.12 (17-May-2010)
#
# Resizing the filesystem on /dev/sda1 to 85458944 (4k) blocks.
#
# The filesystem on /dev/sda1 is now 85458944 blocks long.
```

## 用 gdisk 调整分区大小

先用 d 删除分区，后用 n 创建分区

```shell
[root@tanghuimin ~]# gdisk /dev/sda

# GPT fdisk (gdisk) version 0.8.10
#
#
# Partition table scan:
#
# MBR: protective
#
# BSD: not present
#
# APM: not present
#
# GPT: present
#
#
# Found valid GPT with protective MBR; using GPT.
#

Command (? for help): p

# Disk /dev/sda: 976773168 sectors, 465.8 GiB
#
# Logical sector size: 512 bytes
#
# Disk identifier (GUID): FB42D8BC-9B54-4B3B-A16C-A39A39B902FF
#
# Partition table holds up to 128 entries
#
# First usable sector is 34, last usable sector is 976773134
#
# Partitions will be aligned on 2048-sector boundaries
#
# Total free space is 2029 sectors (1014.5 KiB)
#
#
# Number Start (sector) End (sector) Size Code Name
#
# 1 2048 907141119 432.6 GiB 0700
#
# 2 907141120 948101119 19.5 GiB 0700
#
# 3 948101120 968581119 9.8 GiB EF00
#
# 4 968581120 976773119 3.9 GiB 8200
#

Command (? for help): d

Partition number (1-4): 1

Command (? for help): p

# Disk /dev/sda: 976773168 sectors, 465.8 GiB
#
# Logical sector size: 512 bytes
#
# Disk identifier (GUID): FB42D8BC-9B54-4B3B-A16C-A39A39B902FF
#
# Partition table holds up to 128 entries
#
# First usable sector is 34, last usable sector is 976773134
#
# Partitions will be aligned on 2048-sector boundaries
#
# Total free space is 907141101 sectors (432.6 GiB)
#
#
# Number Start (sector) End (sector) Size Code Name
#
# 2 907141120 948101119 19.5 GiB 0700
#
# 3 948101120 968581119 9.8 GiB EF00
#
# 4 968581120 976773119 3.9 GiB 8200
#

Command (? for help): n

# Partition number (1-128, default 1):

First sector (34-976773134, default = 2048) or {+-}size{KMGTP}:

Last sector (2048-907141119, default = 907141119) or {+-}size{KMGTP}: 326G

# Current type is 'Linux filesystem'

Hex code or GUID (L to show codes, Enter = 8300):

# Changed type of partition to 'Linux filesystem'


Command (? for help): w


# Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
#
# PARTITIONS!!


Do you want to proceed? (Y/N): y

# OK; writing new GUID partition table (GPT) to /dev/sda.
#
# Warning: The kernel is still using the old partition table.
#
# The new table will be used at the next reboot.
#
# The operation has completed successfully.
```

分区大小调整完毕。

## 将 /dev/sda1 挂载到 /home

```shell
[root@tanghuimin ~]# df -Th

# Filesystem Type Size Used Avail Use% Mounted on
#
# /dev/sda3 ext4 9.7G 6.6G 2.6G 72% /
#
# tmpfs tmpfs 1.8G 296K 1.8G 1% /dev/shm
#
# /dev/sda2 ext4 20G 4.2G 15G 23% /opt

[root@tanghuimin ~]# mount /dev/sda1 /home/

[root@tanghuimin ~]# df -Th

# Filesystem Type Size Used Avail Use% Mounted on
#
# /dev/sda3 ext4 9.7G 6.6G 2.6G 72% /
#
# tmpfs tmpfs 1.8G 296K 1.8G 1% /dev/shm
#
# /dev/sda2 ext4 20G 4.2G 15G 23% /opt
#
# /dev/sda1 ext4 321G 37G 269G 12% /home
```

reboot.

## 创建新分区

在 /dev/sda 所有 free 的空间上创建新分区

```shell
[root@tanghuimin ~]# gdisk /dev/sda

# GPT fdisk (gdisk) version 0.8.10
#
#
# Partition table scan:
#
# MBR: protective
#
# BSD: not present
#
# APM: not present
#
# GPT: present
#
#
# Found valid GPT with protective MBR; using GPT.
#

Command (? for help): p

# Disk /dev/sda: 976773168 sectors, 465.8 GiB
#
# Logical sector size: 512 bytes
#
# Disk identifier (GUID): FB42D8BC-9B54-4B3B-A16C-A39A39B902FF
#
# Partition table holds up to 128 entries
#
# First usable sector is 34, last usable sector is 976773134
#
# Partitions will be aligned on 2048-sector boundaries
#
# Total free space is 221374444 sectors (105.6 GiB)
#
#
# Number Start (sector) End (sector) Size Code Name
#
# 1 2048 685768704 327.0 GiB 8300 Linux filesystem
#
# 2 907141120 948101119 19.5 GiB 0700
#
# 3 948101120 968581119 9.8 GiB EF00
#
# 4 968581120 976773119 3.9 GiB 8200
#

Command (? for help): n

Partition number (5-128, default 5):

First sector (34-976773134, default = 685770752) or {+-}size{KMGTP}:

Last sector (685770752-907141119, default = 907141119) or {+-}size{KMGTP}:

# Current type is 'Linux filesystem'

Hex code or GUID (L to show codes, Enter = 8300):

# Changed type of partition to 'Linux filesystem'


Command (? for help): w


# Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
#
# PARTITIONS!!
#

Do you want to proceed? (Y/N): y

# OK; writing new GUID partition table (GPT) to /dev/sda.
#
# Warning: The kernel is still using the old partition table.
#
# The new table will be used at the next reboot.
#
# The operation has completed successfully.
```

## 格式化新分区

将新分区的文件系统类型设为 ext4

```shell
[root@tanghuimin ~]# mkfs -t ext4 /dev/sda5

# mke2fs 1.41.12 (17-May-2010)
#
# Filesystem label=
#
# OS type: Linux
#
# Block size=4096 (log=2)
#
# Fragment size=4096 (log=2)
#
# Stride=1 blocks, Stripe width=0 blocks
#
# 6922240 inodes, 27671296 blocks
#
# 1383564 blocks (5.00%) reserved for the super user
#
# First data block=0
#
# Maximum filesystem blocks=4294967296
#
# 845 block groups
#
# 32768 blocks per group, 32768 fragments per group
#
# 8192 inodes per group
#
# Superblock backups stored on blocks:
#
# 32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
#
# 4096000, 7962624, 11239424, 20480000, 23887872
#
#
# Writing inode tables: done
#
# Creating journal (32768 blocks): done
#
# Writing superblocks and filesystem accounting information: done
#
#
# This filesystem will be automatically checked every 33 mounts or
#
# 180 days, whichever comes first. Use tune2fs -c or -i to override.
```

## 挂载新分区

将新分区 /dev/sda5 挂载到/vm

```shell
[root@tanghuimin ~]# mount /dev/sda5 /vm

[root@tanghuimin ~]# df -Th

# Filesystem Type Size Used Avail Use% Mounted on
#
# /dev/sda3 ext4 9.7G 6.6G 2.6G 72% /
#
# tmpfs tmpfs 1.8G 224K 1.8G 1% /dev/shm
#
# /dev/sda1 ext4 321G 37G 269G 12% /home
#
# /dev/sda2 ext4 20G 4.2G 15G 23% /opt
#
# /dev/sda5 ext4 104G 188M 99G 1% /vm
```

## 修改 /etc/fstab

在/etc/fstab中添加如下行，使在系统启动时/dev/sda5被挂载到/vm

```
/dev/sda5	/vm	ext4	defaults	1 2
```

reboot.
