---
title: Docker
---

create and run a Docker container loading a image (hello-world): `docker run hello-world`

remove container after runing: `docker run -it --rm image cmd`

Run Archlinux bash: `docker run -it --rm archlinux /bin/bash`

- `-t`: Allocate a pseudo-tty
- `-i`: Keep STDIN open even if not attached

history ps: `docker ps -a`

current ps: `docker ps`

show all images: `docker images`

commit image from container: `docker commit -m "commit message" -a "author" CONTAINER_ID image_name`

remove image force: `docker rmi image --force`

remove container: `docker rm CONTAINER_ID ..`
