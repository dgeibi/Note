---
title: expect
---

```shell
#!/bin/bash
pass='password'
jekyll build
cd _site
git add .
git commit -m deploy
/usr/bin/expect <<-EOF
spawn git push
expect "'https://github.com':"
send "dgeibi\r";
expect "'https://dgeibi@github.com':"
send "$pass\r"
expect eof
EOF
```
