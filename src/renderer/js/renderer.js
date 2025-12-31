/**
 * 渲染进程脚本 (Renderer Process)
 * 
 * 渲染进程负责：
 * 1. 页面 UI 渲染和用户交互
 * 2. 通过 preload 暴露的 API 与主进程通信
 * 3. 处理前端逻辑
 * 
 * ⚠️ 注意：
 * - 如果使用安全配置（contextIsolation: true），只能通过 window.electronAPI 访问 Node 功能
 * - 如果使用简单配置（nodeIntegration: true），可以直接使用 require
 */

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
  console.log('✅ 页面加载完成')
  
  // 显示版本信息
  displayVersionInfo()
})

/**
 * 显示版本信息
 * 使用 preload 脚本暴露的安全 API
 */
function displayVersionInfo() {
  // 检查 electronAPI 是否可用（安全模式）
  if (window.electronAPI) {
    // 通过 preload 暴露的 API 获取版本信息
    document.getElementById('node-version').textContent = window.electronAPI.versions.node()
    document.getElementById('chrome-version').textContent = window.electronAPI.versions.chrome()
    document.getElementById('electron-version').textContent = window.electronAPI.versions.electron()
  } else {
    // 简单模式：直接访问 process（不推荐，但更简单）
    document.getElementById('node-version').textContent = process.versions.node
    document.getElementById('chrome-version').textContent = process.versions.chrome
    document.getElementById('electron-version').textContent = process.versions.electron
  }
}

/**
 * 按钮点击事件处理
 */
function handleClick() {
  alert('🎉 欢迎使用 Electron！\n\n这是一个跨平台的桌面应用程序！')
  
  // 示例：如果需要与主进程通信
  // if (window.electronAPI) {
  //   window.electronAPI.sendMessage('Hello from renderer!')
  // }
}

/**
 * 📌 后续可以在这里添加：
 * 
 * 1. 与主进程通信
 * window.electronAPI.sendMessage('data')
 * window.electronAPI.onMessage((data) => { ... })
 * 
 * 2. 异步调用主进程方法
 * const result = await window.electronAPI.invoke('method-name', data)
 * 
 * 3. DOM 操作和事件监听
 * document.getElementById('btn').addEventListener('click', () => { ... })
 * 
 * 4. 使用前端框架
 * React、Vue、Angular 等都可以在这里集成
 */

