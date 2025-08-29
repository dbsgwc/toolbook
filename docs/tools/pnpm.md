---
title: PNPM 速查
---

# PNPM 速查

快速、高效的包管理器。

## 安装

```bash
# Node 16+ 可用 corepack（推荐）
corepack enable
corepack prepare pnpm@latest --activate

# 或使用 npm 全局安装
npm i -g pnpm
pnpm -v
```

## 常用命令

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `pnpm init` | 初始化 | `pnpm init` |
| `pnpm install` | 安装依赖 | `pnpm i` |
| `pnpm add <pkg>` | 安装依赖 | `pnpm add axios` |
| `pnpm add -D <pkg>` | 安装开发依赖 | `pnpm add -D typescript` |
| `pnpm remove <pkg>` | 移除依赖 | `pnpm remove axios` |
| `pnpm update` | 升级 | `pnpm up` |
| `pnpm run <script>` | 运行脚本 | `pnpm run build` |
| `pnpm dlx <pkg>` | 一次性执行 | `pnpm dlx create-vite` |
| `pnpm exec <cmd>` | 在本地依赖里执行 | `pnpm exec vite build` |

## Monorepo（工作区）

`pnpm-workspace.yaml` 示例：

```yaml
packages:
  - packages/*
  - apps/*
```

常用过滤：

```bash
pnpm -F app-web run dev
pnpm -F app-web add lodash
```

## 锁文件

- 锁文件：`pnpm-lock.yaml`
- 严格遵循锁文件以确保一致构建：`pnpm i --frozen-lockfile`

## 参考

- PNPM 文档：`https://pnpm.io/`


