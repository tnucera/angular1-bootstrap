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
        cssVendor: function (callback) {
            builderCss.buildVendor(function () {
                if (callback) callback();
            });
        },
        cssIndex: function (callback) {
            builderCss.buildIndex(function () {
                if (callback) callback();
            });
        },
        inject: function (callback) {
            injector.inject(function () {
                if (callback) callback();
            });
        }
    };

    Object.keys(execs).forEach(function (key) {
        execs[key]();
    });

    function callback(startDate) {
        logger.logDuration(startDate);

        bs.reload();
    }

    watch(['src'], function (filename) {
        var startDate = moment();

        logger.logWithTime(filename);

        if (/vendor\.scss$/.test(filename)) {
            // vendor.scss
            execs.cssVendor(function () {
                callback(startDate)
            });
        } else if (/\.scss$/.test(filename)) {
            // *.scss without vendor.scss
            execs.cssIndex(function () {
                callback(startDate)
            });
        } else if (/\.js$/.test(filename) || /\.html$/.test(filename)) {
            // *.js or *.html
            execs.inject(function () {
                callback(startDate)
            });
        }
    });

})();
