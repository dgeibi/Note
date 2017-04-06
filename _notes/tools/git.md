---
title: Git
---

Reference:

- [Pro Git](https://git-scm.com/book/en/v2)

```shell
exit 1

#set user.email and user.name
git config --global user.email "png.inside@gmail.com"
git config --global user.name "dgeibi"

# create a new repository
git init
git add .
git commit -m "initial commit"
git remote add origin ${remote_address}
git push -u origin master

# clone
git clone $address [-b $branch] [--depth 1]

#no staged diff
git diff

#staged diff
git diff --staged

# git add <tracted file> + git commit
git commit -a -m "message"

#delete file from staged area and working folder
git rm file

#delete file from staged area
git rm --cached file

#git 自带 glob ，不需要 shell 协助，用反斜杠转译
git rm \*~

#重命名文件
git mv README.md README
git status
#On branch master
#Changes to be committed:
#  (use "git reset HEAD <file>..." to unstage)
#
#    renamed:    README.md -> README
#其实，运行 git mv 就相当于运行了下面三条命令：
mv README.md README
git rm README.md
git add README

#历史记录

git log

#显示最近两次提交，每次的内容差异
git log -p -2

#显示简略的提交变化，如行数的增减
git log --stat

#单行 (commit message)
git log --pretty=oneline

#形象的显示
git log --pretty=format:"%h %s" --graph

# %cd 提交日期
# %cr 提交日期，按多久以前的方式显示
# %s  提交说明

--since=2.weeks
--before="2012-01-02"
--committer
--grep

#撤销
# https://git-scm.com/docs/git-reset
## 修改上一次 commit
git commit --amend

## 取消暂存文件（add 的撤销）
git reset HEAD added_file
### 注意：加上 --hard ，可能导致工作目录的所有当前进度丢失！

## Undo a commit

git reset --soft HEAD^

# Undo commits permanently
# HEAD, HEAD^, and HEAD~2

git reset --hard HEAD~3

## 撤销工作目录中对文件的修改

git checkout -- modify_file

#remote
# detail
git remote -v

#add remote repo
#remote_(short)_name 默认为 origin

git remote add remote_short_name url

# 可以用 remote_name 替代 URL

git fetch remote_name
git push remote_name branch_name

# alias 别名

git config --global alias.unstage 'reset HEAD --'

#以下等价
git unstage fileA
git reset HEAD -- fileA


#list tag
git tag
# 列出包含 v1.8.5 的 tag
git tag -l 'v1.8.5*'

#创建标签

##annotated tag

git tag -a v1.4 [-m "my version 1.4"]

### 查看标签信息及对应的提交信息
git show v1.4


##lightweight

git tag v1.4-lw

## git show 不会有标签相关信息

#后期 tag
git tag -a v1.2 sha1sum

#共享 tag
#all tag
git push origin --tags
#one tag
git push origin tagname

#检出特定版本并创建对应分支
#检出就是工作目录的内容的切换
git checkout -b version2 v2.0.0

# branch
# 创建分支
git branch testing

# HEAD 是指向本地分支的指针

#查看各个分支当前所指的对象，提供这一功能的参数是 --decorate
git log --oneline --decorate

# 分支切换
# HEAD 指向 testing 分支，工作目录切换到 testing 指向的快照内容
git checkout testing

#注意：切换前需要保证提交完修改项目

git checkout -b branch_name

#是以下的简写

git branch branch_name
git checkout branch_name

#合并分支

git checkout master
git merge hotfix

#无分歧的提示：fast-forward (快进)

# 删除分支

git branch -d hotfix

#若两分支对同一个文件有修改，合并时会遇到冲突

git merge iss53
#Auto-merging index.html
#CONFLICT (content): Merge conflict in index.html
#Automatic merge failed; fix conflicts and then commit the result.

#merge 会暂停，通过 git status 查看发生冲突的文件，手动修改冲突的文件，git add 冲突的文件，冲突被视为解决。

#分支列表
git branch

#随便看最后一次 commit
git branch -v

#已合并的分支
git branch --merged

#未合并的分支
git branch --no-merged

#来将本地的 serverfix 分支推送到远程仓库上的 awesomebranch 分支
git push origin serverfix:awesomebranch

#抓取远程跟踪分支
git fetch remote_name
#合并该分支到当前所在分支
git merge remote_name/branch_name

#基于远程分支新建本地分支
git checkout -b newbranch remote_name/branch_name
#or
git checkout --track remote_name/branch_name

#基于的远程分支叫做上游分支，其快捷方式是 @{u} or @{upstream}
git merge @{u}
```
