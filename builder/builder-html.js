module.exports = (function () {
    'use strict';

    var fs = require('fs');
    var fse = require('fs-extra');
    var colors = require('colors');
    var conf = require('../conf.js');
    var glob = require('glob');
    var logger = require('./logger.js');

    const logPrefix = "HTML";

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        build: build
    };

    function build() {
        // src/index.html
        fse.copy(conf.dir.src + '/index.html', conf.dir.dist + '/index.html', function (err) {
            if (err) return logger.error(err);

            logger.log("Copying done ".green + conf.dir.src + '/index.html' + " -> " + conf.dir.dist + '/index.html', logPrefix);

            fs.readFile(conf.dir.dist + '/index.html', 'utf8', function (err, contents) {
                if (err) return logger.error(err);

                var time = (new Date().getTime()).toString();

                contents = contents.split('{{buildDate}}').join(time);

                fs.writeFile(conf.dir.dist + '/index.html', contents);

                logger.log("Injecting build date done ".green + conf.dir.src + '/index.html' + " -> " + conf.dir.dist + '/index.html', logPrefix);
            });
        });

        // src/app/**/*.html
        fse.remove(conf.dir.dist + '/app', function (err) {
            if (err) return logger.error(err);

            glob(conf.dir.src + '/app/**/*.html', {}, function (err, matches) {
                if (err) return logger.error(err);

                matches.forEach(function (file) {
                    fse.copy(file, file.replace(conf.dir.src, conf.dir.dist), {clobber: true}, function (err) {
                        if (err) return logger.error(err);
                    });
                });

                logger.log("Copying done ".green + conf.dir.src + '/app/**/*.html' + " -> " + conf.dir.dist + '/app/**/*.html', logPrefix);
            });
        });
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

})();
