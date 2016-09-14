(function () {
    'use strict';

    var fs = require('fs');
    var fse = require('fs-extra');
    var colors = require('colors');
    var conf = require('./conf.js');

    function symlink(srcPath, dstPath) {
        fs.symlink(srcPath, dstPath, function (err) {
            if (err) return console.error(err);

            var srcStat = fs.lstatSync(srcPath);
            var srcType = (srcStat.isDirectory()) ? 'dir' : 'file';
            console.log("Symlink created ".magenta + dstPath + " -> " + srcPath + " " + srcType.yellow);
        });
    }

    function symlinkForce(srcPath, dstPath) {
        try {
            var dstStat = fs.lstatSync(dstPath);
            // If destination file or dir exists and isn't a symlink
            if (!dstStat.isSymbolicLink()) {
                var dstType = (dstStat.isDirectory()) ? 'Dir' : 'File';
                // Remove destination file or dir
                fse.remove(dstPath, function (err) {
                    if (err) return console.error(err);

                    console.log((dstType + " removed ").magenta + dstPath);
                    // Create symlink
                    symlink(srcPath, dstPath);
                });
            }
        } catch (e) {
            // Symlink doesn't exist, so we create it
            symlink(srcPath, dstPath);
        }
    }

    // Symlink node_modules
    symlinkForce(__dirname + '/node_modules', __dirname + '/dist/node_modules');
    // Symlink src index
    conf.js.index.forEach(function (element, index, array) {
        symlinkForce(__dirname + '/' + element, __dirname + '/dist/' + element.substring(4));
    });
    // Symlink src app
    symlinkForce(__dirname + '/src/app', __dirname + '/dist/app');

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
