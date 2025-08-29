---
title: PM2 速查
---

# PM2 速查

进程守护与零停机部署工具。

## 安装

```bash
npm i -g pm2
pm2 -v
```

## 常用命令

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `pm2 start <file>` | 启动进程 | `pm2 start app.js --name api` |
| `pm2 list` | 查看进程列表 | `pm2 list` |
| `pm2 logs [name]` | 实时日志 | `pm2 logs api` |
| `pm2 stop <name\|id>` | 停止进程 | `pm2 stop api` |
| `pm2 restart <name\|id>` | 重启进程 | `pm2 restart api` |
| `pm2 delete <name\|id>` | 删除进程 | `pm2 delete api` |
| `pm2 monit` | 监控面板 | `pm2 monit` |
| `pm2 save` | 保存当前进程列表 | `pm2 save` |
| `pm2 resurrect` | 读取保存的进程 | `pm2 resurrect` |
| `pm2 env <id>` | 查看环境变量 | `pm2 env 0` |

## 开机自启

```bash
pm2 startup
# 按提示执行生成的命令
pm2 save
```

## 常见场景

- Node 服务零停机部署：
  ```bash
  pm2 start app.js --name api -i max
  pm2 reload api
  ```
- 指定环境变量：
  ```bash
  PORT=3000 NODE_ENV=production pm2 start app.js --name api
  ```
- 使用 `ecosystem.config.js`：
  ```bash
  pm2 start ecosystem.config.js --env production
  ```

## 参考

- PM2 官方文档：`https://pm2.keymetrics.io/`


