/**
 * 图标生成脚本
 * 
 * 使用方法：
 * 1. 准备一个 1024x1024 的 PNG 源图标
 * 2. 放在项目根目录，命名为 source-icon.png
 * 3. 运行脚本：npm run build:icons
 * 
 * 依赖说明：
 * - 使用 npx 运行 electron-icon-builder（推荐已安装到 devDependencies）
 * - 如果已安装，npx 会使用本地版本（速度快 ⚡）
 * - 如果未安装，npx 会临时下载（较慢，需要网络）
 * 
 * 会自动生成：
 * - macOS: icon.icns
 * - Windows: icon.ico  
 * - Linux: 多尺寸 PNG
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

// 源图标路径
const sourceIcon = path.join(__dirname, '../source-icon.png')
const outputDir = path.join(__dirname, '../build')

// 检查源图标是否存在
if (!fs.existsSync(sourceIcon)) {
  console.error('❌ 错误：找不到源图标文件')
  console.error('📝 请在项目根目录放置一个 1024x1024 的 PNG 图标，命名为 source-icon.png')
  console.error('')
  console.error('💡 图标设计建议：')
  console.error('   • 尺寸：1024x1024 像素（正方形）')
  console.error('   • 格式：PNG 格式，透明背景')
  console.error('   • 内容：简洁清晰，预留约 10% 安全边距')
  console.error('')
  process.exit(1)
}

console.log('🚀 开始生成图标...')
console.log('📂 源图标:', sourceIcon)
console.log('📁 输出目录:', outputDir)
console.log('')

try {
  // 使用 electron-icon-builder 命令行工具
  const command = `npx electron-icon-builder --input="${sourceIcon}" --output="${outputDir}" --flatten`
  
  console.log('⚙️  执行命令:', command)
  console.log('⏳ 正在生成图标，请稍候...')
  console.log('')
  
  // 执行命令
  execSync(command, { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  })
  
  console.log('')
  console.log('✅ 图标生成成功！')
  console.log('')
  
  // 为 Linux 创建主图标（使用 512x512）
  const linuxIconSource = path.join(outputDir, 'icons', '512x512.png')
  const linuxIconTarget = path.join(outputDir, 'icons', 'icon.png')
  
  if (fs.existsSync(linuxIconSource)) {
    fs.copyFileSync(linuxIconSource, linuxIconTarget)
    console.log('✓ 已为 Linux 创建主图标 (icon.png from 512x512.png)')
  }
  
  console.log('')
  console.log('生成的文件：')
  console.log('  ✓ build/icons/icon.icns  (macOS)')
  console.log('  ✓ build/icons/icon.ico   (Windows)')
  console.log('  ✓ build/icons/icon.png   (Linux 主图标)')
  console.log('  ✓ build/icons/16x16.png ~ 1024x1024.png (多尺寸)')
  console.log('')
  console.log('🎉 所有平台的图标都已准备就绪！')
  console.log('')
  console.log('现在可以打包应用了：')
  console.log('   npm run build          # 当前平台')
  console.log('   npm run build:mac      # macOS')
  console.log('   npm run build:win      # Windows')
  console.log('   npm run build:linux    # Linux')
  
} catch (err) {
  console.error('')
  console.error('❌ 图标生成失败')
  console.error('')
  console.error('错误信息:', err.message)
  console.error('')
  console.error('📝 常见问题排查：')
  console.error('')
  console.error('1. 确保已安装 electron-icon-builder（推荐）:')
  console.error('   npm install --save-dev electron-icon-builder')
  console.error('   （虽然 npx 可以自动下载，但安装后速度更快且版本稳定）')
  console.error('')
  console.error('2. 确保源图标是有效的 PNG 格式')
  console.error('   文件：source-icon.png')
  console.error('   尺寸：至少 1024x1024 像素')
  console.error('   格式：PNG（透明背景）')
  console.error('')
  console.error('3. 如果还是失败，可以使用在线工具手动生成：')
  console.error('   • CloudConvert: https://cloudconvert.com/')
  console.error('   • ConvertICO: https://convertico.com/')
  console.error('   • iConvert Icons: https://iconverticons.com/')
  console.error('')
  console.error('4. 手动生成后，将文件放到以下位置：')
  console.error('   - build/icons/icon.icns  (macOS)')
  console.error('   - build/icons/icon.ico   (Windows)')
  console.error('   - build/icons/512x512.png (Linux，重命名为 icon.png)')
  console.error('')
  
  process.exit(1)
}
