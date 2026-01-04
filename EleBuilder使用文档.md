# Electron Builder 使用文档

## 📦 基础配置

### package.json 基本结构

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "description": "应用描述",
  "author": "作者名 <email@example.com>",
  "main": "src/main/main.js",
  "build": {
    // electron-builder 配置
  }
}
```

## 🎯 核心配置项详解

### 1. 通用配置 (Common)

```json
{
  "build": {
    "appId": "com.company.appname",           // 应用 ID（必填，格式：com.公司.应用名）
    "productName": "应用名称",                 // 应用显示名称
    "copyright": "Copyright © 2025 Your Name", // 版权信息
    
    "directories": {
      "output": "dist",                       // 打包输出目录
      "buildResources": "build"               // 构建资源目录（存放图标等）
    },
    
    "files": [                                // 要打包的文件
      "src/**/*",
      "package.json"
    ],
    
    "extraResources": [                       // 额外资源（运行时访问）
      {
        "from": "assets/",
        "to": "assets/"
      }
    ],
    
    "asar": true,                             // 是否使用 asar 归档（推荐）
    "compression": "normal"                   // 压缩级别：store, normal, maximum
  }
}
```

---

## 🍎 macOS 配置

### 完整配置示例

```json
{
  "build": {
    "mac": {
      "target": [
        {
          "target": "dmg",                    // DMG 安装包
          "arch": ["x64", "arm64"]            // 支持 Intel 和 Apple Silicon
        },
        "zip"                                 // ZIP 压缩包（用于自动更新）
      ],
      
      "icon": "build/icons/icon.icns",        // macOS 图标（必须是 .icns 格式）
      "category": "public.app-category.productivity",  // 应用类别
      "type": "distribution",                 // distribution 或 development
      
      "hardenedRuntime": true,                // 启用强化运行时（公证需要）
      "gatekeeperAssess": false,              // 是否进行 Gatekeeper 评估
      "entitlements": "build/entitlements.mac.plist",  // 权限配置
      "entitlementsInherit": "build/entitlements.mac.plist",
      
      "darkModeSupport": true,                // 支持深色模式
      "minimumSystemVersion": "10.15.0"       // 最低系统版本
    },
    
    "dmg": {
      "title": "${productName} ${version}",   // DMG 窗口标题
      "icon": "build/icons/dmg-icon.icns",   // DMG 图标（可选）
      "background": "build/dmg-background.png",  // DMG 背景图（可选）
      "window": {
        "width": 540,
        "height": 380
      },
      "contents": [                           // DMG 窗口内容布局
        {
          "x": 140,
          "y": 180
        },
        {
          "x": 400,
          "y": 180,
          "type": "link",
          "path": "/Applications"
        }
      ]
    }
  }
}
```

### macOS 应用类别选项

```
public.app-category.business                // 商务
public.app-category.developer-tools        // 开发工具
public.app-category.education              // 教育
public.app-category.entertainment          // 娱乐
public.app-category.finance                // 财务
public.app-category.games                  // 游戏
public.app-category.graphics-design        // 图形设计
public.app-category.lifestyle              // 生活方式
public.app-category.medical                // 医疗
public.app-category.music                  // 音乐
public.app-category.news                   // 新闻
public.app-category.photography            // 摄影
public.app-category.productivity           // 效率工具
public.app-category.reference              // 参考资料
public.app-category.social-networking      // 社交网络
public.app-category.sports                 // 体育
public.app-category.travel                 // 旅游
public.app-category.utilities              // 实用工具
public.app-category.video                  // 视频
public.app-category.weather                // 天气
```

---

## 🪟 Windows 配置

### 完整配置示例

```json
{
  "build": {
    "win": {
      "target": [
        {
          "target": "nsis",                   // NSIS 安装程序（推荐）
          "arch": ["x64", "ia32"]             // 64位 和 32位
        },
        "portable",                           // 便携版（绿色版）
        "zip"                                 // ZIP 压缩包
      ],
      
      "icon": "build/icons/icon.ico",         // Windows 图标（必须是 .ico 格式）
      "artifactName": "${productName}-${version}-${arch}.${ext}",  // 文件命名格式
      
      "requestedExecutionLevel": "asInvoker", // 执行级别：asInvoker, highestAvailable, requireAdministrator
      "signAndEditExecutable": true,          // 签名和编辑可执行文件
      "verifyUpdateCodeSignature": false      // 验证更新签名
    },
    
    "nsis": {
      // ===== 安装模式 =====
      "oneClick": false,                      // ❌ 关闭一键安装（默认 true）
      "allowElevation": true,                 // ✅ 允许提升权限
      "allowToChangeInstallationDirectory": true,  // ✅ 允许用户选择安装目录
      
      // ===== 安装范围 =====
      "perMachine": false,                    // ❌ 单用户安装（true = 所有用户）
      
      // ===== 快捷方式 =====
      "createDesktopShortcut": true,          // ✅ 创建桌面快捷方式
      "createStartMenuShortcut": true,        // ✅ 创建开始菜单快捷方式
      "shortcutName": "应用名称",              // 快捷方式名称（默认使用 productName）
      
      // ===== 安装界面 =====
      "installerIcon": "build/icons/installer.ico",      // 安装程序图标
      "uninstallerIcon": "build/icons/uninstaller.ico",  // 卸载程序图标
      "installerHeader": "build/installer-header.bmp",   // 安装程序顶部图片（150x57）
      "installerSidebar": "build/installer-sidebar.bmp", // 安装程序侧边图片（164x314）
      "uninstallerSidebar": "build/installer-sidebar.bmp",
      
      // ===== 其他选项 =====
      "runAfterFinish": true,                 // ✅ 安装完成后运行应用
      "deleteAppDataOnUninstall": false,      // ❌ 卸载时删除用户数据
      "include": "build/installer.nsh",       // 自定义 NSIS 脚本
      
      // ===== 语言 =====
      "language": "2052",                     // 语言代码（2052 = 简体中文）
      "multiLanguageInstaller": false,        // 多语言安装程序
      
      // ===== 文件关联（可选）=====
      "fileAssociation": [
        {
          "ext": "myext",
          "name": "My File Type",
          "description": "My File Description",
          "icon": "build/icons/file-icon.ico"
        }
      ]
    },
    
    "portable": {                             // 便携版配置
      "artifactName": "${productName}-${version}-portable.${ext}"
    }
  }
}
```

### Windows 常用配置组合

#### 1️⃣ 企业级安装程序（推荐）
```json
{
  "nsis": {
    "oneClick": false,                        // 自定义安装
    "allowElevation": true,
    "allowToChangeInstallationDirectory": true,
    "perMachine": true,                       // 所有用户可用
    "createDesktopShortcut": true,
    "runAfterFinish": true
  }
}
```

#### 2️⃣ 快速安装（个人用户）
```json
{
  "nsis": {
    "oneClick": true,                         // 一键安装
    "perMachine": false,                      // 当前用户
    "createDesktopShortcut": true
  }
}
```

#### 3️⃣ 绿色便携版
```json
{
  "win": {
    "target": ["portable"]
  }
}
```

### NSIS 语言代码

```
1028 = 繁体中文
1033 = 英语
1041 = 日语
1042 = 韩语
1049 = 俄语
2052 = 简体中文
```

---

## 🐧 Linux 配置

### 完整配置示例

```json
{
  "build": {
    "linux": {
      "target": [
        "AppImage",                           // AppImage（推荐，通用）
        "deb",                                // Debian/Ubuntu
        "rpm",                                // RedHat/Fedora/CentOS
        "snap",                               // Snap
        "tar.gz"                              // 压缩包
      ],
      
      "icon": "build/icons/",                 // Linux 图标目录（需要多个尺寸）
      "category": "Utility",                  // 应用类别
      "maintainer": "Your Name <email@example.com>",
      "vendor": "Your Company",
      "desktop": {                            // .desktop 文件配置
        "Name": "应用名称",
        "Comment": "应用描述",
        "Terminal": false,
        "Type": "Application",
        "Icon": "app-icon"
      }
    },
    
    "appImage": {
      "license": "LICENSE"                    // 许可证文件
    },
    
    "deb": {
      "depends": [                            // 依赖包
        "gconf2",
        "gconf-service",
        "libnotify4",
        "libxtst6",
        "libnss3"
      ]
    }
  }
}
```

### Linux 应用类别

```
AudioVideo      // 音视频
Audio           // 音频
Video           // 视频
Development     // 开发
Education       // 教育
Game            // 游戏
Graphics        // 图形
Network         // 网络
Office          // 办公
Science         // 科学
Settings        // 设置
System          // 系统
Utility         // 实用工具
```

---

## 🖼️ Icon 配置和存放结构

### 推荐的目录结构

```
project/
├── build/                        # 构建资源目录
│   ├── icons/                    # 图标目录
│   │   ├── icon.icns            # macOS 图标（必须）
│   │   ├── icon.ico             # Windows 图标（必须）
│   │   ├── icon.png             # Linux 图标（至少 512x512）
│   │   ├── installer.ico        # Windows 安装程序图标
│   │   ├── uninstaller.ico      # Windows 卸载程序图标
│   │   ├── dmg-icon.icns        # macOS DMG 图标（可选）
│   │   └── linux/               # Linux 多尺寸图标（推荐）
│   │       ├── 16x16.png
│   │       ├── 24x24.png
│   │       ├── 32x32.png
│   │       ├── 48x48.png
│   │       ├── 64x64.png
│   │       ├── 128x128.png
│   │       ├── 256x256.png
│   │       └── 512x512.png
│   ├── installer-header.bmp     # Windows 安装程序顶部图（150x57）
│   ├── installer-sidebar.bmp    # Windows 安装程序侧边图（164x314）
│   ├── dmg-background.png       # macOS DMG 背景图（可选）
│   └── entitlements.mac.plist   # macOS 权限配置
├── src/
└── package.json
```

### Icon 尺寸要求

#### macOS (.icns)
- 必须包含以下尺寸：16x16, 32x32, 64x64, 128x128, 256x256, 512x512, 1024x1024
- 使用工具生成：
  - [iconutil](https://developer.apple.com/library/archive/documentation/GraphicsAnimation/Conceptual/HighResolutionOSX/Optimizing/Optimizing.html)（官方）
  - [electron-icon-builder](https://www.npmjs.com/package/electron-icon-builder)
  - 在线工具：[CloudConvert](https://cloudconvert.com/png-to-icns)

#### Windows (.ico)
- 必须包含：16x16, 24x24, 32x32, 48x48, 64x64, 128x128, 256x256
- 使用工具生成：
  - [electron-icon-builder](https://www.npmjs.com/package/electron-icon-builder)
  - 在线工具：[ConvertICO](https://convertico.com/)
  - Photoshop 或 GIMP

#### Linux (.png)
- 推荐提供：16x16, 24x24, 32x32, 48x48, 64x64, 128x128, 256x256, 512x512
- 最小要求：至少一个 512x512 的 PNG

### 快速生成图标脚本

安装工具：
```bash
npm install --save-dev electron-icon-builder
```

创建脚本 `scripts/build-icons.js`：
```javascript
const iconBuild = require('electron-icon-builder')

iconBuild({
  input: './source-icon.png',  // 源图片（至少 1024x1024）
  output: './build',
  flatten: false
}).then(() => {
  console.log('✅ 图标生成完成')
}).catch(err => {
  console.error('❌ 图标生成失败:', err)
})
```

添加到 `package.json`：
```json
{
  "scripts": {
    "build:icons": "node scripts/build-icons.js"
  }
}
```

---

## ⚠️ 常见坑点和解决方案

### 1. ❌ 图标不显示

**问题**：打包后应用图标是默认图标

**解决方案**：
- 确保图标文件存在且路径正确
- macOS 必须是 `.icns` 格式，Windows 必须是 `.ico` 格式
- 图标必须包含所有必需的尺寸
- 检查 `build/icons/` 目录是否在打包范围内

```json
{
  "build": {
    "directories": {
      "buildResources": "build"  // 确保指向正确的资源目录
    }
  }
}
```

### 2. ❌ 打包体积过大

**问题**：打包后文件超过 200MB

**解决方案**：
```json
{
  "build": {
    "asar": true,                    // 启用 asar 归档
    "compression": "maximum",        // 最大压缩
    "files": [                       // 只打包需要的文件
      "src/**/*",
      "package.json",
      "!node_modules/**/*.md",       // 排除 markdown
      "!node_modules/**/LICENSE",    // 排除 LICENSE
      "!node_modules/**/*.map"       // 排除 source map
    ]
  }
}
```

使用 `npm prune --production` 移除开发依赖后再打包。

### 3. ❌ Windows 安装失败

**问题**：安装时提示权限错误

**解决方案**：
```json
{
  "win": {
    "requestedExecutionLevel": "asInvoker"  // 不要求管理员权限
  },
  "nsis": {
    "perMachine": false,                    // 单用户安装
    "allowElevation": true                  // 允许但不强制提升权限
  }
}
```

### 4. ❌ macOS 打开提示"已损坏"

**问题**：macOS 提示应用已损坏无法打开

**原因**：未签名或未公证

**临时解决**（开发阶段）：
```bash
# 用户执行以下命令
sudo xattr -cr /Applications/YourApp.app
```

**正式解决**：
1. 注册 Apple Developer 账号
2. 配置代码签名
3. 进行应用公证（Notarization）

```json
{
  "mac": {
    "hardenedRuntime": true,
    "gatekeeperAssess": false,
    "entitlements": "build/entitlements.mac.plist",
    "entitlementsInherit": "build/entitlements.mac.plist"
  }
}
```

`build/entitlements.mac.plist`：
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
  <true/>
  <key>com.apple.security.cs.allow-jit</key>
  <true/>
  <key>com.apple.security.cs.disable-library-validation</key>
  <true/>
</dict>
</plist>
```

### 5. ❌ 依赖的原生模块打包失败

**问题**：使用了 sqlite3、node-sass 等原生模块

**解决方案**：
```bash
# 安装 electron-rebuild
npm install --save-dev electron-rebuild

# 在 package.json 添加脚本
{
  "scripts": {
    "rebuild": "electron-rebuild -f -w your-native-module"
  }
}

# 打包前重新编译
npm run rebuild
```

或使用 `electron-builder` 自动重建：
```json
{
  "build": {
    "electronRebuild": true
  }
}
```

### 6. ❌ 多平台打包问题

**问题**：在 macOS 上无法打包 Windows 版本

**解决方案**：
```bash
# macOS/Linux 打包 Windows 需要 wine
brew install wine

# Windows 打包 macOS 基本不可能，建议使用 CI/CD
# 推荐使用 GitHub Actions
```

### 7. ❌ 应用更新失败

**问题**：自动更新不工作

**解决方案**：
```json
{
  "build": {
    "publish": {
      "provider": "github",
      "owner": "your-username",
      "repo": "your-repo"
    }
  }
}
```

在代码中：
```javascript
const { autoUpdater } = require('electron-updater')

autoUpdater.checkForUpdatesAndNotify()
```

### 8. ❌ 打包后找不到资源文件

**问题**：开发环境正常，打包后图片/文件加载失败

**解决方案**：
```javascript
// ❌ 错误写法
const imagePath = './assets/image.png'

// ✅ 正确写法（开发和生产环境都适用）
const path = require('path')
const imagePath = app.isPackaged
  ? path.join(process.resourcesPath, 'assets/image.png')
  : path.join(__dirname, '../assets/image.png')
```

或将资源放入 extraResources：
```json
{
  "build": {
    "extraResources": [
      {
        "from": "assets/",
        "to": "assets/"
      }
    ]
  }
}
```

### 9. ❌ 中文路径问题

**问题**：安装路径包含中文时出错

**解决方案**：
```json
{
  "nsis": {
    "unicode": true  // 启用 Unicode 支持
  }
}
```

### 10. ❌ asar 归档后无法读取文件

**问题**：某些文件需要在运行时修改或访问

**解决方案**：
```json
{
  "build": {
    "asarUnpack": [       // 不打包到 asar 中
      "node_modules/your-module/**/*",
      "data/**/*"
    ]
  }
}
```

---

## 📋 完整配置模板

### 实用的生产环境配置

```json
{
  "name": "your-app",
  "version": "1.0.0",
  "description": "Your App Description",
  "author": "Your Name <email@example.com>",
  "main": "src/main/main.js",
  
  "scripts": {
    "serve": "electron .",
    "serve:dev": "electron . --dev",
    "build": "electron-builder",
    "build:mac": "electron-builder --mac",
    "build:win": "electron-builder --win",
    "build:linux": "electron-builder --linux",
    "build:all": "electron-builder -mwl"
  },
  
  "build": {
    "appId": "com.yourcompany.yourapp",
    "productName": "YourApp",
    "copyright": "Copyright © 2025 Your Company",
    
    "directories": {
      "output": "dist",
      "buildResources": "build"
    },
    
    "files": [
      "src/**/*",
      "package.json"
    ],
    
    "asar": true,
    "compression": "normal",
    
    "mac": {
      "target": ["dmg", "zip"],
      "icon": "build/icons/icon.icns",
      "category": "public.app-category.productivity",
      "hardenedRuntime": true,
      "gatekeeperAssess": false,
      "darkModeSupport": true
    },
    
    "dmg": {
      "title": "${productName} ${version}",
      "window": {
        "width": 540,
        "height": 380
      }
    },
    
    "win": {
      "target": ["nsis", "zip"],
      "icon": "build/icons/icon.ico",
      "requestedExecutionLevel": "asInvoker"
    },
    
    "nsis": {
      "oneClick": false,
      "allowElevation": true,
      "allowToChangeInstallationDirectory": true,
      "perMachine": false,
      "createDesktopShortcut": true,
      "createStartMenuShortcut": true,
      "shortcutName": "${productName}",
      "runAfterFinish": true,
      "installerIcon": "build/icons/installer.ico",
      "uninstallerIcon": "build/icons/uninstaller.ico",
      "language": "2052"
    },
    
    "linux": {
      "target": ["AppImage", "deb"],
      "icon": "build/icons/",
      "category": "Utility"
    }
  }
}
```

---

## 🔧 实用命令

```bash
# 只构建不打包（用于调试）
electron-builder --dir

# 指定架构
electron-builder --mac --x64
electron-builder --win --ia32

# 跳过依赖安装
electron-builder --publish never

# 查看详细日志
DEBUG=electron-builder electron-builder

# 清理缓存
electron-builder clean
```

---

## 📚 参考资源

- [electron-builder 官方文档](https://www.electron.build/)
- [配置参考](https://www.electron.build/configuration/configuration)
- [macOS 配置](https://www.electron.build/configuration/mac)
- [Windows 配置](https://www.electron.build/configuration/win)
- [Linux 配置](https://www.electron.build/configuration/linux)
- [代码签名](https://www.electron.build/code-signing)

---

**祝你打包顺利！🚀**

