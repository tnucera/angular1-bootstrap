module.exports = (function () {
    'use strict';

    var fse = require('fs-extra');
    var colors = require('colors');
    var conf = require('../conf.js');
    var logger = require('./logger.js');

    const logPrefix = "Fonts";

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        build: build
    };

    function build() {
        var srcDir = conf.dir.src + '/assets/fonts';
        var distDir = conf.dir.dist + '/assets/fonts';
        fse.ensureDir(distDir, function (err) {
            if (err) return logger.error(err);

            // src
            copy(srcDir, distDir);
            // vendor
            copy(conf.dir.nodeModules + '/bootstrap-sass/assets/fonts', distDir);
            copy(conf.dir.nodeModules + '/font-awesome/fonts', distDir + '/font-awesome/')
        });
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

    function copy(srcPath, dstPath) {
        fse.copy(srcPath, dstPath, {clobber: true}, function (err) {
            if (err) return logger.error(err);

            logger.log("Copying done ".green + srcPath + " -> " + dstPath, logPrefix);
        });
    }

})();
