(function () {
    'use strict';

    var fs = require('fs');
    var fse = require('fs-extra');
    var colors = require('colors');
    var conf = require('./conf.js');

    function symlink(srcpath, dstpath) {
        fse.ensureSymlink(srcpath, dstpath, function (err) {
            if (err) return console.error(err);

            var type = 'file';
            var stats = fs.lstatSync(srcpath);
            if (stats.isDirectory()) {
                type = 'dir';
            }
            console.log("Symlink done ".magenta + dstpath + " -> " + srcpath + " " + type.yellow);
        });
    }

    // Symlink node_modules
    symlink(__dirname + '/node_modules', __dirname + '/dist/node_modules');
    // Symlink src index
    conf.js.index.forEach(function (element, index, array) {
        symlink(__dirname + '/' + element, __dirname + '/dist/' + element.substring(4));
    });
    // Symlink src app
    symlink(__dirname + '/src/app', __dirname + '/dist/app');

    // Inject in fileOut
    var fileOut = 'dist/index.html';
    fse.copy('src/index.html', fileOut, function (err) {
        if (err) return console.error(err);

        fs.readFile(fileOut, 'utf8', function (err, contents) {
            var time = (new Date().getTime()).toString();
            var eol = '\n        ';
            var srcJs = eol;

            conf.js.vendor.forEach(function (element, index, array) {
                srcJs += '<script src="' + element + '?v=' + time + '"></script>' + eol;
            });

            srcJs += eol;

            conf.js.src.forEach(function (element, index, array) {
                srcJs += '<script src="' + element.substring(4) + '?v=' + time + '"></script>' + eol;
            });

            contents = contents.replace(/(<!--SRC_JS-->)(?:|\n|.)+(<!--SRC_JS_END-->)/g, "$1" + srcJs + "$2");
            contents = contents.replace(/(<!--DIST_JS-->)(?:|\n|.)+(<!--DIST_JS_END-->)/g, "$1$2");
            contents = contents.split('{{buildDate}}').join(time);

            fs.writeFile(fileOut, contents);

            console.log("Inject done ".green + "in " + fileOut);
        });
    });
})();
