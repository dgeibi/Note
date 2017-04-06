---
title: ssh and scp
---

1. 登录服务器

        ssh [-p port] username@servername

2. 上传本地文件到服务器

        scp [-P port] /path/filename username@servername:/path   

3. 上传目录到服务器

        scp [-P port] -r local_dir username@servername:remote_dir

4. 从服务器上下载文件

        scp [-P port] username@servername:/path/filename /var/www/local_dir

5. 从服务器下载整个目录

        scp [-P port] -r username@servername:/var/www/remote_dir  /var/www/local_dir
