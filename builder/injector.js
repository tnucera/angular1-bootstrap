module.exports = (function () {
    'use strict';

    var fs = require('fs');
    var fse = require('fs-extra');
    var colors = require('colors');
    var symlinker = require('./symlinker.js');
    var conf = require('../conf.js');
    var logger = require('./logger.js');

    const logPrefix = "JS+HTML";

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        inject: inject
    };

    function inject(callback) {
        // Pour voir un nouveau fichier, on supprime le cache de conf
        delete require.cache[require.resolve('../conf.js')];
        conf = require('../conf.js');

        // Symlink -> node_modules
        symlink(conf.dir.nodeModules, conf.dir.dist + '/node_modules');
        // Symlink -> src index
        conf.js.src.index.forEach(function (element, index, array) {
            symlink(conf.dir.root + '/' + element, conf.dir.dist + '/' + element.substring(4));
        });
        // Symlink -> src app
        symlink(conf.dir.src + '/app', conf.dir.dist + '/app');

        fse.copy(conf.dir.src + '/index.html', conf.dir.dist + '/index.html', function (err) {
            if (err) return logger.error(err);

            logger.log("Copying done ".green + conf.dir.src + '/index.html' + " -> " + conf.dir.dist + '/index.html', logPrefix);

            fs.readFile(conf.dir.dist + '/index.html', 'utf8', function (err, contents) {
                if (err) return logger.error(err);

                var time = (new Date().getTime()).toString();

                var eol = '\n        ';
                var srcJs = eol;
                conf.js.vendor.forEach(function (element, index, array) {
                    srcJs += getHtmlScript(element, eol);
                });
                srcJs += eol;
                conf.js.index.forEach(function (element, index, array) {
                    srcJs += getHtmlScript(element.substring(4), eol);
                });

                contents = contents.replace(/(<!--SRC_JS-->)(?:|\n|.)+(<!--SRC_JS_END-->)/g, "$1" + srcJs + "$2");
                contents = contents.replace(/(<!--DIST_JS-->)(?:|\n|.)+(<!--DIST_JS_END-->)/g, "$1$2");
                contents = contents.split('{{buildDate}}').join(time);

                fs.writeFile(conf.dir.dist + '/index.html', contents);

                logger.log("Injecting scripts and build date done ".green + conf.dir.dist + '/index.html', logPrefix);

                if (callback) callback();
            });
        });
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

    function symlink(srcPath, dstPath) {
        symlinker.overwrite(srcPath, dstPath, function (err) {
            if (err) return logger.error(err);

            logger.log("Symlinking done ".green + srcPath + " -> " + dstPath, logPrefix);
        });
    }

    function getHtmlScript(src, eol) {
        return '<script src="' + src + '?v={{buildDate}}"></script>' + eol;
    }

})();
