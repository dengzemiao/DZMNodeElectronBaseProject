/**
 * 主进程 (Main Process)
 * 
 * 主进程负责：
 * 1. 创建和管理应用窗口
 * 2. 处理系统级别的操作（菜单、托盘、系统对话框等）
 * 3. 管理应用生命周期
 * 4. 与渲染进程通信
 */

const { app, BrowserWindow } = require('electron')
const path = require('path')

/**
 * 创建主窗口
 */
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // ⚠️ 安全配置（推荐方式）
      nodeIntegration: false,        // 不允许渲染进程直接使用 Node.js
      contextIsolation: true,        // 启用上下文隔离（安全）
      preload: path.join(__dirname, '../preload/preload.js')  // 使用预加载脚本
      
      // 📝 简单但不安全的方式（不推荐，但对于学习可以暂时使用）：
      // nodeIntegration: true,
      // contextIsolation: false,
    }
  })

  // 加载页面
  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))

  // 开发模式：自动打开开发者工具
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools()
  }
}

/**
 * 应用生命周期管理
 */

// 当 Electron 完成初始化时创建窗口
app.whenReady().then(() => {
  createWindow()

  // macOS 特性：点击 Dock 图标时重新创建窗口
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 当所有窗口关闭时退出应用（macOS 除外）
// macOS 应用通常在菜单栏保持活跃状态
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/**
 * 📌 后续可以在这里添加：
 * 
 * 1. IPC 通信处理
 * const { ipcMain } = require('electron')
 * ipcMain.on('channel-name', (event, data) => { ... })
 * 
 * 2. 自定义菜单
 * const { Menu } = require('electron')
 * Menu.setApplicationMenu(customMenu)
 * 
 * 3. 系统托盘
 * const { Tray } = require('electron')
 * let tray = new Tray(iconPath)
 * 
 * 4. 原生对话框
 * const { dialog } = require('electron')
 * dialog.showOpenDialog({ ... })
 */

