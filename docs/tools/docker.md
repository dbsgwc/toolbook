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


