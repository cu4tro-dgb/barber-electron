import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import url from 'node:url'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  }).loadURL(process.env.VITE_DEV_SERVER_URL as string)
}

app.whenReady().then(() => {
  createWindow()
})
