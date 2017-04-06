---
title: systemd
---

## analyze startup time

```shell
systemd-analyze blame

systemd-analyze critical-chain

systemd-analyze plot > plot.svg
```

## check error

```shell
systemctl --failed

journalctl -p 3 -xb
```

## tips

cgdisk rename same name disk

netctl-auto faster than netctl
