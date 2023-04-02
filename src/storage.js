const fs = require("fs");
const { join } = require("path");

class Storage {
    constructor(folder, fileName, appfolder) {
        this.appfolder = appfolder;
        this.subfolder = join(this.appfolder, folder);
        this.file = join(this.subfolder, fileName);
        if (!fs.existsSync(this.appfolder)) {
            try {
                fs.mkdirSync(this.appfolder);
            }
            catch (err) {
            }
        }

        if (!fs.existsSync(this.subfolder)) {
            try {
                fs.mkdirSync(this.subfolder);
            }
            catch(err) {
            }
        }

        if (!fs.existsSync(this.file)) {
            try {
                fs.writeFileSync(this.file, "");
            }
            catch(err) {
            }
        }
    }

    getData() {
        try {
            let data = fs.readFileSync(this.file, "utf-8");
            return data;
        }
        catch(err) {
        }
    }

    getBinaryData() {
        try {
            let data = fs.readFileSync(this.file);
            return data;
        }
        catch(err) {
        }
    }

    getJSON() {
        let data = this.getData();
        try {
            data = JSON.parse(data);
            return data;
        }
        catch(err) {
            return false;
        }
    }

    setData(data) {
        try {
            fs.writeFileSync(this.file, data);
            return true;
        }
        catch(err) {
            return false;
        }
    }

    setJSON(data) {
        try {
            this.setData(JSON.stringify(data));
        }
        catch(err) {
            return false;
        }
    }

    appendData(data) {
        try {
            fs.appendFileSync(this.file, data);
            return true;
        }
        catch(err) {
            return false;
        }
    }

    delete() {
        try {
            fs.unlinkSync(this.file);
            return true;
        }
        catch(err) {
            return false;
        }
    }
}

class DataStorage extends Storage {
    constructor(folder, filename) {
        super(folder, filename, join(process.env.LOCALAPPDATA, "NoteFinity"));
    }
}

class FileStorage extends Storage {
    constructor(filepath) {
        super("", filepath, "");
    }
}


module.exports = {
    DataStorage,
    FileStorage
}