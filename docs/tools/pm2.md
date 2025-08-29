---
title: PM2 速查
---

# PM2 速查

进程守护与零停机部署工具。

> 注：本文所有命令与示例均以 Linux 环境为准。

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

### ecosystem.config.js 示例

```js
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: "BlogApi", // 应用名称
      script: "./app-linux-amd64", // 入口脚本
      watch: false, // 是否监视文件变化
      max_memory_restart: "300M", // 内存限制
      env: {
        // 默认环境变量
        NODE_ENV: "development",
        PORT: 3006
      },
      env_production: {
        // 生产环境变量
        NODE_ENV: "production",
        PORT: 3006
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss", // 日志日期格式
      error_file: "./logs/error.log", // 错误日志
      out_file: "./logs/out.log", // 标准输出日志
      merge_logs: true, // 合并日志
      autorestart: true // 自动重启
    }
  ]
}
```

### 启动与环境说明

- 使用指定环境启动（对应 `env` / `env_production` 配置）：

```bash
pm2 start ecosystem.config.js --env production
# 或开发环境
pm2 start ecosystem.config.js --env development
```

- 常用联动命令：

```bash
pm2 status            # 查看状态
pm2 logs BlogApi      # 查看该应用日志
pm2 reload BlogApi    # 平滑重载（零停机）
pm2 save              # 保存当前进程列表（配合开机自启）
```

### 日志目录说明（logs）

- 以上配置将日志输出到 `./logs/error.log` 与 `./logs/out.log`，请确保目录存在：

```bash
# Linux/macOS
mkdir -p logs
# Windows PowerShell
mkdir logs
```

- `error_file` 与 `out_file` 为相对路径，相对的是运行 `pm2 start` 命令时所在的工作目录。建议在项目根目录执行启动命令，避免路径混乱。

### 开机自启与进程恢复（pm2 save + pm2 resurrect）

1) 设置系统自启脚本（首次执行）：

```bash
pm2 startup
# 按提示复制并执行生成的系统命令（需要 sudo）
```

2) 保存当前进程列表（更新自启清单）：

```bash
pm2 save
```

3) 重启后恢复进程：

```bash
pm2 resurrect
```

4) 如需变更自启的进程，修改后再次 `pm2 save` 即可。

## 常见排障

### 端口被占用（EADDRINUSE）

```bash
# 查看占用 3006 端口的进程（任选其一）
ss -tulpn | grep :3006
lsof -i :3006

# 杀掉占用端口的进程
fuser -k 3006/tcp  # 或使用下面命令
kill -9 <PID>
```

处理后重启：
```bash
pm2 restart BlogApi --update-env
```

### 权限问题（EACCES / Permission denied）

```bash
# 可执行权限（针对二进制/脚本）
chmod +x ./app-linux-amd64

# 日志目录写入权限
mkdir -p logs && chmod 755 logs

# 若仍失败，尝试使用 sudo（谨慎）
sudo pm2 start ecosystem.config.js --env production
```

如遇到 CRLF 行尾导致脚本无法执行，可在 Linux 下转为 LF：
```bash
sed -i 's/\r$//' script.sh
# 或使用 dos2unix
dos2unix script.sh
```

### 环境变量未生效

```bash
# 指定环境
pm2 start ecosystem.config.js --env production

# 重载并刷新环境
pm2 reload BlogApi --update-env

# 检查进程环境
pm2 env <id>
pm2 show BlogApi
```

### 重启后未自动恢复

```bash
pm2 startup            # 生成系统自启
pm2 save               # 保存当前进程
pm2 resurrect          # 手动恢复
```

在 Linux 可检查 systemd：
```bash
systemctl status pm2-$(whoami)
```

## 参考

- PM2 官方文档：`https://pm2.keymetrics.io/`


