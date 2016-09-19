module.exports = (function () {
    'use strict';

    var fse = require('fs-extra');
    var colors = require('colors');
    var conf = require('../conf.js');
    var logger = require('./logger.js');
    var symlinker = require('./symlinker.js');

    const logPrefix = "Images";

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        build: build
    };

    /**
     *
     * @param {boolean} [symlink]
     */
    function build(symlink) {
        var srcDir = conf.dir.src + '/assets/images';
        var distDir = conf.dir.dist + '/assets/images';

        if (symlink === true) {
            symlinker.overwrite(srcDir, distDir, function (err) {
                if (err) return logger.error(err);

                logger.log("Symlink done ".green + srcDir + " -> " + distDir, logPrefix);
            });
        } else {
            fse.copy(srcDir, distDir, {clobber: true}, function (err) {
                if (err) return logger.error(err);

                logger.log("Copying done ".green + srcDir + " -> " + distDir, logPrefix);
            });
        }
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

})();
