/**
 * Preload Script - 预加载脚本
 * 
 * 作用：在渲染进程加载网页之前执行，是主进程和渲染进程之间的桥梁
 * 
 * 为什么需要 preload.js？
 * 1. 安全性：开启 contextIsolation 后，渲染进程无法直接访问 Node.js API
 * 2. 最佳实践：通过 contextBridge 暴露特定的 API，而不是暴露整个 Node.js
 * 3. 避免安全漏洞：防止恶意网页代码访问系统资源
 */

const { contextBridge, ipcRenderer } = require('electron')

// 向渲染进程暴露安全的 API
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取版本信息
  versions: {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron
  },
  
  // 示例：发送消息到主进程
  sendMessage: (message) => {
    ipcRenderer.send('message-from-renderer', message)
  },
  
  // 示例：接收来自主进程的消息
  onMessage: (callback) => {
    ipcRenderer.on('message-from-main', (event, ...args) => callback(...args))
  },
  
  // 示例：调用主进程方法并获取返回值
  invoke: (channel, data) => {
    return ipcRenderer.invoke(channel, data)
  }
})

console.log('✅ Preload script loaded successfully')

