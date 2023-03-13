const fs = require('fs');
const uglify = require('uglify-js');

const code = fs.readFileSync('index.js', 'utf8');
const options = { toplevel: true };

const minifiedCode = uglify.minify(code, options).code;

fs.writeFileSync('minified_index.js', minifiedCode, 'utf8');
