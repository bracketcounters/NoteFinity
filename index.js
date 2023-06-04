const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const windowStateKeeper = require("electron-window-state")
const { DataStorage, FileStorage } = require("./src/storage");
const { Modal } = require("./src/modal");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

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
    win.webContents.openDevTools();
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
        else if (data == "reload") {
            app.relaunch();
            app.quit();
        }
    })
}

function randomString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function extensionOf(filename) {
    const parts = filename.split('.');
    if (parts.length == 1) {
      return '';
    }
    return parts.pop();
  }

  function filenameOf(filepath) {
    let parts = filepath.split("/");
    if (filepath.indexOf("\\") != -1) {
        parts = filepath.split("\\");
    }
    else {
        parts = filepath.split("/");
    }
    return parts[parts.length-1];
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
            break;
    
        case "textbox":
            let modalTextbox = new Modal(400, 550, win, "src/pages/customizations/textbox.html", false);
            modalTextbox.open();
            break;
        
        case "openrecent":
            let modalRecentFiles = new Modal(350, 500, win, "src/pages/file-actions/recentfiles.html", true);
            modalRecentFiles.open();
            break;
        case "fonts":
            let modalFonts = new Modal(300, 186, win, "src/pages/customizations/fonts.html", false);
            modalFonts.open();
            break;

        default:
            break;
    }
})

ipcMain.on("open-mode-modal", (event, data)=>{
    let modalLanguage = new Modal(320, 200, win, "src/pages/options/chooselanguage.html", true);
    modalLanguage.open();
    modalLanguage.getWebContents().then(response=>{
        response.send("languageData", data);
    })
})


ipcMain.on("check-customization-frame", (event, data)=>{
    win.webContents.send("check-customization-frame-check", true);
})

ipcMain.on("check-theme", (event, data)=>{
    win.webContents.send("check-theme-check", true);
})

ipcMain.on("check-textbox-theme", (event, data)=>{
    win.webContents.send("check-textbox-theme-check", true);
})

ipcMain.on("add-textbox-image-action", (event, data)=>{
    dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'avif'] }
          ]
    }).then(result=>{
        if (!result.canceled) {
            let filePaths = result.filePaths;
            filePaths.forEach(filepath => {
                try {
                    let storage1 = new DataStorage("bg-images", randomString(16) + "." + extensionOf(filepath));
                    let storage2 = new FileStorage(filepath);
                    storage1.setData(storage2.getBinaryData());
                    event.reply("back-textbox-image-action", true);
                }
                catch(err) {
                }
            });
        }
    }).catch(err=>{

    })
})

ipcMain.on("refresh-textbox-images", (event, data)=>{
    let storage = new DataStorage("bg-images", "");
    try {
        let files = fs.readdirSync(storage.subfolder);
        let returnableFiles = [];
        files.forEach(file=>{
            if (["png", "jpg", "avif"].includes(extensionOf(file))) {
                returnableFiles.push(path.join(storage.subfolder, file));
            }
        })
        event.reply("back-refresh-textbox-images", returnableFiles);
    }
    catch(err) {

    }
})

ipcMain.on("delete-textbox-image", (event, data)=>{
    let image = data.toString();
    let imageFile = image.split("/")
    let imagePath = imageFile[imageFile.length-1];
    try {
        let imageStorage = new DataStorage("bg-images", imagePath);
        imageStorage.delete();
        event.reply("delete-textbox-image-done", true);
    }
    catch(err) {
    }

})



ipcMain.on("getFileContents", (event, data)=>{
    let textContents = "";
    try {
        textContents = fs.readFileSync(data, "utf8");
    }
    catch(err) {
        textContents = ""
    }
    let backData = {
        filepath: data,
        contents: textContents
    }
    win.webContents.send("back-getFileContents", backData);
})

ipcMain.on("reloadFileContents", (event, data)=>{
    let textContents = "";
    try {
        textContents = fs.readFileSync(data.filepath, "utf8");
    }
    catch(err) {
        textContents = ""
    }
    let backData = {
        index: data.index,
        contents: textContents
    }
    event.reply("back-reloadFileContents", backData);
})

let supportedExtensions = [ "txt", "html", "htm", "shtml", "xhtml", "xml", "json", "md", "markdown", "yaml", "yml", "csv", "tsv", "sql", "php", "rb", "java", "py", "pl", "swift", "kt", "dart", "c", "h", "cpp", "cc", "cxx", "h", "hh", "hpp", "hxx", "cs", "fs", "fsi", "fsx", "go", "rs", "scala", "lua", "m", "mm", "perl", "sh", "bash", "zsh", "fish", "ps1", "psm1", "psd1", "tex", "log", "cfg", "ini", "conf", "plist", "bat", "cmd", "js", "css", "npmignore", "gitignore", "svg"];

ipcMain.on("fileAction", (event, data)=>{
    if (data == "openfile") {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { 
                    name: 'Text File', 
                    extensions: supportedExtensions
                }
              ]
        }).then(result=>{
            if (!result.canceled) {
                let filePath = result.filePaths[0];
                event.reply("back-openFile", filePath);
            }
        }).catch(err=>{
    
        })
    }
    else if (typeof(data) == "object") {
        if (data.action == "savefile") {
            if (data.type == "untitled") {
                dialog.showSaveDialog({
                    filters: [
                        {
                            name: "Text File",
                            extensions: supportedExtensions,
                        }
                    ]
                }).then(result=>{
                    if (!result.canceled) {
                        fs.writeFile(result.filePath, data.contents, (err)=>{
                            if (err) {
                                let returnData = {
                                    action: "untitledsave",
                                    success: false,
                                }
                                win.webContents.send("saveAlert", returnData);
                            }
                            else {
                                let returnData = {
                                    action: "untitledsave",
                                    success: true,
                                    filepath: result.filePath,
                                    index: data.index
                                }
                                win.webContents.send("saveAlert", returnData);
                            }
                        })
                    }
                }).catch(err=>{

                })
            }
            else if (data.type == "manual") {
                fs.writeFile(data.filepath, data.contents, (err)=>{
                    let returnData = {}
                    if (err) {
                        returnData = {
                            action: "manualsave",
                            success: false,
                        }
                    }
                    else {
                        returnData = {
                            action: "manualsave",
                            success: true,
                            index: data.index
                        }
                    }
                    win.webContents.send("saveAlert", returnData);
                })
            }
        }
        else if (data.action == "renameFile") {
            let renameTo = path.join(path.dirname(data.filepath), data.renameTo);
            fs.rename(data.filepath, renameTo, (err)=>{
                let returnData = {
                    success: false,
                    index: data.index
                }
                if (err) {
                    returnData.reason = err;
                    event.reply("rename-response", returnData);
                }
                else {
                    returnData.success = true;
                    returnData.filepath = renameTo
                    event.reply("rename-response", returnData);
                }
            })
        }
    }
})

ipcMain.on("change-language-mode", (event, data)=>{
    win.webContents.send("back-changed-language-mode", data);
})


ipcMain.on("openFolder", (event, data)=>{
    dialog.showOpenDialog({
        properties: ['openDirectory'],
    }).then(result=>{
        if (!result.canceled) {
            try {
                let folder = result.filePaths[0]
                backOpenFolder(folder);
            }
            catch(err) {}
        }
    })
})

function extensionOf(filename) {
    const parts = filename.split('.');
    if (parts.length == 1) {
    return '';
    }
    return parts.pop();
}

function backOpenFolder(folder) {
    let scanned = fs.readdirSync(folder);
    let filelist = [];
    scanned.forEach(element => {
        let fileFolder = folder + "\\" + element;
        try {
            let stat = fs.statSync(fileFolder);
            if (stat.isFile() && supportedExtensions.indexOf(extensionOf(fileFolder)) != -1) {
                filelist.push(fileFolder);
            }
        }
        catch(err) {}
        
    });


    /*
       try {
        textContents = fs.readFileSync(data, "utf8");
    }
    catch(err) {
        textContents = ""
    }
    let backData = {
        filepath: data,
        contents: textContents
    }
    */
    filelist.forEach(element => {
        let textcontents = "";
        fs.readFile(element, "utf8", (err, data)=>{
            let backData = {
                filepath: element,
                contents: ""
            }
            if (err) {
            }
            else {
                backData.contents = data;
            }
            win.webContents.send("back-getFileContents", backData);
        })          
    });
    
}

ipcMain.on("always-on-top", (event, data)=>{
    if (data == true) {
        win.setAlwaysOnTop(true);
    }
    else {
        win.setAlwaysOnTop(false);
    }
})

ipcMain.on("check-font-data-triggered", (event, data)=>{
    win.webContents.send("check-font-data", true);
})

function openWeb(url) {
    exec(`start ${url}`, (error, stdout, stderr)=>{
        return;
    })
}

ipcMain.on("open-web", (even, url)=>{
    openWeb(url);
})




app.on("ready", ()=>{
    createWindow();

})

