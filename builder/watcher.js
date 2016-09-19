(function () {
    'use strict';

    var watch = require('node-watch');
    var colors = require('colors');
    var moment = require('moment');
    var bs = require('browser-sync').create();
    var conf = require('../conf.js');
    var logger = require('./logger.js');
    var injector = require('./injector.js');
    var builderCss = require('./builder-css.js');

    var args = process.argv.slice(2);
    if (args[0] && args[0] === 'serve') {
        // Launch browser-sync server
        bs.init({
            server: conf.dir.dist,
            ui: false
        });
    }

    var execs = {
        js: function (message, callback) {
            if (message)  logger.logWithTime(message);

            injector.inject(function () {
                if (callback) callback();
            });
        },
        cssVendor: function (message, callback) {
            if (message)  logger.logWithTime(message);

            builderCss.buildVendor(function () {
                if (callback) callback();
            });
        },
        cssIndex: function (message, callback) {
            if (message)  logger.logWithTime(message);

            builderCss.buildIndex(function () {
                if (callback) callback();
            });
        }
    };

    Object.keys(execs).forEach(function (key) {
        execs[key]();
    });

    watch(['src'], function (filename) {
        var startDate = moment();

        if ((/\.js$/.test(filename) && !/\.spec\.js$/.test(filename)) || /index\.html$/.test(filename)) {
            // *.js without *.spec.js OR index.html
            execs.js(filename, function () {
                logger.logDuration(startDate);

                bs.reload();
            });
        } else if (/\.scss$/.test(filename)) {
            // *.scss
            if (/vendor\.scss$/.test(filename)) {
                // vendor.scss
                execs.cssVendor(filename, function () {
                    logger.logDuration(startDate);

                    bs.reload();
                });
            } else {
                // *.scss without vendor.scss
                execs.cssIndex(filename, function () {
                    logger.logDuration(startDate);

                    bs.reload();
                });
            }
        }
    });

})();
