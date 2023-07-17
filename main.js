const { app, BrowserWindow, ipcMain, dialog, Tray } = require("electron");
const windowStateKeeper = require("electron-window-state")
const { DataStorage, FileStorage } = require("./src/storage");
const { Modal } = require("./src/modal");
const { Minifier } = require("./src/minifier");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");
const say = require("say");
const { TextToSpeech } = require("./src/texttospeech");
const open = require("open");
const http = require("http");
const https = require("https");
const AdmZip = require('adm-zip');

app.setPath("userData", path.join(process.env.APPDATA, "NoteFinity"));

let win;
function createWindow() {
    let windowState = windowStateKeeper({
        defaultWidth: 800,
        defaultHeight: 620
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
            // devTools: true // For Development
            devTools: false // For Production
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
        else if (data == "reload") {
            const args = [];
            app.relaunch({ args });
            app.quit();
        }
    });    
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
        case "convert-case-to":
            let modalConvertCase = new Modal(300, 280, win, "src/pages/edit/convertcase.html", false);
            modalConvertCase.open();
            break;
        case "convert-case-to-single":
            let modalConvertCaseSingle = new Modal(300, 280, win, "src/pages/edit/convertcase.html", true);
            modalConvertCaseSingle.open();
            modalConvertCaseSingle.getWebContents().then(response=>{
                try {
                    response.webContents.send("convert-single", true);
                }
                catch(err) {}
            })
            break;

        case "copytoclipboard":
            let modalCopyToClipboard = new Modal(280, 240, win, "src/pages/edit/copytoclipboard.html", true);
            modalCopyToClipboard.open();
            break;
        case "minifier":
            let modalMinifier = new Modal(550, 356, win, "src/pages/options/minifier.html", true);
            modalMinifier.open();
            break;
        case "texttospeech":
            let modalTextToSpeech = new Modal(550, 316, win, "src/pages/options/texttospeech.html", true);
            modalTextToSpeech.open();
            break;
        case "web-search":
            let modalWebSearch = new Modal(240, 280, win, "src/pages/view/websearch.html");
            modalWebSearch.open();
            break;

        default:
            break;
    }
})

ipcMain.on("open-mode-modal", (event, data)=>{
    let modalLanguage = new Modal(320, 200, win, "src/pages/view/chooselanguage.html", true);
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
                    setTimeout(() => {
                        delete storage1, storage2;
                    }, 2000);
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
        setTimeout(() => {
            delete storage;
        }, 2000);
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
        setTimeout(() => {
            delete imageStorage;
        }, 2000);
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
        textContents = null;
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
        textContents = null;
    }
    let backData = {
        index: data.index,
        contents: textContents
    }
    event.reply("back-reloadFileContents", backData);
})

const supportedExtensions = ["txt", "abap", "abc", "as", "ada", "alda", "conf", "cls", "aql", "adoc", "asl", "asm", "ahk", "bat", "bib", "c", "cpp", "c9search", "cirru", "clj", "cob", 
"coffee", "cfm", "cr", "cs", "csd", "orc", "sco", "css", "curly", "d", "dart", "diff", "django", "dockerfile", "dot", "drl", "edi", "e", "ejs", "ex", "elm", "erl", "f", "f90", "fs", "fsl", "ftl", "gcode", "feature", "gitignore", "glsl", "gbs", "go", "graphql", "groovy", "haml", "hbs", "hs", "lhs", "h", "haxe", "hx", "hjson", "html", "ini", "io", "ion", "jack", "jade", "java", "js", "jexl", "json", "json5", "jq", "jsp", "jssm", "jsx", "jl", "kt", "tex", "latte", "less", "liquid", "lisp", "ls", "log", "logic", "lgt", "lsl", "lua", "lp", "lucene", "makefile", "md", "mask", "m", "mz", "mediawiki", "mel", "mixal", "mc", "sql", "nim", "nix", "npmignore", "nsi", "njk", "ml", "mm", "objc", "objcpp", "pql", "pas", "pl", "php", "pig", "plsql", "ps1", "praat", "prisma", "properties", "proto", "pp", "py", "qml", "R", "raku", "cshtml", "rdoc", "red", "rhtml", "robot", "rst", "rb", "rs", "sac", "sass", "scad", "scala", "scm", "scrypt", "scss", "sh", "sjs", "slim", "tpl", "smithy", "snippets", "soy", "space", "rq", "styl", "svg", "swift", "tcl", "tf", "textile", "toml", "tsx", "ttl", "twig", "ts", "vala", "vbs", "vm", "v", "vhdl", "vfp", "wlk", "xml", "xq", "yaml", "zeek"];


ipcMain.on("fileAction", (event, data)=>{
    if (data == "openfile") {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [
                { 
                    name: 'Text File', 
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
            let returnData = {
                success: false,
                index: data.index
            }
            fs.exists(renameTo, (exists)=>{
                if (!exists) {
                    fs.rename(data.filepath, renameTo, (err)=>{
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
                else {
                    returnData.message = "File exists. Please choose a different name.";
                    event.reply("rename-response", returnData);
                }
            })
        }
        else if (data.action == "savecopy") {
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
                        let returnData = {};
                        if (err) {
                            returnData = {
                                action: "savecopy",
                                success: false,
                            }
                        }
                        else {
                            returnData = {
                                action: "savecopy",
                                success: true,
                                index: data.index,
                            }
                        }
                        win.webContents.send("saveAlert", returnData);
                    })
                }
            })
        }
        else if (data.action == "savemany") {
            let returnData = {
                action: "savemany",
                saveDone: [],
                saveFailed: []
            };
            data.data.forEach(element=>{
                try {
                    fs.writeFileSync(element.filepath, element.contents);
                    returnData.saveDone.push(element.filepath);
                }
                catch(err) {
                    returnData.saveFailed.push(element.filepath)
                }
            })
            win.webContents.send("saveAlert", returnData);
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
            if (stat.isFile()) {
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

ipcMain.on("toggle-full-screen-mode", (event, data)=>{
    if (data) {
        win.setFullScreen(!win.isFullScreen());
    }
})

let tray = null;
ipcMain.on("temporarily-hide", (event, data)=>{
    if (data) {
        try {
            // tray = new Tray("assets/icons/notefinity.png"); // For development
            let trayIcon = path.join(__dirname, "assets/icons/notefinity.ico");
            tray = new Tray(trayIcon);
            tray.setTitle("NoteFinity");
            tray.setToolTip("Show NoteFinity");
            win.hide();
            tray.on("click", ()=>{
                win.show();
                tray.destroy();
            })
        }
        catch(err) {
        }
    }
})


ipcMain.on("check-font-data-triggered", (event, data)=>{
    win.webContents.send("check-font-data", true);
})


ipcMain.on("return-convert-case", (event, data)=>{
    win.webContents.send("back-convert-case", data);
})

function alertMessage(message) {
    dialog.showErrorBox("Alert", message.toString());
}

ipcMain.on("reset-notefinity", (event, data)=>{
    // Utility gulo ke copy kore local appdata folder er modhhe rekhe sekhan theke execute korte hobe
    let removerExecutable = path.join(path.dirname(path.dirname(__dirname)), "utility", "remover.exe");
    if (data) {
        try {
            const localAppdataFolder = path.join(process.env.LOCALAPPDATA, "NoteFinity");
            const gpuCacheFolder = path.join(app.getPath("userData"), "GPUCache");
            exec(`powershell.exe -Command \" Start-Process -FilePath '${removerExecutable}' -ArgumentList "${localAppdataFolder}" -WindowStyle Hidden\"`, (error, stdout, stderr)=>{
                if (error) {
                    // alertMessage(`Error: ${error}`); // For development
                }
            })
            exec(`powershell.exe -Command \" Start-Process -FilePath '${removerExecutable}' -ArgumentList "${gpuCacheFolder}" -WindowStyle Hidden\"`, (error, stdout, stderr)=>{
                if (error) {
                    // alertMessage(`Error: ${error}`); // For development
                }
            })
        }
        catch(err) {
        }
    }
})

ipcMain.on("open-in-application", (event, data)=>{
    try {
        open(data);
    }
    catch(err) {};
})

ipcMain.on("check-file-existence", (event, data)=>{
    let returnData = [];
    data.forEach(filepath=>{
        let existence = fs.existsSync(filepath);
        if (!existence) {
            returnData.push(filepath);
        }
    })
    event.reply("back-check-file-not-exists", returnData);
})

ipcMain.on("check-recent-file-open", (event, data)=>{
    let existence = fs.existsSync(data);
    let returnData = {
        filepath: data,
        exists: false
    }
    if (existence) {
        returnData.exists = true;
    }
    event.reply("back-check-recent-fileopen", returnData);
})

ipcMain.on("fetch-from-internet", (event, data)=>{
    let fetchProtocol;
    let returnData = {
        status: false,
    }
    if (data.startsWith("https")) {
        fetchProtocol = https;
    }
    else if (data.startsWith("http")) {
        fetchProtocol = http;
    }
    else {
        event.reply("back-fetch-from-internet", returnData);
        return;
    }

    fetchProtocol.get(data, (res)=>{
        let contentType = res.headers["content-type"];
        let contents = "";
        res.on("data", (chunk)=>{
            contents += chunk;
        });
        res.on("end", ()=>{
            returnData.status = true;
            returnData.contents = contents;
            if (contentType != undefined) {
                returnData.contentType = contentType;
            }
            event.reply("back-fetch-from-internet", returnData);
        })
    }).on("error", (err)=>{
        event.reply("back-fetch-from-internet", returnData);
    })
})

ipcMain.on("copy-to-clipboard", (event, data)=>{
    win.webContents.send("back-copy-to-clipboard", data);
});


ipcMain.on("minify-code", (event, data)=>{
    let minify = new Minifier(data.code);
    let compressedCode = "";
    switch (data.mode) {
        case "html":
            compressedCode = minify.getCompressedHTML(data.removeComments, data.collapseWhiteSpace, data.minifyCSS, data.minifyJS);
            break;
        case "css":
            compressedCode = minify.getCompressedCSS();
            break;
        case "javascript":
            compressedCode = minify.getCompressedJavaScript(data.toplevel).code;
            break;
        default:
            break;
    }
    event.reply("back-minify-code", compressedCode);
    delete minify;
})

ipcMain.on("code-minifier-action", (event, data)=>{
    win.webContents.send("return-code-minifier-action", data);
})

ipcMain.on("get-installed-voices", (event, data)=>{
    say.getInstalledVoices((err, voices)=>{
        try {
            event.reply("back-get-installed-voices", voices);
        }
        catch(err) {}
    })
})

ipcMain.on("text-to-speech", (event, data)=>{
    let ttsEngine = new TextToSpeech(data.text);
    ttsEngine.getSpeech(data.voice).then(result=>{
        event.reply("back-text-to-speech", result);
        delete ttsEngine;
    })
})

ipcMain.on("download-text-to-speech", (event, data)=>{
    let storage = new DataStorage("tts", "notefinity_tts.mp3");
    dialog.showSaveDialog({
        filters: [
            {
                name: "Mp3 File",
                extensions: ["mp3"],
            }
        ]
    }).then(result=>{
        if (!result.canceled) {
            fs.writeFile(result.filePath, storage.getBinaryData(), (err)=>{
                if (err) {

                }
                else {
                    
                }
            })
        }
    })
})

ipcMain.on("markdown-previewer", (event, data)=>{
    let markdownWindow = new BrowserWindow({
        modal: false,
        parent: win,
        width: 400,
        height: 600,
        minWidth: 100,
        minHeight: 200,
        autoHideMenuBar: true,
        icon: "assets/icons/notefinity.png",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // devTools: false
        }
    })
    markdownWindow.loadFile("src/pages/options/markdownpreviewer.html");
    markdownWindow.webContents.on("will-navigate", (event, url)=>{
        event.preventDefault();
        try {
            open(url);
        }
        catch(err) {}
    })
    markdownWindow.on("close", (event, data)=>{
        win.webContents.send("markdown-closed", true);
        delete markdownWindow;
    })
})

function createResetWindow() {
    let resetWin = new BrowserWindow({
        width: 400,
        height: 260,
        resizable: false,
        minimizable: false,
        autoHideMenuBar: true,
        hasShadow: false,
        icon: "assets/icons/notefinity-reset.ico",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    resetWin.loadFile("src/pages/extra/reset.html");
    if (win) {
        win.close();
    }
    win = resetWin;
}

ipcMain.on("create-window-again", (event, data)=>{
    createWindow();
});


const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
}
else {
    app.on("ready", ()=>{
        createWindow();
        // const argv = process.argv.slice(2); // For development
        const argv = process.argv.slice(1); // For production
        if (argv.length > 0) {
            if (argv.indexOf("--update") != -1) {
                ipcMain.emit("check-for-updates");
            }
            else if (argv.indexOf("--version") != -1) {
                if (win) {
                    win.close();
                }
                console.log("1.0.0");
                process.exit();
            }
            else if (argv.indexOf("--reset") != -1) {
                createResetWindow();
            }
            else if (argv.indexOf("--help") != -1) {
                console.log("Something help");
                process.exit();
            }
            
            else {
                if (argv.length == 1) {
                    try {
                        let fileLocation = path.resolve(argv[0]);
                        if (win) {
                            win.webContents.on("did-finish-load", ()=>{
                                setTimeout(() => {
                                    win.webContents.send("back-openFile", fileLocation);
                                }, 400);
                            })
                        }
                    }
                    catch(err) {
                    }
                }
            }
    }
})
}

app.on("second-instance", (event, commandLine, workingDirectory)=>{
    if (typeof(win) == "object") {
        if (win.isMinimized()) {
            win.maximize();
        }
        if (!win.isVisible()) {
            win.show();
            if (tray) {
                tray.destroy();
            }
        }
        win.focus();
        setTimeout(() => {
            win.webContents.send("back-openFile", commandLine[commandLine.length-1]);
        }, 520);
    }
    else {
        setTimeout(() => {
            win.webContents.send("back-openFile", commandLine[commandLine.length-1]);
        }, 1500);
    }
})

app.on("browser-window-blur", ()=>{
    if (win) {
        win.webContents.send("window-blurred", true);
    }
})

process.on("uncaughtException", (error)=>{
    if (error.code == "ENOTFOUND") {
        win.webContents.send("show-alert", ["You are offline or the hostname could not be resolved.", "error"]);
    }
});


function checkArrayEquality(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function copyExecutables() {
    const utilityLocal = path.resolve("utility");
    const utilityStorage = new DataStorage("utility", "").getPath();

    let utilityLocalFiles = fs.readdirSync(utilityLocal);
    let utilityStorageFiles = fs.readdirSync(utilityStorage);

    return new Promise((resolve, reject)=>{
        if (checkArrayEquality(utilityLocalFiles, utilityStorageFiles)) {
            resolve(true);
        }
        else {
            utilityLocalFiles.forEach(file => {
                let filePath = path.join(utilityLocal, file);
                fs.copyFileSync(filePath, path.join(utilityStorage, file));
            });
            resolve(true);
        }
    })
}

class Updater {
    constructor() {
        this.info = this.getPackageInfo();
        this.version = this.info.version;
        this.updaterFolder = null;
        this.downloadPercent = 0;
    }

    getPackageInfo() {
        try {
            // let info = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf8").toString()); // Development
            let info = JSON.parse(fs.readFileSync(path.resolve("resources/app.asar/package.json"), "utf8").toString()) // Production
            return info;
        }
        catch(err) {
            return {
                "version": "1.0.0",
                "updateUrl": "https://dl-1.bracketcounters.com/notefinity/updates/latest.json",
            };
        }
    }
    fetchFile(url="", protocol=https, save=null) {
        return new Promise((resolve, reject)=>{
            protocol.get(url, (response)=>{
                let data = "";
                let downloadedSize = 0;
                let percent = 0;
                let totalSize = parseInt(response.headers['content-length'], 10);
                response.on("data", (chunk)=>{
                    data += chunk;
                    downloadedSize += chunk.length;
                    let newPercent = Math.round((downloadedSize/totalSize) * 100);
                    if (newPercent != percent) {
                        percent = newPercent;
                        if (global.updaterModal) {
                            try {
                                global.updaterModal.getWebContents().then(modal=>{
                                    modal.send("update-downloaded-percentage", percent);
                                })
                            }
                            catch(err) {}
                        }
                    }
                });

                if (save != null) {
                    let file = fs.createWriteStream(save.filepath);
                    response.pipe(file);
                    file.on("finish", ()=>{
                        file.close();
                        resolve(true);
                        global.updaterModal.getWebContents().then(modal=>{
                            modal.send("update-downloaded-successful", true);
                        })
                    })
                }
                else {   
                    response.on("end", ()=>{
                        resolve(data);
                    });
                }
                response.on("error", ()=>{
                    resolve(null);
                });
            })
        })
    }
    checkForLatestVersion() {
        return new Promise((resolve, reject)=>{
            this.fetchFile(this.info.updateUrl, https).then(data=>{
                if (data != null) {
                    try {
                        data = JSON.parse(data);
                        if (data.version.toString() != this.version.toString()) {
                            this.latest = data;
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }
                    catch(err) {
                        data = {};
                    }
                }
            })
        })
    }
    createBatchFile() {
        try {
            let updatesFile = new DataStorage("updates", "app.asar").getPath();

            let currentDirectory = path.dirname(__dirname);
            let batchFile = new DataStorage("update_additional", "updates_installer.bat");
            let batchFileCode = `@echo off
set "sourceFile=${updatesFile.toString()}"
set "destinationFolder=${currentDirectory}"
NET SESSION >nul 2>&1
if %errorlevel% neq 0 (
echo false
pause
exit /b
)
timeout /t 2 /nobreak >nul
echo Moving file...
move /Y "%sourceFile%" "%destinationFolder%"
timeout /t 2 /nobreak >nul
start "" "${app.getPath('exe').toString()}"
echo true
del "%~f0"
pause
`;
            batchFile.setData(batchFileCode);
            this.installerBatchFile = batchFile.getPath();
            return true;
        }
        catch(err) {
            return false;
        }
    }
    downloadUpdate() {
        return new Promise((resolve, reject)=>{
            let updateFileName = filenameOf(this.latest.downloadUrl);
            let updateStorage = new DataStorage("updates", updateFileName);
            let updateStoragePath = updateStorage.getPath();
            this.fetchFile(this.latest.downloadUrl, https, {
                filepath: updateStoragePath
            }).then(result=>{
                if (!result) {}
                else {
                    try {
                    const zip = new AdmZip(updateStoragePath);
                    let updateDirectory = path.dirname(updateStoragePath);
                    zip.extractAllTo(updateDirectory, true);
                    this.updaterFolder = path.dirname(updateStoragePath);
                    updateStorage.delete();
                    if (this.createBatchFile()) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
                catch (err) {
                    win.webContents.send("show-alert", ["Can't install the update right now", "error"]);
                    if (global.updaterModal) {
                        global.updaterModal.close();
                    }
                    resolve(false);
                }
            }
        })
    })
    }
    quitAndInstall() {
        win.webContents.send("backup-documents", true);
        if (this.updaterFolder != null && this.installerBatchFile) {
            let command = `Start-Process -FilePath '${this.installerBatchFile}' -Verb RunAs -WindowStyle Hidden`;
            exec(`powershell.exe -Command ${command}`, (error, stdout, stderr)=>{
                if (error) {
                    if (global.updaterModal) {
                        global.updaterModal.getWebContents().then(response=>{
                            response.send("show-alert", ["Can't update NoteFinity", "error"]);
                        })
                    }
                } else {
                    setTimeout(() => {
                        app.quit();
                    }, 1000);
                }
            })
        }
        else {

        }
    }
}

ipcMain.on("check-for-updates", (event, data)=>{
    global.notefinityUpdater = new Updater();
    global.notefinityUpdater.checkForLatestVersion().then(response=>{
        if(response) {
            global.updaterModal = new Modal(450, 300, win, "src/pages/extra/updates.html", false);
            global.updaterModal.open();
            global.updaterModal.getWebContents().then(response2=>{
                try {
                    response2.send("update-version", global.notefinityUpdater.latest.version);
                }
                catch(err) {
                    setTimeout(() => {
                        response2.send("update-version", global.notefinityUpdater.latest.version);
                    }, 500);
                }
            })
            global.updaterModal.getModal().then(responseModal=>{
                responseModal.on("close", ()=>{
                    win.webContents.send("update-checked-result", true);
                    delete global.updaterModal;
                    delete global.notefinityUpdater;
                })
            })
        }
        else {
            win.webContents.send("show-alert", ["Latest version is already installed", "success"]);
            win.webContents.send("update-checked-result", false);
            delete global.notefinityUpdater;
        }
    })
})

ipcMain.on("download-updates-action", (event, data)=>{
    if (global.notefinityUpdater) {
        global.notefinityUpdater.downloadUpdate();
    }
})

ipcMain.on("install-updates-quit", (event, data)=>{
    if (global.notefinityUpdater) {
        global.notefinityUpdater.quitAndInstall();
    }
})

