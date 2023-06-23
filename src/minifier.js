const uglify = require("uglify-js");
const htmlMinifier = require("html-minifier");
const CleanCSS = require("clean-css");

class Minifier {
    constructor(code) {
        this.sourceCode = code;
    }
    setSourceCode(code) {
        this.sourceCode = code;
    }
    getCompressedHTML(removeComments=true, collapseWhiteSpace=true, minifyCSS=false, minifyJS=false) {
        try {
            let compressedHTML = htmlMinifier.minify(this.sourceCode, {
                removeComments: removeComments,
                collapseWhitespace: collapseWhiteSpace,
                minifyCSS: minifyCSS,
                minifyJS: minifyJS,
            });
            return compressedHTML;
        }
        catch(err) {
            return false;
        }
    }
    getCompressedJavaScript(toplevel=false) {
        try {
            let compressedJS = uglify.minify(this.sourceCode, {
                toplevel: toplevel
            })
            return compressedJS;
        }
        catch(err) {
            return false;
        }
    }
    getCompressedCSS() {
        try {
            let compressedCSS = new CleanCSS().minify(this.sourceCode).styles;
            return compressedCSS;
        }
        catch(err) {
            return false;
        }
    }
}

module.exports = {
    Minifier
}