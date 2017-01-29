const {app, BrowserWindow} = require('electron');

// keep reference to window object otherwise it will be
// closed automatically when the JS object is garbage collected.
let win;

function createWindow () {

  // start express server
  app.server = require(__dirname + '/server.js')();

  // configure window and load app
  win = new BrowserWindow({fullscreen: true});
  win.loadURL('http://localhost:3000');
  win.webContents.openDevTools();
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow);

// quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});
