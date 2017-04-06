---
title: Install Arch Linux
---

```bash
#!/bin/false


# Do not execute this line and this non-script!
# It's used to prevent unintentional execution of this non-script,
# which confusingly ends in `*.sh'.
exit 1


# Suggestion:
# Read through and ensure that you feel nothing wrong,
# i.e., you have no question on them.
# before starting installation.

# Now that we have booted the installation medium,
# we are given a root shell.


# Identify the devices.
lsblk

# Check for UEFI mode.
ls /sys/firmware/efi/efivars/


# No need to change console keymap and font,
# so skip them (in my case).

wifi-menu

# Check for the Internet connection.
ping -c4 github.com
# DHCP works like a charm in my case, and skip network configuration.


# Update the system clock.
timedatectl set-ntp true
# Check the status.
timedatectl status


# # # # # # # # # # Interesting Part I Begins # # # # # # # # # #

# Prepare partition for /boot,/, /home and swap

## /boot
parted /dev/sda
# (parted) mktable gpt
# (parted) p
# (parted) mkpart esp fat32 1mib 513mib
# (parted) p
# (parted) set boot 1 on
# (parted) p
# (parted) q

gdisk /dev/sda
or cgdisk /dev/sda

# create partitions --->   Linux LVM (8e00)

##### Create physical volumes

# To list all your devices capable of being used as a physical volume:
lvmdisksca

# Warning: Make sure you target the correct device, or below commands will result in data loss!

# Create a physical volume on them:

#This command creates a header on each device so it can be used for LVM. As defined in #LVM Building Blocks, DEVICE can be a disk (e.g. /dev/sda), a partition (e.g. /dev/sda2) or a loop back device. For example:

pvcreate /dev/sda2

# You can track created physical volumes with:
pvdisplay

####### Create volume group

# vgcreate <volume_group> <physical_volume>

vgcreate vg1 /dev/sda2

# vgextend <volume_group> <physical_volume>

vgdisplay

#### Create logical volumes

# lvcreate -L {{Size}}  {{ vg }} -n {{ lv }}

lvcreate -L 80G vg1 -n lvroot
lvcreate -L 150G vg1 -n lvhome
lvcreate -L 8G vg1 -n lvswap

lvdisplay

### format

lsblk

mkfs.vfat -F32 /dev/sda1
mkfs.ext4 /dev/vg1/lvroot
mkfs.ext4 /dev/vg1/lvhome
mkswap /dev/vg1/lvswap

# # # # # # # # # # Interesting Part I Ends # # # # # # # # # #

mkdir -p /mnt/home
mkdir -p /mnt/boot

swapon /dev/vg/lvswap
mount /dev/vg1/lvroot /mnt
mount /dev/vg1/lvhome /mnt/home
mount /dev/sda1 /mnt/boot

lsblk

# Select mirrors for China

nano /etc/pacman.d/mirrorlist

#Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
#Server = http://mirrors.cqu.edu.cn/archlinux/$repo/os/$arch
#Server = http://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
#Server = http://mirrors.zju.edu.cn/archlinux/$repo/os/$arch
#Server = http://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
#Server = http://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch

# Install base packages.
pacstrap -i /mnt base base-devel dialog wpa_actiond wpa_supplicant

# Generate an fstab file.
genfstab -U /mnt >> /mnt/etc/fstab

# Confirm
cat /mnt/etc/fstab

# Change root.
arch-chroot /mnt /bin/bash

# Uncomment locales.
nano /etc/locale.gen
# In my case, they are en_US.UTF-8 and zh_CN.UTF-8.

# Generate locales.
locale-gen

# Set locale.
nano /etc/locale.conf
# In my case, add this line.
#
# LANG=en_US.UTF-8

tzselect
timedatectl set-timezone 'Asia/Shanghai'
hwclock --systohc --utc


#### mkinitcpio

nano /etc/mkinitcpio.conf

# HOOKS="base systemd autodetect modconf block sd-lvm2 filesystems keyboard fsck"
# Generate the initramfs image.

mkinitcpio -p linux


#### add boot entry (UEFI)

bootctl install

nano /boot/loader/loader.conf

# default arch
# timeout 2
# editor 1

nano /boot/loader/entries/arch.conf

# title         Arch Linux(LVM)
# linux         /vmlinuz-linux
# initrd        /initramfs-linux.img
# options       root=/dev/mapper/vg1-lvroot rw resume=/dev/mapper/vg1-lvswap

# quit

exit

reboot


# # # # # # # # # # Interesting Part II Ends # # # # # # # # # #


# Follow the boring routines again.

# Set root password.
passwd

# Create a user for daily use.
useradd -m -G wheel dgeibi

passwd dgeibi

# Allow users in group `wheel' to execute any commands.
# Uncomment the line `%wheel ALL=(ALL) ALL'.
nano /etc/sudoers

# Set hostname.

nano /etc/hostname

# See interface
ip link

# line

systemctl enable dhcpcd@enp4s0f2
systemctl start dhcpcd@enp4s0f2

# wifi

wifi-menu -o
systemctl enable netctl-auto@wlp3s0

reboot

## login with username

./restore
```
