---
title: Flutter 速查
---

# Flutter 速查

Google 的 UI 工具包，通过一套代码库构建精美的移动、Web、桌面和嵌入式应用。

## 安装与环境

```powershell
# 检查环境依赖（关键）
flutter doctor

# 启用 Web 支持（按需）
flutter config --enable-web

# 启用桌面支持（按需）
flutter config --enable-windows-desktop
```

## 常用命令

| 命令 | 说明 | 示例 |
| --- | --- | --- |
| `flutter create <name>` | 创建新项目 | `flutter create my_app` |
| `flutter run` | 运行项目（调试模式） | `flutter run -d chrome` |
| `flutter build apk` | 构建 Android APK | `flutter build apk --release` |
| `flutter build ipa` | 构建 iOS 包（需 macOS） | `flutter build ipa` |
| `flutter build web` | 构建 Web 应用 | `flutter build web` |
| `flutter pub get` | 获取依赖包 | `flutter pub get` |
| `flutter clean` | 清理构建缓存 | `flutter clean` |
| `flutter upgrade` | 升级 Flutter SDK | `flutter upgrade` |

## 镜像配置（中国大陆）

设置环境变量以加速依赖下载：

**PowerShell (当前会话):**
```powershell
$env:PUB_HOSTED_URL="https://pub.flutter-io.cn"
$env:FLUTTER_STORAGE_BASE_URL="https://storage.flutter-io.cn"
```

**系统环境变量 (推荐):**
- 变量名: `PUB_HOSTED_URL`
- 变量值: `https://pub.flutter-io.cn`

- 变量名: `FLUTTER_STORAGE_BASE_URL`
- 变量值: `https://storage.flutter-io.cn`

## 参考 resources

- 官方文档：`https://flutter.dev/docs`
- 中文文档：`https://flutter.cn/docs`
- 常用包搜索：`https://pub.dev`
