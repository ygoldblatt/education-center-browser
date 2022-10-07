const { app, BrowserWindow, Menu, BrowserView, webContents, shell, autoUpdater } = require('electron');
const path = require('path');
const ipcMain = require('electron').ipcMain;

// Auto update settings
const server = 'education-center.vercel.app';
const url = `${server}/update/${process.platform}/${app.getVersion()}`;

autoUpdater.setFeedURL({ url });

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// Check for updates to app
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)

// If updates are available, then download and install the updates
autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail:
      'A new version has been downloaded. Restart the application to apply the updates.',
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    show: false,
    minHeight: 600,
    minWidth: 800,
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });
  

  // Load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.removeMenu();
    mainWindow.maximize()
    mainWindow.show();
    
  });

  
  // Open DevTools
  //mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('load-webpage', (event, url) => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  var parentBounds = mainWindow.getContentBounds();
  var baseHeight = Math.ceil(parseInt(parentBounds.height));
  var adjustedHeight = baseHeight - Math.ceil(baseHeight/10);

  var view = new BrowserView({
    contextIsolation: true,
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: false,
      nativeWindowOpen: true,
    },
  });
  view.setAutoResize({ width: true, height: true });


  let ua = view.webContents.userAgent;
  ua = ua.replace(/Education Center\/[0-9\.-]*/,'');
  ua = ua.replace(/Electron\/*/,'');
  view.webContents.userAgent = ua;

  mainWindow.setBrowserView(view);
  view.setBounds({x: 0, y: 0, width: parentBounds.width, height: adjustedHeight});
  view.webContents.loadURL(url);
  console.log(view.WebContents);
  //view.webContents.openDevTools();

  let wc = view.webContents;
  wc.addListener('new-window', (event, url, frameName, disposition, options, additionalFeatures, referrer, postBody) => {
    event.preventDefault();
    view.webContents.loadURL(url);
  })
  return 'Success';
})

ipcMain.handle('nav-app', (event, direction) => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  var webView = mainWindow.getBrowserView();
  webView.webContents.focus();
  if (direction === 'home') {
    webView.webContents.destroy();
  } else if (direction === 'back') {
    webView.webContents.goToIndex(0);
  }
})