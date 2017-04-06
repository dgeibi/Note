---
title: netctl
---

[netctl - ArchWiki](https://wiki.archlinux.org/index.php/Netctl)

## 安装

```shell
pacman -S netctl wpa_actiond ifplugd wpa_supplicant dialog
```

## 配置文件的准备

```shell
cat /etc/netctl/examples/wireless-wpa
=====
Description='A simple WPA encrypted wireless connection'
Interface=wlan0
Connection=wireless

Security=wpa
IP=dhcp

ESSID='MyNetwork'
# Prepend hexadecimal keys with \"
# If your key starts with ", write it as '""<key>"'
# See also: the section on special quoting rules in netctl.profile(5)
Key='WirelessKey'
# Uncomment this if your ssid is hidden
#Hidden=yes
# Set a priority for automatic profile selection
#Priority=10
```

使用 `wifi-menu -o` 在目录 `/etc/netctl/` 中生成一个配置文件

```shell
#禁止其他用户访问密码
chmod 600 /etc/netctl/<profile>
```

## 自动切换配置

- 有线网络： `netctl-ifplugd@interface.service`
- 无线网络： `netctl-auto@interface.service`

```shell
ip link      #查看接口名
systemctl enable netctl-auto@interface.service
systemctl enable netctl-ifplugd@interface.service
```
