## ToolBook — 开源命令速查小册

一个由 VitePress 驱动的开源命令速查小册，收录 PM2 / Docker / NVM / Git / PNPM 等常用工具的高频命令与实践，帮你快速查找与复制使用。

- 在线预览: `https://toolbook.wat.ink`
- 源码仓库: `https://github.com/dbsgwc/toolbook`

### 特性

- 简洁直达：围绕常用命令与实践，按主题组织
- 结构清晰：统一导航与侧边栏，快速定位
- 自动最近更新：构建时生成最近更新列表，便于追踪
- 易于贡献：纯 Markdown 编辑即可参与

### 快速开始

要求 Node.js ≥ 18。

```bash
npm i
npm run docs:dev
```

本地预览（构建后）：

```bash
npm run docs:build
npm run docs:preview
```

构建产物输出目录：`docs/.vitepress/dist`。

### 参与贡献

欢迎任何形式的贡献（修正错别字 / 完善示例 / 新增条目等）。

1. Fork 仓库并创建分支：`feat/your-topic`
2. 在 `docs/` 下新增或编辑对应 Markdown 文件
3. 本地预览无误后提交 PR，并简述变更点

建议风格：

- 标题清晰，示例可复制运行
- 命令附简短说明，必要时给出注意事项
- 保持与现有文档术语一致性

### 脚本命令

- `docs:dev`：生成 `recent.json` 后启动开发服务器
- `docs:build`：生成 `recent.json` 后构建静态站点
- `docs:preview`：本地预览构建产物

### 文档结构

```
docs/
  index.md
  guide/stack.md
  tools/
    pm2.md docker.md nvm.md git.md pnpm.md
  .vitepress/
    config.ts
    public/CNAME
    scripts/gen-recent.mjs
```

### 部署（简要）

本项目为静态站点，可部署至任何静态托管（例如 GitHub Pages）。仓库内已包含 `docs/.vitepress/public/CNAME`，自定义域名指向 `toolbook.wat.ink`。

### 许可证

本项目基于 MIT 许可证开源（见 `LICENSE`）。
