module.exports = (function () {
    'use strict';

    var fs = require('fs');
    var fse = require('fs-extra');
    var colors = require('colors');

    function create(srcPath, dstPath) {
        fs.symlink(srcPath, dstPath, function (err) {
            if (err) return console.error(err);

            var srcStat = fs.lstatSync(srcPath);
            var srcType = (srcStat.isDirectory()) ? 'dir' : 'file';
            console.log("Symlink created ".magenta + dstPath + " -> " + srcPath + " " + srcType.yellow);
        });
    }

    function overwrite(srcPath, dstPath) {
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
                    create(srcPath, dstPath);
                });
            }
        } catch (e) {
            // Symlink doesn't exist, so we create it
            create(srcPath, dstPath);
        }
    }

    return {
        create: create,
        overwrite: overwrite
    };
})();
