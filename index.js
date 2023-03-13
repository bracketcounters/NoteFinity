const {app, BrowserWindow, ipcMain} = require("electron");
const windowStateKeeper = require("electron-window-state")

let win;
function createWindow() {
    let windowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 600
    });
    win = new BrowserWindow({
        width: windowState.width,
        height: windowState.height,
        x: windowState.x,
        y: windowState.y,
        autoHideMenuBar: true,
        icon: "logo.png",
        frame: false,
        minWidth: 312,
        minHeight: 120,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.loadFile("pages/index.html");
    windowState.manage(win);
    ipcMain.on("appAction", (event, data)=>{
        if (data == "maximize") {
            if (win.isMaximized()) {
                win.restore();
            }
            else {
                win.maximize();
            }
        }
        else if (data == "minimize") {
            win.minimize();
        }
        else if (data == "exit") {
            app.quit();
        }
    })
}

app.on("ready", ()=>{
    createWindow();
})

