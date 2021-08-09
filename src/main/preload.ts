import { contextBridge, ipcRenderer } from 'electron'
import electronService from './bridge/electron'
import { VALID_CHANNELS } from './utils'
ipcRenderer.setMaxListeners(0)

contextBridge.exposeInMainWorld('electron', electronService)
contextBridge.exposeInMainWorld('api', {
  ipcRendererOnce: (channel: string, func: (...args: any[]) => void) => {
    if (VALID_CHANNELS.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args))
    }
  },
  ipcRendererReceive: (channel: string, func: (...args: any) => void) => {
    if (VALID_CHANNELS.includes(channel)) {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  },
})
