const BrowserWindow = require("electron")["BrowserWindow"];
let modal;
class Modal {
  constructor(e, t, o, i, s = !1) {
    (this.width = e),
      (this.height = t),
      (this.parent = o),
      (this.htmlfile = i),
      (this.isModal = s);
  }
  open() {
    (modal = new BrowserWindow({
      parent: this.parent,
      width: this.width,
      height: this.height,
      resizable: !1,
      minimizable: !1,
      autoHideMenuBar: !0,
      transparent: !0,
      modal: this.isModal,
      icon: "assets/icons/notefinity.png",
      webPreferences: { nodeIntegration: !0, contextIsolation: !1 },
    })).loadFile(this.htmlfile);
  }
  close() {
    modal.close();
  }
  getWebContents() {
    return new Promise((e, t) => {
      setTimeout(() => {
        e(modal.webContents);
      }, 200);
    });
  }
  getModal() {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(modal);
        }, 200);
    });
  }
}
module.exports = { Modal: Modal };
