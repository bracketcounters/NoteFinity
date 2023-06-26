const say = require("say");
const { DataStorage } = require("./storage");

class TextToSpeech {
    constructor(text="") {
        this.text = text;
        this.filename = "notefinity_tts.mp3";
    }
    setText(text) {
        this.text = text;
    }
    getSpeech(voice) {
        return new Promise((resolve, reject)=>{
            let storage = new DataStorage("tts", this.filename);
            let filepath = storage.getPath();
            say.export(this.text, voice, 1, filepath, (err)=>{
                if (err) {
                    resolve(false);
                    storage.delete();
                }
                else {
                    resolve(filepath);
                }
            })
        })
    }
}

module.exports = {
    TextToSpeech
}