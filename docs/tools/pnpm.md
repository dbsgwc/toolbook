---
title: PNPM 速查
---

# PNPM 速查

快速、高效的包管理器。

## 安装

```bash
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

### 是什么？

- 用一个仓库管理多个包/项目（apps、packages），共享依赖、统一脚本与版本策略。
- 解决多包安装重复、联调不便、CI 低效、版本管理混乱等问题。
- 通过工作区把包之间用符号链接连接，改动可即时联调。

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

### 过滤与递归脚本

```bash
# 过滤（别名 -F/--filter）
pnpm -F app-* run build

# 递归执行工作区所有包的脚本
pnpm -r run build

# 多条件过滤
pnpm -F "./packages/*" -F "!./packages/legacy-*" run test
```

### 最小可运行示例

目录结构：

```
my-workspace/
├─ pnpm-workspace.yaml
├─ package.json
├─ apps/
│  └─ web/
│     ├─ package.json
│     └─ src/main.ts
└─ packages/
   └─ ui/
      ├─ package.json
      └─ src/index.ts
```

根 `pnpm-workspace.yaml`：

```yaml
packages:
  - apps/*
  - packages/*
```

根 `package.json`：

```json
{
  "name": "my-workspace",
  "private": true,
  "packageManager": "pnpm@9",
  "scripts": {
    "build": "pnpm -r build",
    "dev": "pnpm -F @app/web dev"
  }
}
```

`packages/ui/package.json`：

```json
{
  "name": "@pkg/ui",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc -p ."
  }
}
```

`apps/web/package.json`：

```json
{
  "name": "@app/web",
  "version": "0.1.0",
  "type": "module",
  "dependencies": {
    "@pkg/ui": "workspace:*"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

说明：`workspace:*` 让 `@app/web` 依赖工作区内的 `@pkg/ui`，改动可即时联调。

### 跨包本地联调示例

```bash
# 在 UI 包中开启构建监视（或 rollup/tsup 等）
pnpm -F @pkg/ui run build -- --watch

# 在 Web 应用中启动本地开发
pnpm -F @app/web run dev

# 仅重建受影响的包
pnpm -r --filter "...[HEAD^]" build
```

## 锁文件

- 锁文件：`pnpm-lock.yaml`
- 严格遵循锁文件以确保一致构建：`pnpm i --frozen-lockfile`

## CI 与构建加速

```bash
# 预取依赖（可离线构建）
pnpm fetch

# 生产部署（只复制必要依赖与文件）
pnpm deploy ./.output --filter myapp
```

Docker 构建缓存示例（分层利用 store）：

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY pnpm-lock.yaml .
RUN pnpm fetch

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /root/.local/share/pnpm/store /root/.local/share/pnpm/store
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .
COPY packages ./packages
RUN pnpm i --frozen-lockfile && pnpm -r build
```

## 排障

- Windows PATH/`PNPM_HOME` 设置：
  - `echo %PNPM_HOME%`，确保加入 PATH；或执行 `corepack enable`。
- 本地构建失败（node-gyp）：安装构建链（Windows Build Tools / python / make 等）。
- 私服/代理：检查 `.npmrc` 的 `registry`/`@scope:registry`，企业环境建议只读 Token。
- 全局可执行：`pnpm -g` 目录在 PATH 中，或使用 `corepack` 管理包管理器。

## 参考

- PNPM 文档：`https://pnpm.io/`


