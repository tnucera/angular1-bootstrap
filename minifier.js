(function () {
    'use strict';

    var compressor = require('node-minify');
    var colors = require('colors')
    var conf = require('./conf.js');

    var args = process.argv.slice(2);

    if (args.length !== 1) {
        console.log("ERR! ".red + "Usage: node minifier.js [options] target");
        console.log("Examples: ".yellow + "node minifier.js all");
        console.log("          node minifier.js vendor");
        console.log("          node minifier.js src");
        return;
    }

    var target = args[0];
    var dir = 'dist/assets/js/';

    function js(name, fileIn) {
        var jsFile = name + '.min.js';
        var fileOut = dir + jsFile;

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
        js('vendor', conf.js.vendor);
    }

    if (target === 'all' || target === 'src') {
        js('src', conf.js.src);
    }
})();
