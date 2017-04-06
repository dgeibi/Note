---
title: USB drive
---

## Create a bootable USB drive

Tip: Find out the name of your USB drive with `lsblk`. Make sure that it is not mounted.

Run the following command, replacing `/dev/sdx` with your drive, e.g. `/dev/sdc`.

    sudo bash -c 'dd bs=4M if=/path/to/iso of=/dev/sdc && sync'

## restore the USB drive

    sudo bash -c 'dd count=1 bs=512 if=/dev/zero of=/dev/sdc && sync'
