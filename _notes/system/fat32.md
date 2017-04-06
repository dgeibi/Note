---
title: Create a FAT32 Partition
---

```shell
sudo fdisk /dev/sdc

#Welcome to fdisk (util-linux 2.28).
#Changes will remain in memory only, until you decide to write them.
#Be careful before using the write command.


Command (m for help): o
#Created a new DOS disklabel with disk identifier 0x14074475.

Command (m for help): n
#Partition type
#   p   primary (0 primary, 0 extended, 4 free)
#   e   extended (container for logical partitions)

Select (default p): p
Partition number (1-4, default 1): 1
First sector (2048-30851071, default 2048):
Last sector, +sectors or +size{K,M,G,T,P} (2048-30851071, default 30851071):

#Created a new partition 1 of type 'Linux' and of size 14.7 GiB.

Command (m for help): t
#Selected partition 1

Partition type (type L to list all types): c
#Changed type of partition 'Linux' to 'W95 FAT32 (LBA)'.

Command (m for help): w
#The partition table has been altered.
#Calling ioctl() to re-read partition table.
#Syncing disks.

sudo mkfs.fat -s 8 -F 32 /dev/sdc1
##mkfs.fat 4.0 (2016-05-06)
```
