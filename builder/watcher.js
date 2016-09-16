(function () {
    'use strict';

    var args = process.argv.slice(2);

    var watch = require('node-watch');
    var colors = require('colors');
    var moment = require('moment');
    var cp = require('child_process');
    var bs = require('browser-sync').create();

    // First argument = serve
    if (args[0] && args[0] === 'serve') {
        // Launch browser-sync server
        bs.init({
            server: __dirname + '/../dist',
            ui: false
        });
    }

    function showMessage(message) {
        console.log((("[" + moment().format('HH:mm:ss') + "] ").bold + message).yellow);
    }

    function exec(command, args, message) {
        if (message) showMessage(message);

        var child = cp.spawn(command, args, {stdio: 'inherit'});
        child.on('close', function (exitCode) {
            bs.reload();
        });
    }

    var execs = {
        js: function (message) {
            exec('npm', ['run', 'build-dev:inject'], message);
        },
        scssIndex: function (message) {
            exec('npm', ['run', 'build:assets:css:make:compile:index'], message);
        },
        scssVendor: function (message) {
            exec('npm', ['run', 'build:assets:css:make:compile:vendor'], message);
        }
    };

    showMessage("Launching...");
    Object.keys(execs).forEach(function (key) {
        execs[key]();
    });

    watch(['src'], function (filename) {
        if (/\.js$/.test(filename) && !/\.spec\.js$/.test(filename)) {
            // *.js without *.spec.js
            execs.js(filename);
        } else if (/\.scss$/.test(filename)) {
            // *.scss
            if (!/vendor\.scss$/.test(filename)) {
                // *.scss without vendor.scss
                execs.scssIndex(filename);
            } else {
                // vendor.scss
                execs.scssVendor(filename);
            }
        }
    });

})();
