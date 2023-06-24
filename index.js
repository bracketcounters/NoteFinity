const { app, BrowserWindow, ipcMain, dialog, protocol } = require("electron");
const windowStateKeeper = require("electron-window-state")
const { DataStorage, FileStorage } = require("./src/storage");
const { Modal } = require("./src/modal");
const { Minifier } = require("./src/minifier");
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
        // alwaysOnTop: true,
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
        case "convert-case-to":
            let modalConvertCase = new Modal(300, 280, win, "src/pages/edit/convertcase.html", false);
            modalConvertCase.open();
            break;
        case "copytoclipboard":
            let modalCopyToClipboard = new Modal(280, 240, win, "src/pages/edit/copytoclipboard.html", true);
            modalCopyToClipboard.open();
            break;
        case "minifier":
            let modalMinifier = new Modal(550, 356, win, "src/pages/options/minifier.html", true);
            modalMinifier.open();
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
"coffee", "cfm", "cr", "cs", "csd", "orc", "sco", "css", "curly", "d", "dart", "diff", "django", "dockerfile", "dot", "drl", "edi", "e", "ejs", "ex", "elm", "erl", "f", "f90", "fs", "fsl", "ftl", "gcode", "feature", "gitignore", "glsl", "gbs", "go", "graphql", "groovy", "haml", "hbs", "hs", "lhs", "h", "haxe", "hx", "hjson", "html", "ini", "io", "ion", "jack", "jade", "java", "js", "jexl", "json", "json5", "jq", "jsp", "jssm", "jsx", "jl", "kt", "tex", "latte", "less", "liquid", "lisp", "ls", "log", "logic", "lgt", "lsl", "lua", "lp", "lucene", "makefile", "md", "mask", "m", "mz", "mediawiki", "mel", "mixal", "mc", "sql", "nim", "nix", "nsi", "njk", "ml", "mm", "objc", "objcpp", "pql", "pas", "pl", "php", "pig", "plsql", "ps1", "praat", "prisma", "properties", "proto", "pp", "py", "qml", "R", "raku", "cshtml", "rdoc", "red", "rhtml", "robot", "rst", "rb", "rs", "sac", "sass", "scad", "scala", "scm", "scrypt", "scss", "sh", "sjs", "slim", "tpl", "smithy", "snippets", "soy", "space", "rq", "styl", "svg", "swift", "tcl", "tf", "textile", "toml", "tsx", "ttl", "twig", "ts", "vala", "vbs", "vm", "v", "vhdl", "vfp", "wlk", "xml", "xq", "yaml", "zeek"];


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

ipcMain.on("check-font-data-triggered", (event, data)=>{
    win.webContents.send("check-font-data", true);
})

function openWeb(url) {
    try {
        exec(`start ${url}`, (error, stdout, stderr)=>{
            return;
        })
    }
    catch(err) {}
}

ipcMain.on("open-web", (even, url)=>{
    openWeb(url);
})

ipcMain.on("return-convert-case", (event, data)=>{
    win.webContents.send("back-convert-case", data);
})

ipcMain.on("reset-notefinity", (event, data)=>{
    if (data) {
        try {
            const folder = path.join(process.env.LOCALAPPDATA, "NoteFinity", "bg-images");
            const files = fs.readdirSync(folder);
            files.forEach(file=>{
                let filepath = path.join(process.env.LOCALAPPDATA, "NoteFinity", "bg-images", file);
                fs.unlinkSync(filepath);
            })
        }
        catch(err) {}
    }
})

ipcMain.on("open-in-application", (event, data)=>{
    const command = `explorer ${data}`;
    try {
        exec(command);
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
        fetchProtocol = require("https");
    }
    else if (data.startsWith("http")) {
        fetchProtocol = require("http");
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
    delete minify;
    event.reply("back-minify-code", compressedCode);
})

ipcMain.on("code-minifier-action", (event, data)=>{
    win.webContents.send("return-code-minifier-action", data);
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

app.on("ready", ()=>{
    createWindow();

    const argv = process.argv.slice(2);
    if (argv.length > 0) {
        if (argv.indexOf("--update") != -1) {
            console.log("Updating");
        }
        else if (argv.indexOf("--reset") != -1) {
            createResetWindow();
        }

        else {
            let fileLocation = path.resolve(argv[1]);
            setTimeout(() => {
                win.webContents.send("back-openFile", fileLocation);
            }, 520);
        }
    }
})