import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import isDev from 'electron-is-dev'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { title } from './configs'

let mainWindow: BrowserWindow | null = null
function createWindow() {
  mainWindow = new BrowserWindow({
    height: 400,
    width: 400,
    title,
    maximizable: false,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      preload: join(__dirname, 'preload.js'),
    },
  })
  if (isDev) {
    mainWindow.loadURL('http://localhost:3060')
  } else {
    mainWindow.loadURL(`file://${__dirname}/../index.html`)
  }
  mainWindow.removeMenu()
  mainWindow.title = title
  installExtension(REACT_DEVELOPER_TOOLS)
  if (isDev) {
    mainWindow.webContents.openDevTools({
      mode: 'detach',
    })
  }
}

app.on('ready', () => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
