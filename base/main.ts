import path from 'node:path'
import log from 'electron-log'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import isDev from 'electron-is-dev'
import electronUpdater from 'electron-updater'
import { app, BrowserWindow, ipcMain, Notification } from 'electron'

const __dirname = path.resolve(dirname(fileURLToPath(import.meta.url)))
const { autoUpdater } = electronUpdater
let appWindow: BrowserWindow | null = null

class AppUpdater {
	constructor() {
		log.transports.file.level = 'info'
		autoUpdater.logger = log
		autoUpdater.checkForUpdatesAndNotify()
	}
}

const installExtensions = async () => {}

const spawnAppWindow = async () => {
	if (isDev) await installExtensions()

	const RESOURCES_PATH = isDev
		? path.join(__dirname, '../../assets')
		: path.join(process.resourcesPath, 'assets')

	const getAssetPath = (...paths: string[]): string => {
		return path.join(RESOURCES_PATH, ...paths)
	}
	// Platform-specific window settings
	const isMac = process.platform === 'darwin'
	const isWindows = process.platform === 'win32'

	appWindow = new BrowserWindow({
		width: isMac ? 1200 : 1000,
		height: isMac ? 800 : 700,
		minWidth: 800,
		minHeight: 600,
		icon: getAssetPath('icon.png'),
		show: false,
		webPreferences: {
			// preload: path.join(__dirname, 'preload.js'), // Fixed preload path
			// contextIsolation: true,
			nodeIntegration: true,
		},
		center: true,
		frame: !isWindows,
	})

	appWindow.setMenu(isMac ? null : null)
	appWindow.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../../renderer/build/index.html')}`
	)
	// appWindow.maximize()
	appWindow.setMenu(null)
	appWindow.show()

	if (isDev) appWindow.webContents.openDevTools({ mode: 'detach' })

	appWindow.on('closed', () => {
		appWindow = null
	})
}

app.on('ready', () => {
	new AppUpdater()
	spawnAppWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) spawnAppWindow()
})
/*
 * ======================================================================================
 *                                IPC Main Events
 * ======================================================================================
 */

ipcMain.on('notification:show', (event, arg) => {
	const { title, body } = arg
	if (Notification.isSupported()) {
		const notification = new Notification({ title, body })
		notification.show()
		return { success: true }
	} else {
		return {
			success: false,
			error: 'Notifications are not supported on this system.',
		}
	}
})
