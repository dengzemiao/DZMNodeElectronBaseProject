## DZMNodeElectronBaseProject

* Node: v22.12.0
* Electron: v39.x
* 自用 `Node Electron` 基础空框架，方便快速进入开发调试
* [package.json 配置字段分析](https://blog.csdn.net/zz00008888/article/details/156455603)

---

## 📁 项目结构

```
DZMNodeElectronBaseProject/
├── src/                          # 源代码目录
│   ├── main/                     # 主进程代码
│   │   └── main.js              # 主进程入口（管理窗口、系统功能）
│   ├── preload/                 # 预加载脚本
│   │   └── preload.js           # 安全桥接层（主进程 ↔ 渲染进程）
│   └── renderer/                # 渲染进程代码
│       ├── index.html           # 页面结构
│       ├── css/                 # 样式文件
│       │   └── style.css        # 主样式
│       └── js/                  # 前端脚本
│           └── renderer.js      # 页面逻辑
├── build/                       # 构建资源目录
│   ├── icons/                   # 应用图标（macOS/Windows/Linux）
│   │   ├── icon.icns           # macOS 图标
│   │   ├── icon.ico            # Windows 图标
│   │   ├── icon.png            # Linux 图标
│   │   └── linux/              # Linux 多尺寸图标
│   └── README.md               # 资源说明文档
├── scripts/                     # 脚本目录
│   └── build-icons.js          # 图标生成脚本
├── assets/                      # 资源文件（图标、图片等）
├── dist/                        # 打包输出目录
├── node_modules/               
├── package.json                 # 项目配置
├── .gitignore                   # Git 忽略文件
└── README.md                    # 项目说明
```

## 🔍 核心文件说明

### 1️⃣ **主进程 (Main Process)** - `src/main/main.js`
- **作用**：应用的入口，控制应用生命周期
- **负责**：创建窗口、系统菜单、托盘图标、文件系统操作
- **特点**：可以使用所有 Node.js 和 Electron 的主进程 API

### 2️⃣ **渲染进程 (Renderer Process)** - `src/renderer/`
- **作用**：显示用户界面
- **负责**：页面渲染、用户交互、前端逻辑
- **特点**：类似网页，可以使用 HTML/CSS/JavaScript

### 3️⃣ **预加载脚本 (Preload Script)** - `src/preload/preload.js`
- **作用**：主进程和渲染进程之间的**安全桥梁**
- **重要性**：
  - ✅ **安全**：防止渲染进程直接访问系统资源
  - ✅ **最佳实践**：只暴露需要的 API，不是整个 Node.js
  - ✅ **推荐使用**：Electron 官方强烈推荐的方式
- **使用场景**：
  - 需要在渲染进程中调用 Node.js 功能时
  - 需要与主进程通信时
  - 需要访问系统功能时（如文件系统、系统对话框等）

## 📦 需要安装的插件

### 核心依赖
```json
{
  "devDependencies": {
    "electron": "^39.2.7",              // Electron 核心框架
    "electron-builder": "^26.0.12",     // 应用打包工具
    "electron-icon-builder": "^2.0.1"   // 图标生成工具（推荐安装，提升速度）
  }
}
```

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install

# 这会安装：
# - electron（核心框架）
# - electron-builder（打包工具）
# - electron-icon-builder（图标生成，推荐安装以提升速度）
```

**💡 说明**：虽然图标生成使用 `npx` 可以不安装 `electron-icon-builder`，但安装后：
- ⚡ 速度更快（使用本地版本）
- 🔒 版本稳定（锁定版本号）
- 📦 离线可用（无需每次下载）

### 2. 运行开发模式
```bash
npm run serve        # 普通启动
npm run serve:dev    # 开发模式（自动打开开发者工具）
```

### 3. 生成应用图标（可选）
```bash
# 准备一个 1024x1024 的 PNG 源图标，命名为 source-icon.png
# 放在项目根目录，然后运行：
npm run build:icons

# 会自动生成：
# - build/icons/icon.icns  (macOS)
# - build/icons/icon.ico   (Windows)
# - build/icons/icon.png   (Linux)
```

### 4. 打包应用
```bash
npm run build          # 打包当前平台
npm run build:mac      # 打包 macOS 版本（.dmg + .zip）
npm run build:win      # 打包 Windows 版本（.exe + .zip）
npm run build:linux    # 打包 Linux 版本（AppImage + .deb）
npm run build:all      # 打包所有平台（macOS + Windows + Linux）
```

打包后的文件会输出到 `dist/` 目录。

### 5. 其他实用命令
```bash
# 只构建不打包（用于调试）
electron-builder --dir

# 指定架构打包
npm run build:mac -- --x64        # Intel Mac
npm run build:mac -- --arm64      # Apple Silicon Mac
npm run build:win -- --ia32       # 32位 Windows
npm run build:win -- --x64        # 64位 Windows

# 清理构建缓存
electron-builder clean
```

## ✨ 功能特性

- ✅ 可视化 "Hello World" 界面
- ✅ 现代化渐变设计风格
- ✅ 显示 Node、Chrome、Electron 版本信息
- ✅ 使用安全的 Preload 模式（推荐）
- ✅ 代码结构清晰，注释详细
- ✅ 规范的项目结构，易于扩展
- ✅ 开发者工具支持
- ✅ 完整的图标管理体系
- ✅ 自动化图标生成工具
- ✅ 跨平台打包（macOS、Windows、Linux）
- ✅ 详细的打包配置文档

## 🔧 开发说明

### 两种配置模式对比

#### 🔒 **安全模式（当前使用，推荐）**
```javascript
// src/main/main.js
webPreferences: {
  nodeIntegration: false,      // 禁止渲染进程直接使用 Node.js
  contextIsolation: true,      // 启用上下文隔离
  preload: path.join(__dirname, '../preload/preload.js')
}
```
- ✅ 安全性高，符合最佳实践
- ✅ 防止 XSS 攻击
- ✅ Electron 官方推荐
- ⚠️ 需要通过 preload.js 暴露 API

#### ⚡ **简单模式（学习用，不推荐生产）**
```javascript
webPreferences: {
  nodeIntegration: true,       // 允许渲染进程直接使用 Node.js
  contextIsolation: false      // 禁用上下文隔离
}
```
- ✅ 使用简单，直接访问 Node.js
- ❌ 安全性低，有潜在风险
- ❌ 不符合最佳实践

### 如何在渲染进程中使用 Node 功能？

**通过 preload 暴露的 API（安全）：**
```javascript
// 在 renderer.js 中
window.electronAPI.versions.node()  // 获取 Node 版本
window.electronAPI.sendMessage('Hello')  // 发送消息到主进程
```

## 📚 后续开发指南

### 1. 添加 IPC 通信（进程间通信）
在 `src/main/main.js` 中：
```javascript
const { ipcMain } = require('electron')
ipcMain.on('message', (event, data) => {
  console.log('收到消息:', data)
  event.reply('reply', '响应数据')
})
```

### 2. 集成前端框架
- **React**: 可以在 `src/renderer/` 中使用 Create React App
- **Vue**: 可以使用 Vue CLI + Electron
- **Vite**: 推荐使用 `vite-plugin-electron` 提升开发体验

### 3. 添加应用图标

#### 🎨 自动生成（推荐 ⭐）

**最简单的方式！一键生成所有平台图标。**

```bash
# 1. 准备源图标
#    - 尺寸：1024x1024 像素（正方形）
#    - 格式：PNG
#    - 背景：透明
#    - 命名：source-icon.png
#    - 位置：项目根目录

# 2. 运行生成命令
npm run build:icons

# 3. 完成！
#    自动生成所有需要的图标：
#    ✓ build/icons/icon.icns  (macOS)
#    ✓ build/icons/icon.ico   (Windows)  
#    ✓ build/icons/icon.png   (Linux)
#    ✓ 多尺寸 PNG (16x16 ~ 1024x1024)
```

#### 🌐 手动制作（备用方案）

如果自动生成遇到问题，可以使用在线工具：

**在线工具**：
- [CloudConvert](https://cloudconvert.com/) - PNG → ICNS/ICO（推荐）
- [ConvertICO](https://convertico.com/) - PNG → ICO
- [iConvert Icons](https://iconverticons.com/) - 全平台图标

**手动放置位置**：
- `build/icons/icon.icns` - macOS 图标
- `build/icons/icon.ico` - Windows 图标
- `build/icons/icon.png` - Linux 图标（512x512 或更大）

**图标规格**：
- macOS (.icns): 包含 16-1024 像素的多个尺寸
- Windows (.ico): 包含 16-256 像素的多个尺寸
- Linux (.png): 至少 512x512 像素，透明背景

详细说明请查看：`build/README.md`

### 4. 使用第三方包
直接 `npm install` 即可，在主进程和 preload 脚本中都可以使用 Node.js 包。

### 5. 打包配置
详细的打包配置说明（NSIS 选项、图标配置、常见坑点等）请查看项目文档。

**常用配置**：
- `oneClick`: 是否一键安装（Windows）
- `perMachine`: 单用户 vs 所有用户安装
- `allowToChangeInstallationDirectory`: 允许选择安装目录
- `createDesktopShortcut`: 创建桌面快捷方式
- 更多配置请参考 `package.json` 中的 `build` 配置项

## 🛠️ 技术栈

- **Electron**: 桌面应用框架
- **Node.js**: v22.12.0（推荐版本）
- **Chromium**: 自动包含在 Electron 中
- **electron-builder**: 跨平台打包工具

## 📖 参考资源

### 官方文档
- [Electron 官方文档](https://www.electronjs.org/docs/latest/)
- [Electron 中文文档](https://www.electronjs.org/zh/docs/latest/)
- [进程模型说明](https://www.electronjs.org/docs/latest/tutorial/process-model)
- [安全最佳实践](https://www.electronjs.org/docs/latest/tutorial/security)

### 打包相关
- [electron-builder 官方文档](https://www.electron.build/)
- [macOS 配置](https://www.electron.build/configuration/mac)
- [Windows 配置](https://www.electron.build/configuration/win)
- [Linux 配置](https://www.electron.build/configuration/linux)

### 项目文档
- `build/README.md` - 构建资源和图标说明
- `build/icons/README.md` - 图标快速指南
- `src/` 目录下的各文件 - 详细的代码注释

## 📋 完整命令列表

```bash
# 开发命令
npm run serve           # 启动应用
npm run serve:dev       # 启动应用（开发者工具）

# 图标生成
npm run build:icons     # 自动生成所有平台图标 ⭐ 推荐

# 打包命令
npm run build           # 打包当前平台
npm run build:mac       # 打包 macOS
npm run build:win       # 打包 Windows
npm run build:linux     # 打包 Linux
npm run build:all       # 打包所有平台
```

## 💡 常见问题

### Q: 如何生成图标？
A: 在项目根目录放置 `source-icon.png`（1024x1024，透明背景），运行 `npm run build:icons` 即可自动生成

### Q: 图标不显示？
A: 确保图标文件存在于 `build/icons/` 目录，并且格式正确（macOS 用 .icns，Windows 用 .ico）

### Q: 打包体积太大？
A: 在 `package.json` 的 `build.files` 中只包含必要的文件，排除不需要的依赖

### Q: Windows 安装提示权限错误？
A: 设置 `nsis.perMachine: false` 使用单用户安装，或者 `nsis.allowElevation: true` 允许提升权限

### Q: macOS 提示应用已损坏？
A: 开发阶段用户可执行 `sudo xattr -cr /Applications/YourApp.app`，生产环境需要进行代码签名和公证

### Q: 如何调试打包问题？
A: 使用 `electron-builder --dir` 只构建不打包，或使用 `DEBUG=electron-builder electron-builder` 查看详细日志

更多问题和解决方案请参考项目文档。

---

**Happy Coding! 🚀**
