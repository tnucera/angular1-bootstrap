module.exports = (function () {
    'use strict';

    var fse = require('fs-extra');
    var colors = require('colors');
    var conf = require('../conf.js');
    var minifier = require('./minifier.js');
    var logger = require('./logger.js');

    const logPrefix = "CSS";

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        build: build,
        buildVendor: buildVendor,
        buildIndex: buildIndex
    };

    function build() {
        buildVendor();
        buildIndex();
    }

    function buildVendor(callback) {
        process('vendor', callback);
    }

    function buildIndex(callback) {
        process('index', callback);
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

    function process(name, callback) {
        var distDir = conf.dir.dist + '/assets/css';
        fse.ensureDir(distDir, function (err) {
            if (err) return logger.error(err);

            minifier.scss(conf.dir.src + '/' + name + '.scss', distDir + '/' + name + '.css', function (fileOut) {
                logger.log("Minifying done ".green + fileOut, logPrefix);

                if (callback) callback();
            });
        });
    }

})();
