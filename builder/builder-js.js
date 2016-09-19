module.exports = (function () {
    'use strict';

    var fse = require('fs-extra');
    var colors = require('colors');
    var conf = require('../conf.js');
    var minifier = require('./minifier.js');
    var logger = require('./logger.js');

    const logPrefix = "JS";

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        build: build
    };

    function build() {
        var distDir = conf.dir.dist + '/assets/js';
        fse.ensureDir(distDir, function (err) {
            if (err) return logger.error(err);

            minifier.js(conf.js.vendor, distDir + '/vendor.min.js', function (fileOut) {
                logger.log("Minifying done ".green + fileOut, logPrefix);
            });
            minifier.js(conf.js.index, distDir + '/index.min.js', function (fileOut) {
                logger.log("Minifying done ".green + fileOut, logPrefix);
            });
        });
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

})();
