import { ipcRenderer } from 'electron'

export default {
  timerEnd: (): Promise<any> => ipcRenderer.invoke('timer-end'),
  restEnd: (): Promise<any> => ipcRenderer.invoke('rest-end'),
}
