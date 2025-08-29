---
title: Docker 速查
---

# Docker 速查

容器构建与运行的常用命令。

## 安装与版本

```bash
docker version
docker info
```

## 镜像

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `docker pull <img>` | 拉取镜像 | `docker pull nginx:1.25` |
| `docker images` | 镜像列表 | `docker images` |
| `docker rmi <img>` | 删除镜像 | `docker rmi nginx:1.25` |
| `docker build -t <name> .` | 构建镜像 | `docker build -t myapp:1.0 .` |

## 容器

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `docker run` | 运行容器 | `docker run -d --name web -p 80:80 nginx` |
| `docker ps` | 运行中的容器 | `docker ps` |
| `docker ps -a` | 所有容器 | `docker ps -a` |
| `docker logs -f <c>` | 查看日志 | `docker logs -f web` |
| `docker exec -it <c> sh` | 进入容器 | `docker exec -it web sh` |
| `docker stop <c>` | 停止容器 | `docker stop web` |
| `docker rm <c>` | 删除容器 | `docker rm web` |

### 文件与拷贝（容器 -> 宿主机）

```bash
# 复制单个文件到当前目录
docker cp web:/etc/nginx/nginx.conf .

# 复制目录到宿主机指定目录（会在目标目录下创建同名子目录）
docker cp web:/var/log/nginx ./logs

# 仅复制目录内容（避免额外的子目录层级）
docker cp web:/var/log/nginx/. ./logs
```

大目录/保留权限更稳妥的方式（tar 流复制）：

- Linux / macOS
```bash
docker exec web sh -c "cd /data && tar czf - ." | tar xzf - -C ./data_backup
```

- Windows PowerShell
```powershell
docker exec web sh -c "cd /data && tar czf - ." | tar -xzf - -C .\data_backup
```

注意：
- 源路径以 `/.` 结尾表示复制目录“内容”，否则会复制目录本身。
- `web` 可以替换为容器 ID。

### 文件与拷贝（宿主机 -> 容器）

```bash
# 复制单个文件到容器内指定路径（目标路径需可写）
docker cp ./nginx.conf web:/etc/nginx/nginx.conf

# 复制整个目录到容器；保留目录名
docker cp ./configs web:/etc/nginx

# 仅复制目录内容（不多包一层目录）
docker cp ./configs/. web:/etc/nginx
```

大目录/权限控制（tar 流方式）：

- Linux / macOS
```bash
tar czf - -C ./data . | docker exec -i web sh -c "mkdir -p /data && tar xzf - -C /data"
```

- Windows PowerShell
```powershell
tar -czf - -C .\data . | docker exec -i web sh -c "mkdir -p /data && tar -xzf - -C /data"
```

拷贝后如需修正属主/权限，可在容器内执行：

```bash
docker exec web sh -c "chown -R nginx:nginx /etc/nginx && chmod -R go-w /etc/nginx"
```

常见报错与处理：
- Read-only file system：目标目录只读。改为写入 `/tmp` 或启动时挂载可写卷后再移动。
- No such file or directory：先 `mkdir -p` 目标目录：`docker exec web mkdir -p /etc/nginx/conf.d`。
- 权限不足：以 root 执行（`docker exec -u 0 ...`），或拷贝至可写目录后再容器内 `sudo mv`。
- Windows 路径/转义：PowerShell 里注意反斜杠与引号，必要时使用 WSL 或 Git Bash。
- 需要持久化：优先使用命名卷/绑定挂载，而非频繁 `docker cp`。

## 网络与数据

```bash
docker network ls
docker volume ls
```

## Compose

```bash
docker compose up -d
docker compose down
```

## 常见场景

- 构建并运行：
  ```bash
  docker build -t myapp:1.0 .
  docker run -d --name myapp -p 3000:3000 myapp:1.0
  ```

## 参考

- Docker 文档：`https://docs.docker.com/`

## 最佳实践

### 多阶段构建（Node 示例）

```dockerfile
# 1. 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev=false
COPY . .
RUN npm run build

# 2. 运行阶段（更小镜像，非 root）
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S app && adduser -S app -G app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node","dist/index.js"]
```

`.dockerignore` 建议：

```
node_modules
.git
dist
.DS_Store
*.log
```

### Compose 模板

开发版（挂载源码、热更新）：

```yaml
services:
  web:
    image: node:20-alpine
    working_dir: /app
    volumes:
      - ./:/app
      - /app/node_modules
    command: npm run dev
    ports:
      - 3000:3000
    environment:
      - NODE_ENV=development
```

生产版（仅挂 dist、健康检查、重启策略）：

```yaml
services:
  web:
    build: .
    ports:
      - 3000:3000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
```

### 清理与排障

```bash
# 查看磁盘占用
docker system df

# 清理无用数据（危险：会删无引用镜像/容器/网络）
docker system prune -f
docker image prune -a -f
docker volume prune -f
docker network prune -f

# 事件、检查与排障
docker events
docker inspect <img|container>
docker top <container>
```

### 网络与数据

```bash
# 自定义网络（容器可通过服务名互联）
docker network create app-net
docker run --network app-net --name api ...
docker run --network app-net --name web ...

# 卷备份/恢复（示例）
docker run --rm -v myvol:/d -v $(pwd):/b alpine sh -c "cd /d && tar czf /b/myvol.tgz ."
docker run --rm -v myvol:/d -v $(pwd):/b alpine sh -c "cd /d && tar xzf /b/myvol.tgz"
```

### 多架构构建（buildx）

```bash
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 -t repo/myapp:1.0 --push .
```

## 生产安全案例：MySQL / Redis

### MySQL（最小可用且较安全）

```yaml
services:
  mysql:
    image: mysql:8.0
    container_name: mysql
    restart: unless-stopped
    command: [
      "--default-authentication-plugin=mysql_native_password",
      "--character-set-server=utf8mb4",
      "--collation-server=utf8mb4_unicode_ci",
      "--max_connections=300"
    ]
    environment:
      - MYSQL_DATABASE=app
      - MYSQL_USER=app
      - MYSQL_PASSWORD=${MYSQL_PASSWORD}
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
    volumes:
      - mysql-data:/var/lib/mysql
      - ./mysql/conf.d:/etc/mysql/conf.d:ro
      - ./mysql/initdb:/docker-entrypoint-initdb.d:ro
    networks:
      - app-net
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "127.0.0.1"]
      interval: 30s
      timeout: 5s
      retries: 5

  api:
    image: repo/myapp:1.0
    environment:
      - DATABASE_URL=mysql://app:${MYSQL_PASSWORD}@mysql:3306/app
    depends_on:
      mysql:
        condition: service_healthy
    networks:
      - app-net

volumes:
  mysql-data:

networks:
  app-net:
    driver: bridge
```

要点：
- 不暴露 3306 到公网；仅通过私有网络 `app-net` 让 `api` 访问。
- 密码使用环境变量 `.env` 提供，避免写死到 yml；生产可接入密钥管理（如 Vault/Parameter Store）。
- 只读挂载配置与初始化脚本目录（`:ro`）。

如何运行（MySQL）：

1) 准备目录与 .env（放在 compose 同级目录）

```bash
mkdir -p mysql/conf.d mysql/initdb
cat > .env <<'EOF'
MYSQL_PASSWORD=yourAppPass
MYSQL_ROOT_PASSWORD=yourRootPass
EOF
```

可选：在 `mysql/conf.d/` 下放入自定义 `my.cnf`，在 `mysql/initdb/` 下放初始化 SQL（如建表/建用户）。

2) 将上面的 compose 片段保存为 `compose.yml`，启动：

```bash
docker compose --env-file .env up -d mysql
docker compose ps
docker logs -f mysql | sed -n '1,80p'
```

3) 验证连接/初始化：

```bash
docker exec -it mysql mysql -u root -p$MYSQL_ROOT_PASSWORD -e "SHOW DATABASES;"
```

### Redis（最小可用且较安全）

```yaml
services:
  redis:
    image: redis:7-alpine
    container_name: redis
    restart: unless-stopped
    command: ["redis-server", "/usr/local/etc/redis/redis.conf"]
    volumes:
      - redis-data:/data
      - ./redis/redis.conf:/usr/local/etc/redis/redis.conf:ro
    networks:
      - app-net
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 30s
      timeout: 3s
      retries: 5

  api:
    image: repo/myapp:1.0
    environment:
      - REDIS_URL=redis://:$(REDIS_PASSWORD)@redis:6379/0
    depends_on:
      redis:
        condition: service_healthy
    networks:
      - app-net

volumes:
  redis-data:

networks:
  app-net:
    driver: bridge
```

`redis/redis.conf` 关键项（示例）：

```
bind 0.0.0.0
protected-mode yes
requirepass yourStrongPass
appendonly yes
appendfsync everysec
```

要点：
- 不映射 6379 到宿主机公网；应用走内部网络访问。
- 使用 `requirepass` 设置强密码；生产推荐私有子网 + 安全组限制。
- 开启 AOF（持久化），根据业务设置快照与 AOF 策略。

如何运行（Redis）：

1) 准备配置与目录（将密码写在 `redis.conf`）

```bash
mkdir -p redis
cat > redis/redis.conf <<'EOF'
bind 0.0.0.0
protected-mode yes
requirepass yourStrongPass
appendonly yes
appendfsync everysec
EOF
```

2) 将上面的 compose 片段保存为 `compose.yml`，启动：

```bash
docker compose up -d redis
docker compose ps
```

3) 验证连接：

```bash
docker exec -it redis redis-cli -a yourStrongPass ping
# 预期返回：PONG
```


