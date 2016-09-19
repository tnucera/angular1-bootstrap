module.exports = (function () {
    'use strict';

    var fs = require('fs');
    var fse = require('fs-extra');
    var colors = require('colors');
    var logger = require('./logger.js');

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        overwrite: overwrite
    };

    function overwrite(srcPath, dstPath, callback) {
        try {
            var dstStat = fs.lstatSync(dstPath);
            // If destination file or dir exists and isn't a symlink
            if (!dstStat.isSymbolicLink()) {
                // Remove destination file or dir
                fse.remove(dstPath, function (err) {
                    if (err) return logger.error(err);

                    // Create symlink
                    create(srcPath, dstPath, callback);
                });
            }
        } catch (e) {
            // Symlink doesn't exist, so we create it
            create(srcPath, dstPath, callback);
        }
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

    function create(srcPath, dstPath, callback) {
        fse.ensureSymlink(srcPath, dstPath, function (err) {
            if (callback) callback(err);
        });
    }

})();
