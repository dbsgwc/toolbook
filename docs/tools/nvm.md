---
title: NVM 速查
---

# NVM 速查

Node.js 版本管理工具（Windows 版：nvm-windows）。

> 注：本文命令适用于 Windows（PowerShell/命令提示符）。

## 安装与环境

```powershell
nvm -v
```

## 常用命令

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `nvm list` | 查看本机已安装版本 | `nvm list` |
| `nvm list available` | 查看可安装版本（含 LTS 标记） | `nvm list available` |
| `nvm install <ver>` | 安装指定版本 | `nvm install 18.19.1` |
| `nvm install latest` | 安装最新稳定版 | `nvm install latest` |
| `nvm install lts` | 安装最新 LTS 版 | `nvm install lts` |
| `nvm use <ver>` | 切换到指定版本 | `nvm use 18.19.1` |
| `nvm uninstall <ver>` | 卸载版本 | `nvm uninstall 16.20.2` |
| `nvm root` | 查看/设置安装根目录 | `nvm root` |
| `nvm on / nvm off` | 开启/关闭 Node 管理 | `nvm on` |

## 查看可用/最新版本

```powershell
# 列出所有可安装版本（最新版本通常在列表顶部）
nvm list available

# 仅查看 LTS 版本（可根据输出挑选）
nvm list available | findstr LTS

# 直接安装最新/最新 LTS（若版本不支持该语法，请从上方列表选择具体版本号）
nvm install latest
nvm install lts
```

## 参考

- nvm-windows：`https://github.com/coreybutler/nvm-windows`

## 常见问题（Windows）

### 1) 切换版本后 `node`/`npm` 仍旧不是目标版本

```powershell
node -v
where node
echo %PATH% | findstr nodejs
```

- 关闭并重新打开终端（刷新环境变量）。
- 确认 PATH 中的 `C:\\Program Files\\nodejs`（nvm-windows 的符号链接目录）在更前面，且没有其它 Node 安装目录排在前面。
- 若系统里曾手动安装过 Node，建议卸载或移除旧目录，避免与 nvm-windows 冲突。

### 2) 提示权限不足或无法写入目录

- 安装 nvm-windows 时，推荐：
  - NVM 安装目录：`C:\\nvm`
  - Node 符号链接目录：`C:\\Program Files\\nodejs`
- 使用管理员权限运行安装器；日常使用 `nvm use` 不需要管理员权限。

### 3) 下载缓慢或失败（镜像配置）

编辑 `settings.txt`（通常位于 `C:\\Users\\<用户名>\\AppData\\Roaming\\nvm\\settings.txt` 或 `C:\\nvm\\settings.txt`），添加：

```
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://registry.npmmirror.com/
```

保存后重新执行 `nvm install ...`。


