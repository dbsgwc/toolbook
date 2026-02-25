---
title: Nginx 速查
---

# Nginx 速查

Ubuntu 环境下 Nginx 的安装、配置与常用命令。

## 安装与状态检查

```bash
# 更新源并安装 Nginx
sudo apt update
sudo apt install nginx -y

# 检查服务运行状态
sudo systemctl status nginx
```

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `sudo systemctl start nginx` | 启动 Nginx |
| `sudo systemctl stop nginx` | 停止 Nginx |
| `sudo systemctl restart nginx` | 重启 Nginx (会中断服务) |
| `sudo systemctl reload nginx` | **推荐**：热重载配置，不中断服务 |
| `sudo systemctl enable nginx` | 设置开机自启 |
| `sudo systemctl disable nginx` | 取消开机自启 |
| `sudo nginx -t` | 测试配置文件语法是否正确 |
| `nginx -v` | 查看版本号 |
| `nginx -V` | 查看版本号及编译参数 |

## 目录结构

在 Ubuntu（通过 apt 安装）的默认结构：

- **/etc/nginx/**：Nginx 的主配置目录。
  - `nginx.conf`：全局主配置文件。
  - `sites-available/`：存放所有可用的站点配置。
  - `sites-enabled/`：存放已启用的站点配置（通常作为软链接指向 `sites-available` 中的配置）。
  - `conf.d/`：其他模块配置目录（通常被主配置 include）。
- **/var/www/html/**：Nginx 默认的静态页面根目录。
- **/var/log/nginx/**：日志记录目录。
  - `access.log`：访问日志（每次有请求进来都会记录）。
  - `error.log`：错误日志（用于排查问题）。

## 基本配置示例

进入配置目录并创建一个新的站点配置：

```bash
# 创建一个新的站点配置
sudo nano /etc/nginx/sites-available/myapp
```

### 1. 静态网站托管（例如 Vite/React 打包产物）

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/myapp/dist;
    index index.html index.htm;

    # 开启 gzip 压缩 (可选, 按需开启)
    gzip on;
    gzip_types text/plain application/javascript text/css;

    location / {
        # 支持 Vue/React 的 History 路由模式
        try_files $uri $uri/ /index.html; 
    }
}
```

### 2. 反向代理 (如转发到 Node.js/Go/Python 的 API 服务)

```nginx
server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000; # 转发到本地 3000 端口
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade; # 支持 WebSocket
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr; # 传递真实客户端 IP
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 启用配置与生效流程

1. **创建软链接到启用的目录**
   ```bash
   sudo ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
   ```

2. **测试配置是否正确（非常重要，建议每次改完都执行）**
   ```bash
   sudo nginx -t
   ```
   *预期输出应包含：`nginx: configuration file /etc/nginx/nginx.conf test is successful`*

3. **重新加载 Nginx 生效**
   ```bash
   sudo systemctl reload nginx
   ```

## 常见问题与排障

### 1. 端口冲突
如果提示 80 端口已被占用（Address already in use）：
```bash
# 查看哪个进程占用了 80 端口
sudo netstat -tlpn | grep 80
# 或使用 lsof
sudo lsof -i :80
```
找出占用进程（如 apache2等），将其停止或卸载，然后再启动 Nginx。

### 2. 权限问题（403 Forbidden）
如果 Nginx 无法读取前端静态打包文件，检查该目录的属主和权限：
```bash
# 给予 www-data (Nginx 默认运行用户) 访问权限
sudo chown -R www-data:www-data /var/www/myapp
sudo chmod -R 755 /var/www/myapp
```
另外要确保 `/var/www/` 层级目录有执行(x)权限。

### 3. 防火墙拦截（部分云服务器）
如果 Nginx 已启动但外网无法访问 80/443：
- **UFW 防火墙**：
  ```bash
  sudo ufw allow 'Nginx Full'
  # 查看 ufw 状态
  sudo ufw status
  ```
- **云服务商控制台**：
  需在阿里云、腾讯云的安全组设置中，开放服务器的 80 与 443 入站端口。

### 4. 查看报错日志
网站 502/500 或者无法访问时，最有效的排查手段：
```bash
# 实时查看最后 50 行报错日志
sudo tail -f -n 50 /var/log/nginx/error.log
```
