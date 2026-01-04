# Icons 目录

## 📦 必需文件

请在此目录放置以下图标文件：

### ✅ 必须提供

- **icon.icns** - macOS 应用图标
- **icon.ico** - Windows 应用图标  
- **icon.png** - Linux 应用图标（512x512）

### 🎨 可选提供

- **installer.ico** - Windows 安装程序图标
- **uninstaller.ico** - Windows 卸载程序图标
- **dmg-icon.icns** - macOS DMG 图标

## 📁 Linux 多尺寸图标

在 `linux/` 子目录中提供以下尺寸：

```
linux/
├── 16x16.png
├── 24x24.png
├── 32x32.png
├── 48x48.png
├── 64x64.png
├── 128x128.png
├── 256x256.png
└── 512x512.png
```

## 🚀 快速生成

如果你有一个 1024x1024 的源图标（source-icon.png），可以：

```bash
# 安装工具
npm install --save-dev electron-icon-builder

# 添加脚本到 package.json
# "build:icons": "node scripts/build-icons.js"

# 生成图标
npm run build:icons
```

## 🎯 图标规格

| 平台 | 格式 | 必需尺寸 | 推荐工具 |
|------|------|----------|----------|
| macOS | .icns | 16-1024 | iconutil, CloudConvert |
| Windows | .ico | 16-256 | ConvertICO, GIMP |
| Linux | .png | 512x512 | GIMP, Inkscape |

## 📖 更多信息

查看 `build/README.md` 获取详细的图标制作指南。

