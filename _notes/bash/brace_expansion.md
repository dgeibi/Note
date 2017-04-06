---
title: Brace expansion
lang: en
---

Copy from [Bash (Unix shell) - Wikipedia](https://en.wikipedia.org/wiki/Bash_(Unix_shell))

```bash
echo a{p,c,d,b}e
# ape ace ade abe
echo {a,b,c}{d,e,f}
# ad ae af bd be bf cd ce cf
echo *.{jpg,jpeg,png}
# *.jpg *.jpeg *.png
echo *.{png,jp{e,}g}
# *.png *.jpeg *.jpg
```

```bash
echo {1..10}
# 1 2 3 4 5 6 7 8 9 10
echo file{1..4}.txt
# file1.txt file2.txt file3.txt file4.txt
echo {a..e}
# a b c d e
echo {1..10..3} # 等差
# 1 4 7 10
echo {a..j..3}
# a d g j
```

```bash
start=1; end=10
echo {$start..$end}  # fails to expand due to the evaluation order
# {1..10}
eval echo {$start..$end} # variable expansion occurs then resulting string is evaluated
# 1 2 3 4 5 6 7 8 9 10
```
