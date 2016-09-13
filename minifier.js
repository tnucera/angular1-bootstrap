var compressor = require('node-minify');
var colors = require('colors');
var conf = require('./conf.js');

var args = process.argv.slice(2);

if (args.length !== 2) {
    console.log("ERR!".red + " Usage : node modifier.js [all|vendor|app] [folder]");
    return;
}

function js(name, fileIn) {
    var out = args[1] + name + '.min.js';
    new compressor.minify({
        type: 'uglifyjs',
        fileIn: fileIn,
        fileOut: out,
        options: ['--compress'],
        callback: function (err, content) {
            if (err) {
                console.log(err);
            } else {
                console.log("Minify done".green + " in " + out);
            }
        }
    });
}

if (args[0] === 'all' || args[0] === 'vendor') {
    // Vendor
    js('vendor', conf.js.vendor);
}

if (args[0] === 'all' || args[0] === 'app') {
    // App index
    js('index', 'src/index.js');

    // App
    js('app', 'src/app/**/*.src.js');
}
