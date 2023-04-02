const {BrowserWindow} = require("electron");

let modal;
class Modal {
    constructor(width, height, parent, htmlfile, isModal=false) {
        this.width = width;
        this.height = height;
        this.parent = parent;
        this.htmlfile = htmlfile;
        this.isModal = isModal;
    }
    open() {
        modal = new BrowserWindow({
            parent: this.parent,
            width: this.width,
            height: this.height,
            resizable: false,
            minimizable: false,
            autoHideMenuBar: true,
            transparent: true,
            modal: this.isModal,
            icon: "assets/icons/notefinity.png",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                // devTools: false
            }
        })
        modal.loadFile(this.htmlfile);
    }
    close() {
        modal.close();
    }
}
module.exports = {
    Modal
}
