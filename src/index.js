const { createWindow } = require('./main');
const { app } = require('electron');

// cuando la funcion ya ha cargado ejecuta la funcion createWindow
app.whenReady().then(createWindow);
app.allowRendererProcessReuse = false;
app.disableHardwareAcceleration();