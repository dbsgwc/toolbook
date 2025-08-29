---
title: Git 速查
---

# Git 速查

分布式版本控制工具的高频命令与场景。

## 安装与配置

```bash
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git config --global init.defaultBranch main
```

## 基础

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `git init` | 初始化仓库 | `git init` |
| `git clone <url>` | 克隆仓库 | `git clone git@github.com:me/repo.git` |
| `git status` | 查看状态 | `git status` |
| `git add <path>` | 暂存变更 | `git add .` |
| `git commit -m "msg"` | 提交 | `git commit -m "feat: add page"` |

## 远程

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `git remote -v` | 查看远程 | `git remote -v` |
| `git remote add origin <url>` | 添加远程 | `git remote add origin git@github.com:me/repo.git` |
| `git pull --rebase` | 拉取变更 | `git pull --rebase origin main` |
| `git push -u origin main` | 推送主分支 | `git push -u origin main` |
| `git remote set-url origin <url>` | 修改远程 | `git remote set-url origin https://...` |

## 分支

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `git branch` | 列出分支 | `git branch -a` |
| `git switch -c <name>` | 新建并切换 | `git switch -c feature/x` |
| `git switch <name>` | 切换分支 | `git switch main` |
| `git merge <name>` | 合并 | `git merge feature/x` |
| `git rebase <name>` | 变基 | `git rebase main` |

## Tag

```bash
git tag -a v1.0.0 -m "release"
git push origin --tags
git show v1.0.0
```

## Stash

```bash
git stash
git stash list
git stash pop
```

## 撤销与恢复

```bash
# 撤销工作区改动
git restore <file>

# 回退到上一个提交（保留工作区）
git reset --soft HEAD~1

# 回退并丢弃暂存区改动（保留工作区）
git reset --mixed HEAD~1

# 回退并丢弃工作区改动（危险）
git reset --hard HEAD~1

# 生成反向提交（已推送的安全做法）
git revert <commit>
```

## 常见场景

- 首次推送：
  ```bash
  git remote add origin git@github.com:me/repo.git
  git push -u origin main
  ```
- 变基同步主分支：
  ```bash
  git fetch origin
  git rebase origin/main
  ```

## 参考

- Git 文档：`https://git-scm.com/doc`

## 进阶技巧

### reset 对照（软/混合/硬）

```bash
# 仅移动 HEAD，保留暂存与工作区
git reset --soft HEAD~1

# 重置暂存区，保留工作区（默认）
git reset --mixed HEAD~1

# 丢弃暂存与工作区（危险）
git reset --hard HEAD~1
```

### reflog 自救

```bash
git reflog         # 找回游离提交/误删分支
git reset --hard <reflog-id>
```

### worktree 并行开发

```bash
git worktree add ../feature-x feature/x
```

### bisect 定位回归

```bash
git bisect start
git bisect bad            # 标记当前为坏
git bisect good <commit>  # 标记已知好的提交
# 按提示测试并标记 good/bad，直至找出问题提交
git bisect reset
```

### rebase -i 压缩提交

```bash
git rebase -i HEAD~5
# 把多个 pick 改为 squash/fixup
```

### cherry-pick（单个/区间）

```bash
git cherry-pick <commit>
git cherry-pick A^..B   # [A,B] 区间
```

## 排障速查

### 合并冲突

```bash
git status
# 解决冲突后：
git add -A
git rebase --continue   # 或 git merge --continue
```

### 误提交修复

```bash
# 已推送：用 revert 生成反向提交
git revert <commit>

# 未推送：可 reset 回退并改写历史
git reset --soft HEAD~1
```

### 误删分支恢复

```bash
git reflog
git checkout -b lost-branch <reflog-id>
```

## 仓库治理

- `.gitignore` 模板与全局 ignore（`~/.config/git/ignore`）
- `.gitattributes`：EOL 规范、二进制、LFS
- 规范提交：Conventional Commits、签名（GPG / SSH）


