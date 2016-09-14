var compressor = require('node-minify');
var colors = require('colors');
var conf = require('./conf.js');

var args = process.argv.slice(2);

if (args.length !== 3) {
    console.log("ERR!".red + " Usage: node modifier.js [options] target webDir targetDir");
    console.log("Examples:".yellow + " node minifier.js all dist/ assets/js/");
    console.log("          node minifier.js vendor dist/ assets/js/");
    console.log("          node minifier.js app dist/ assets/js/");
    return;
}

var target = args[0];
var webDir = args[1];
var targetDir = args[2];
var completeDir = webDir + targetDir;

function js(name, fileIn) {
    var jsFile = name + '.min.js';
    var fileOut = completeDir + jsFile;

    new compressor.minify({
        type: 'uglifyjs',
        fileIn: fileIn,
        fileOut: fileOut,
        options: ['--compress'],
        callback: function (err, content) {
            if (err) {
                console.log(err);
            } else {
                console.log("Minify done".green + " in " + fileOut);
            }
        }
    });
}

if (target === 'all' || target === 'vendor') {
    // Vendor
    js('vendor', conf.js.vendor);
}

if (target === 'all' || target === 'app') {
    // App index
    js('index', 'src/index*.js');

    // App
    js('app', "src/app/**/!(*.spec).js");
}
