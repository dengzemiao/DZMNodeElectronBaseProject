# Build 资源目录

此目录用于存放打包时需要的资源文件。

## 📁 目录结构

```
build/
├── icons/                         # 应用图标
│   ├── icon.icns                  # macOS 图标（必须）
│   ├── icon.ico                   # Windows 图标（必须）
│   ├── icon.png                   # Linux 图标 512x512（必须）
│   ├── installer.ico              # Windows 安装程序图标（可选）
│   ├── uninstaller.ico            # Windows 卸载程序图标（可选）
│   ├── dmg-icon.icns              # macOS DMG 图标（可选）
│   └── linux/                     # Linux 多尺寸图标（推荐）
│       ├── 16x16.png
│       ├── 24x24.png
│       ├── 32x32.png
│       ├── 48x48.png
│       ├── 64x64.png
│       ├── 128x128.png
│       ├── 256x256.png
│       └── 512x512.png
├── installer-header.bmp           # Windows 安装程序顶部图 150x57（可选）
├── installer-sidebar.bmp          # Windows 安装程序侧边图 164x314（可选）
├── dmg-background.png             # macOS DMG 背景图（可选）
├── entitlements.mac.plist         # macOS 权限配置（可选）
└── README.md                      # 本说明文件
```

## 🖼️ 图标要求

### macOS (.icns)
- **格式**: ICNS
- **必需尺寸**: 16, 32, 64, 128, 256, 512, 1024 像素
- **工具**: iconutil, electron-icon-builder, CloudConvert

### Windows (.ico)  
- **格式**: ICO
- **必需尺寸**: 16, 24, 32, 48, 64, 128, 256 像素
- **工具**: electron-icon-builder, ConvertICO, GIMP

### Linux (.png)
- **格式**: PNG（透明背景）
- **推荐尺寸**: 16, 24, 32, 48, 64, 128, 256, 512 像素
- **最小要求**: 至少一个 512x512 的 PNG

## 🎨 设计建议

### 源图标要求
- **尺寸**: 至少 1024x1024 像素
- **格式**: PNG（透明背景）
- **内容**: 简洁清晰，避免过多细节
- **边距**: 保留约 10% 的安全边距

### 图标设计原则
1. **简洁明了**: 在小尺寸下也能清晰辨识
2. **一致性**: 与品牌风格保持一致
3. **透明背景**: 使用 PNG 格式，背景透明
4. **圆角处理**: 系统会自动添加圆角（macOS/iOS）
5. **颜色对比**: 确保在浅色和深色背景下都清晰可见

## 🚀 快速生成图标

### 方法一：使用 electron-icon-builder

```bash
# 安装工具
npm install --save-dev electron-icon-builder

# 创建生成脚本
node scripts/build-icons.js
```

### 方法二：在线工具

1. **图标转换**:
   - [CloudConvert](https://cloudconvert.com/) - PNG 转 ICNS/ICO
   - [ConvertICO](https://convertico.com/) - PNG 转 ICO
   - [iConvert Icons](https://iconverticons.com/) - 全平台图标

2. **图标生成器**:
   - [Electron Icon Maker](https://github.com/jaretburkett/electron-icon-maker)
   - [App Icon Generator](https://www.appicon.co/)

## 📝 使用示例

### 在 package.json 中配置

```json
{
  "build": {
    "directories": {
      "buildResources": "build"
    },
    "mac": {
      "icon": "build/icons/icon.icns"
    },
    "win": {
      "icon": "build/icons/icon.ico"
    },
    "linux": {
      "icon": "build/icons/"
    }
  }
}
```

### 生成图标脚本示例

创建 `scripts/build-icons.js`:

```javascript
const iconBuild = require('electron-icon-builder')
const path = require('path')

iconBuild({
  input: path.join(__dirname, '../source-icon.png'),
  output: path.join(__dirname, '../build'),
  flatten: false
}).then(() => {
  console.log('✅ 图标生成完成！')
  console.log('生成位置: build/icons/')
}).catch(err => {
  console.error('❌ 图标生成失败:', err)
  process.exit(1)
})
```

添加到 `package.json`:

```json
{
  "scripts": {
    "build:icons": "node scripts/build-icons.js"
  }
}
```

运行：
```bash
npm run build:icons
```

## ⚠️ 注意事项

1. **文件命名**: 必须严格按照要求命名（icon.icns, icon.ico）
2. **文件格式**: 不能使用 PNG 替代 ICNS 或 ICO
3. **图标尺寸**: 必须包含所有必需的尺寸
4. **透明背景**: 确保图标背景透明（PNG）
5. **测试**: 在各平台上测试图标显示效果

## 📖 参考资源

- [electron-builder 图标配置](https://www.electron.build/icons)
- [macOS 图标设计指南](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Windows 图标设计指南](https://docs.microsoft.com/en-us/windows/apps/design/style/iconography)
- [electron-icon-builder 文档](https://www.npmjs.com/package/electron-icon-builder)

---

**准备好你的 1024x1024 源图标，开始生成吧！** 🎨

