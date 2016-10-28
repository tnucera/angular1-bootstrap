module.exports = (function () {
    'use strict';

    var nodeWatch = require('node-watch');
    var moment = require('moment');
    var bs = require('browser-sync').create();
    var conf = require('../conf.js');
    var logger = require('./logger.js');
    var injector = require('./injector.js');
    var builderCss = require('./builder-css.js');

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        serve: serve,
        watch: watch
    };

    function serve() {
        bs.init({
            server: conf.dir.dist,
            ui: false
        });
    }

    function watch() {
        var actions = getActions();

        // Launch all actions at start-up
        Object.keys(actions).forEach(function (key) {
            actions[key]();
        });

        // Watch
        nodeWatch(['src'], function (filename) {
            var startDate = moment();

            if (/vendor\.scss$/.test(filename)) {
                logger.logWithTime(filename);

                // vendor.scss
                actions.cssVendor(function () {
                    callback(startDate)
                });
            } else if (/\.scss$/.test(filename)) {
                logger.logWithTime(filename);

                // *.scss without vendor.scss
                actions.cssIndex(function () {
                    callback(startDate)
                });
            } else if (/\.js$/.test(filename) || /\.html$/.test(filename)) {
                logger.logWithTime(filename);

                // *.js or *.html
                actions.inject(function () {
                    callback(startDate)
                });
            }
        });
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

    function getActions() {
        return {
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
    }

    function callback(startDate) {
        logger.logDuration(startDate);

        bs.reload();
    }

})();
