const {app, BrowserWindow, ipcMain} = require("electron");
const windowStateKeeper = require("electron-window-state")
const { DataStorage, FileStorage } = require("./src/storage");
const { Modal } = require("./src/modal");

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
        icon: "assets/icons/notefinity.png",
        frame: false,
        minWidth: 312,
        minHeight: 120,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    win.loadFile("src/pages/index.html");
    // win.webContents.openDevTools();
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

ipcMain.on("open-modal", (event, data)=>{
    switch (data) {
        case "frame":
            let modalFrame = new Modal(400, 300, win, "src/pages/customizations/frame.html", false);
            modalFrame.open();
            break;

        case "theme":
            let modalTheme = new Modal(500, 300, win, "src/pages/customizations/theme.html", false);
            modalTheme.open();
    
        default:
            break;
    }
})

ipcMain.on("check-customization-frame", (event, data)=>{
    win.webContents.send("check-customization-frame-check", true);
})

ipcMain.on("check-theme", (event, data)=>{
    win.webContents.send("check-theme-check", true);
})

app.on("ready", ()=>{
    createWindow();
    // let modalTheme = new Modal(500, 300, win, "src/pages/customizations/theme.html", false);
    // modalTheme.open();
})

