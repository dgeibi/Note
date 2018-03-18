---
title: systemd
---

## analyze startup time

```bash
systemd-analyze blame

systemd-analyze critical-chain

systemd-analyze plot > plot.svg
```

## check error

```bash
systemctl --failed

journalctl -p 3 -xb
```

## tips

cgdisk rename same name disk

netctl-auto faster than netctl
