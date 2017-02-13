const { app, BrowserWindow } = require('electron');

// keep reference to window object otherwise it will be
// closed automatically when the JS object is garbage collected.
let win;

function createWindow () {

  // start express server
  app.server = require(__dirname + '/server.js')();

  // configure window and load app
  if (process.env.NODE_ENV == 'production') {
    win = new BrowserWindow({ fullscreen: true });
  } else {
    win = new BrowserWindow({
      width: 1200,
      height: 1000
    });
    win.webContents.openDevTools();
  }

  win.loadURL('http://localhost:3000');

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
