/**
 * 图标生成脚本
 * 
 * 使用方法：
 * 1. 准备一个 1024x1024 的 PNG 源图标
 * 2. 放在项目根目录，命名为 source-icon.png
 * 3. 安装依赖：npm install --save-dev electron-icon-builder
 * 4. 运行脚本：npm run build:icons
 * 
 * 会自动生成：
 * - macOS: icon.icns
 * - Windows: icon.ico  
 * - Linux: 多尺寸 PNG
 */

const iconBuild = require('electron-icon-builder')
const path = require('path')
const fs = require('fs')

// 源图标路径
const sourceIcon = path.join(__dirname, '../source-icon.png')

// 检查源图标是否存在
if (!fs.existsSync(sourceIcon)) {
  console.error('❌ 错误：找不到源图标文件')
  console.error('📝 请在项目根目录放置一个 1024x1024 的 PNG 图标，命名为 source-icon.png')
  console.error('💡 提示：可以使用 Figma、Sketch、Photoshop 等工具设计图标')
  process.exit(1)
}

console.log('🚀 开始生成图标...')
console.log('📂 源图标:', sourceIcon)

iconBuild({
  input: sourceIcon,
  output: path.join(__dirname, '../build'),
  flatten: false,  // 保持目录结构
  names: {
    icns: 'icons/icon',
    ico: 'icons/icon',
    png: 'icons/icon'
  }
}).then(() => {
  console.log('✅ 图标生成成功！')
  console.log('📁 输出目录: build/icons/')
  console.log('')
  console.log('生成的文件：')
  console.log('  ✓ build/icons/icon.icns  (macOS)')
  console.log('  ✓ build/icons/icon.ico   (Windows)')
  console.log('  ✓ build/icons/icon.png   (Linux)')
  console.log('')
  console.log('🎉 现在可以打包应用了：npm run build')
}).catch(err => {
  console.error('❌ 图标生成失败:', err)
  console.error('')
  console.error('常见问题：')
  console.error('1. 确保已安装 electron-icon-builder: npm install --save-dev electron-icon-builder')
  console.error('2. 确保源图标是有效的 PNG 格式')
  console.error('3. 确保源图标尺寸至少 1024x1024')
  process.exit(1)
})

