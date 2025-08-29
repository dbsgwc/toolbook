---
title: NVM 速查
---

# NVM 速查

Node.js 版本管理工具。

## 安装与环境

```bash
nvm -v
```

Windows 用户请参考 `nvm-windows`。

## 常用命令

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `nvm ls-remote` | 远程版本列表 | `nvm ls-remote` |
| `nvm install <ver>` | 安装版本 | `nvm install 18` |
| `nvm use <ver>` | 切换版本 | `nvm use 18` |
| `nvm alias default <ver>` | 默认版本 | `nvm alias default 18` |

## 常见场景

- 项目本地固定到 `.nvmrc`：
  ```bash
  echo "18" > .nvmrc
  nvm use
  ```

## 参考

- nvm：`https://github.com/nvm-sh/nvm`
- nvm-windows：`https://github.com/coreybutler/nvm-windows`


